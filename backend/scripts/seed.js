// cargar relaciones
import "../src/models/index.js";

// importaciones
import { sequelize } from "../src/config/database.js";
import { UniversidadModel } from "../src/models/universidades.model.js";
import { CarreraModel } from "../src/models/carreras.model.js";
import { UserModel } from "../src/models/user.model.js";
import { InscripcionModel } from "../src/models/inscripcion.model.js";

// datos de prueba

// 1. universidades
const universidadesData = [
  {
    nombre: "Universidad Tecnológica Nacional - FRRF",
    alias: "UTN",
    tipo_gestion: "Pública",
    provincia: "Formosa",
    sitio_web: "https://www.frre.utn.edu.ar/",
    userId: 1,
    isVerified: true,
    logo_url:
      "https://upload.wikimedia.org/wikipedia/commons/6/67/UTN_logo.jpg",
    nivel: "Universitario",
  },
  {
    nombre: "Universidad Nacional de Formosa",
    alias: "UNaF",
    tipo_gestion: "Pública",
    provincia: "Formosa",
    sitio_web: "https://www.unf.edu.ar/",
    userId: 1,
    isVerified: true,
    logo_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/UNaFLogoI.jpg/330px-UNaFLogoI.jpg",
    nivel: "Universitario",
  },
  {
    nombre: "Instituto Politécnico de Formosa",
    alias: "IPF",
    tipo_gestion: "Pública",
    provincia: "Formosa",
    sitio_web: "https://www.ipf.edu.ar/",
    userId: 1,
    isVerified: true,
    logo_url: "https://www.ipf.edu.ar/img/logo_institucional.jpg",
    nivel: "Tecnicatura",
  },
  {
    nombre: 'Instituto Superior de Formación Docente "Félix Atilio Cabrera"',
    alias: "ISFDAC",
    tipo_gestion: "Pública",
    provincia: "Formosa",
    sitio_web: "hhttps://isfdcytcabrera-for.infd.edu.ar/sitio/",
    userId: 1,
    isVerified: true,
    logo_url:
      "https://isfdcytcabrera-for.infd.edu.ar/sitio/wp-content/uploads/2021/03/PNG.png",
    nivel: "Terciario",
  },
  {
    nombre: "Universidad de la Cuenca del Plata - Sede Formosa",
    alias: "UCP",
    tipo_gestion: "Privada",
    provincia: "Formosa",
    sitio_web: "https://www.ucp.edu.ar/sedes/formosa/",
    userId: 1,
    isVerified: true,
    logo_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR326rsQqrewpy4Nvxqb27Zs0cNsp6asFvyzg&s",
    nivel: "Universitario",
  },
];

