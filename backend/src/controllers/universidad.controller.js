import { UniversidadModel } from "../models/universidades.model.js";
import { CarreraModel } from "../models/carreras.model.js";
import { Op } from "sequelize";

/**
 * CREAR UNA NUEVA UNIVERSIDAD (CON DOCUMENTO ADJUNTO)
 */
export const crearUniversidad = async (req, res) => {
  try {
    const {
      nombre,
      alias,
      tipo_gestion,
      provincia,
      sitio_web,
      tipo_documento,
    } = req.body;

    const ruta_documento = req.file ? req.file.path : null;
    const userId = req.usuario.id;

    if (!ruta_documento || !tipo_documento) {
      return res
        .status(400)
        .json({ mensaje: "Falta el documento de verificación o su tipo." });
    }

    const universidadExistente = await UniversidadModel.findOne({
      where: { userId },
    });
    if (universidadExistente) {
      return res
        .status(400)
        .json({ mensaje: "Ya existe una universidad para este usuario." });
    }

    const nuevaUniversidad = await UniversidadModel.create({
      nombre,
      alias,
      tipo_gestion,
      provincia,
      sitio_web,
      userId,
      tipo_documento_verificacion: tipo_documento,
      ruta_documento_verificacion: ruta_documento,
      isVerified: false,
    });

    res.status(201).json({
      mensaje: "Universidad creada correctamente. Pendiente de verificación.",
      universidad: nuevaUniversidad,
    });
  } catch (error) {
    console.error("Error al crear universidad:", error);
    if (error.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ mensaje: "El archivo es demasiado grande (máx. 5MB)." });
    }
    res.status(500).json({ mensaje: "Error al crear universidad." });
  }
};

/**
 * OBTENER CARRERAS DE UNIVERSIDAD (MIS CARRERAS)
 */
export const obtenerMisCarreras = async (req, res) => {
  try {
    const universidad = await UniversidadModel.findOne({
      where: { userId: req.usuario.id },
    });

    if (!universidad) {
      return res.status(404).json({ mensaje: "Universidad no encontrada." });
    }

    const carreras = await CarreraModel.findAll({
      where: { universidadId: universidad.id },
    });

    res.json(carreras);
  } catch (error) {
    console.error("Error al obtener mis carreras:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/**
 * OBTENER TODAS LAS UNIVERSIDADES (PÚBLICO)
 */
export const obtenerTodasLasUniversidadesPublico = async (req, res) => {
  try {
    const { search } = req.query;

    const filtro = {};
    if (search) {
      filtro[Op.or] = [
        { nombre: { [Op.like]: `%${search}%` } },
        { alias: { [Op.like]: `%${search}%` } },
        { provincia: { [Op.like]: `%${search}%` } },
      ];
    }

    filtro.isVerified = true;

    const universidades = await UniversidadModel.findAll({
      where: filtro,
    });

    res.json(universidades);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener universidades", error });
  }
};

/**
 * OBTENER MI INSTITUCIÓN (usado por el Dashboard y Banner)
 */
export const obtenerMiInstitucion = async (req, res) => {
  try {
    const userId = req.usuario.id;

    const institucion = await UniversidadModel.findOne({
      where: { userId },
    });

    if (!institucion) {
      return res.status(404).json({
        mensaje: "El perfil de la institución aún no ha sido creado.",
      });
    }

    res.status(200).json({ institucion });
  } catch (error) {
    console.error("Error al obtener perfil de institución:", error);
    res
      .status(500)
      .json({ mensaje: "Error interno del servidor", error: error.message });
  }
};

/**
 * ACTUALIZAR MI INSTITUCIÓN (usado para editar perfil)
 */
export const actualizarMiInstitucion = async (req, res) => {
  try {
    const userId = req.usuario.id;
    const { nombre, alias, tipo_gestion, provincia, sitio_web } = req.body;

    const institucion = await UniversidadModel.findOne({
      where: { userId },
    });

    if (!institucion) {
      return res.status(404).json({
        mensaje: "No se encontró el perfil de la institución para actualizar.",
      });
    }

    institucion.nombre = nombre || institucion.nombre;
    institucion.alias = alias || institucion.alias;
    institucion.tipo_gestion = tipo_gestion || institucion.tipo_gestion;
    institucion.provincia = provincia || institucion.provincia;
    institucion.sitio_web = sitio_web || institucion.sitio_web;

    await institucion.save();

    res.status(200).json({
      mensaje: "Perfil de la institución actualizado correctamente.",
      institucion,
    });
  } catch (error) {
    console.error("Error al actualizar perfil de institución:", error);
    res
      .status(500)
      .json({ mensaje: "Error interno del servidor", error: error.message });
  }
};

/**
 * OBTENER UNIVERSIDAD POR ID (PÚBLICO)
 * Trae también todas las carreras asociadas
 */
export const obtenerUniversidadPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const universidad = await UniversidadModel.findOne({
      where: { id, isVerified: true },
      include: [
        {
          model: CarreraModel,
          as: "Carreras", // Debe coincidir con la relación Sequelize
        },
      ],
    });

    if (!universidad) {
      return res.status(404).json({ mensaje: "Universidad no encontrada." });
    }

    res.status(200).json(universidad);
  } catch (error) {
    console.error("Error al obtener universidad por ID:", error);
    res
      .status(500)
      .json({ mensaje: "Error interno del servidor", error: error.message });
  }
};