// funcion para sembrar datos
const sembrarDatos = async () => {
  try {
    console.log("Desactivando FOREIGN_KEY_CHECKS...");
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0", { raw: true });

    console.log("Sincronizando base de datos... (force: true)");
    await sequelize.sync({ force: true });
    console.log("¡Tablas borradas y recreadas con la nueva estructura!");

    console.log("Reactivando FOREIGN_KEY_CHECKS...");
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1", { raw: true });

    console.log("Conectado a la base de datos...");

    // 1. usuario admin
    console.log("Creando usuario admin de ejemplo...");
    let adminUser = await UserModel.create({
      id: 1,
      name: "Admin Impulso",
      email: "admin@impulso.com",
      password: "admin123",
      type: "admin",
    });

    // 2. universidades
    console.log("Insertando universidades...");
    await UniversidadModel.bulkCreate(universidadesData, {
      ignoreDuplicates: true,
    });

    const uniInstances = await UniversidadModel.findAll({
      where: {
        alias: universidadesData.map((u) => u.alias),
      },
    });

    const getIdByAlias = (alias) => {
      const found = uniInstances.find((u) => u.alias === alias);
      if (!found) throw new Error("No se encontró ID para ${alias}");
      return found.id;
    };

    const utnId = getIdByAlias("UTN");
    const unafId = getIdByAlias("UNaF");
    const ipfId = getIdByAlias("IPF");
    const isfdacId = getIdByAlias("ISFDAC");
    const ucpId = getIdByAlias("UCP");

    // 3. carreras
    const carrerasData = [
      // utn
      {
        nombre: "Tecnicatura Superior en Programación",
        descripcion: "Forma programadores para el desarrollo de software.",
        tipo: "Tecnicatura",
        area_estudio: "Tecnología",
        duracion_anios: 2,
        perfiles_riasec_compatibles: JSON.stringify(["S", "E", "C"]),
        universidadId: utnId,
      },
      {
        nombre: "Ingeniería Electromecánica",
        descripcion: "Diseño y mantenimiento de sistemas electromecánicos.",
        tipo: "Grado",
        area_estudio: "Ciencias Exactas",
        duracion_anios: 5,
        perfiles_riasec_compatibles: JSON.stringify(["R", "I"]),
        universidadId: utnId,
      },
      // unaf
      {
        nombre: "Licenciatura en Sistemas",
        descripcion: "Formación integral en análisis y desarrollo de sistemas.",
        tipo: "Grado",
        area_estudio: "Tecnología",
        duracion_anios: 5,
        perfiles_riasec_compatibles: JSON.stringify(["I", "C", "R"]),
        universidadId: unafId,
      },
      {
        nombre: "Enfermería Universitaria",
        descripcion: "Cuidado profesional de la salud.",
        tipo: "Grado",
        area_estudio: "Salud",
        duracion_anios: 4,
        perfiles_riasec_compatibles: JSON.stringify(["S", "E"]),
        universidadId: unafId,
      },
      // ipf
      {
        nombre:
          "Tecnicatura Superior en Desarrollo de Software Multiplataforma",
        descripcion: "Desarrollo de aplicaciones web, móviles y de escritorio.",
        tipo: "Tecnicatura",
        area_estudio: "Tecnología",
        duracion_anios: 3,
        perfiles_riasec_compatibles: JSON.stringify(["I", "R", "C"]),
        universidadId: ipfId,
      },
      // unaf
      {
        nombre: "Licenciatura en Comercio Exterior",
        descripcion: "Gestión de operaciones comerciales internacionales.",
        tipo: "Grado",
        area_estudio: "Ciencias Sociales",
        duracion_anios: 5,
        perfiles_riasec_compatibles: JSON.stringify(["E", "C", "S"]),
        universidadId: unafId,
      },
      {
        nombre: "Profesorado en Biología",
        descripcion:
          "Formación docente para nivel secundario y superior en biología.",
        tipo: "Grado",
        area_estudio: "Ciencias Exactas",
        duracion_anios: 4,
        perfiles_riasec_compatibles: JSON.stringify(["E", "S"]),
        universidadId: unafId,
      },
      {
        nombre: "Tecnicatura en Administración de Empresas Agropecuarias",
        descripcion: "Gestión y administración de emprendimientos rurales.",
        tipo: "Tecnicatura",
        area_estudio: "Ciencias Sociales",
        duracion_anios: 3,
        perfiles_riasec_compatibles: JSON.stringify(["R", "E", "C"]),
        universidadId: unafId,
      },
      {
        nombre: "Licenciatura en Psicopedagogía",
        descripcion:
          "Intervención en procesos de aprendizaje y orientación educativa.",
        tipo: "Grado",
        area_estudio: "Humanidades",
        duracion_anios: 5,
        perfiles_riasec_compatibles: JSON.stringify(["S", "I", "A"]),
        universidadId: unafId,
      },
      // utn
      {
        nombre: "Ingeniería Química",
        descripcion: "Diseño y operación de procesos industriales químicos.",
        tipo: "Grado",
        area_estudio: "Ciencias Exactas",
        duracion_anios: 5,
        perfiles_riasec_compatibles: JSON.stringify(["I", "R"]),
        universidadId: utnId,
      },
      {
        nombre: "Tecnicatura Superior en Mecatrónica",
        descripcion:
          "Integración de mecánica, electrónica, informática y control.",
        tipo: "Tecnicatura",
        area_estudio: "Tecnología",
        duracion_anios: 3,
        perfiles_riasec_compatibles: JSON.stringify(["R", "I", "C"]),
        universidadId: utnId,
      },
      // ipf
      {
        nombre: "Tecnicatura Superior en Energías Renovables",
        descripcion:
          "Instalación y mantenimiento de sistemas de energía solar, eólica, etc.",
        tipo: "Tecnicatura",
        area_estudio: "Tecnología",
        duracion_anios: 3,
        perfiles_riasec_compatibles: JSON.stringify(["E", "I"]),
        universidadId: ipfId,
      },
      {
        nombre: "Tecnicatura Superior en Mecatrónica Industrial",
        descripcion: "Automatización y control de procesos industriales.",
        tipo: "Tecnicatura",
        area_estudio: "Tecnología",
        duracion_anios: 3,
        perfiles_riasec_compatibles: JSON.stringify(["R", "I", "C"]),
        universidadId: ipfId,
      },
      // isfdac
      {
        nombre: "Profesorado de Educación Primaria",
        descripcion: "Formación docente para el nivel primario.",
        tipo: "Grado",
        area_estudio: "Humanidades",
        duracion_anios: 4,
        perfiles_riasec_compatibles: JSON.stringify(["S", "E", "C"]),
        universidadId: isfdacId,
      },
      {
        nombre: "Profesorado de Educación Secundaria en Matemática",
        descripcion: "Formación docente especializada en matemática.",
        tipo: "Grado",
        area_estudio: "Ciencias Exactas",
        duracion_anios: 4,
        perfiles_riasec_compatibles: JSON.stringify(["I", "S", "C"]),
        universidadId: isfdacId,
      },
      {
        nombre: "Tecnicatura Superior en Bibliotecología",
        descripcion: "Gestión de bibliotecas y centros de documentación.",
        tipo: "Tecnicatura",
        area_estudio: "Humanidades",
        duracion_anios: 3,
        perfiles_riasec_compatibles: JSON.stringify(["C", "S", "E"]),
        universidadId: isfdacId,
      },
      {
        nombre: "Profesorado de Educación Especial",
        descripcion:
          "Formación para trabajar con alumnos con necesidades educativas especiales.",
        tipo: "Grado",
        area_estudio: "Humanidades",
        duracion_anios: 4,
        perfiles_riasec_compatibles: JSON.stringify(["S", "A", "I"]),
        universidadId: isfdacId,
      },
      // ucp
      {
        nombre: "Abogacía",
        descripcion:
          "Formación jurídica integral para el ejercicio de la profesión.",
        tipo: "Grado",
        area_estudio: "Ciencias Sociales",
        duracion_anios: 5,
        perfiles_riasec_compatibles: JSON.stringify(["E", "I", "C"]),
        universidadId: ucpId,
      },
      {
        nombre: "Licenciatura en Psicología",
        descripcion:
          "Estudio del comportamiento humano y los procesos mentales.",
        tipo: "Grado",
        area_estudio: "Salud",
        duracion_anios: 5,
        perfiles_riasec_compatibles: JSON.stringify(["S", "I", "A"]),
        universidadId: ucpId,
      },
      {
        nombre: "Contador Público",
        descripcion:
          "Formación en contabilidad, finanzas, impuestos y auditoría.",
        tipo: "Grado",
        area_estudio: "Ciencias Sociales",
        duracion_anios: 5,
        perfiles_riasec_compatibles: JSON.stringify(["C", "E"]),
        universidadId: ucpId,
      },
      {
        nombre: "Licenciatura en Nutrición",
        descripcion: "Ciencia de la alimentación y su relación con la salud.",
        tipo: "Grado",
        area_estudio: "Salud",
        duracion_anios: 5,
        perfiles_riasec_compatibles: JSON.stringify(["S", "E"]),
        universidadId: ucpId,
      },
    ];

    console.log("Insertando carreras...");
    await CarreraModel.bulkCreate(carrerasData, { ignoreDuplicates: true });

    console.log("---------------------------------");
    console.log(
      "¡Base de datos sembrada con éxito! (${carrerasData.length} carreras con perfiles RIASEC). Todas las universidades del seed están verificadas.",
    );
    console.log("---------------------------------");
  } catch (error) {
    console.error("Error al sembrar la base de datos:", error);
    console.log("Intentando reactivar FOREIGN_KEY_CHECKS tras error...");
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1", { raw: true });
  } finally {
    console.log("Cerrando conexión...");
    await sequelize.close();
    console.log("Conexión cerrada.");
  }
};

sembrarDatos();
