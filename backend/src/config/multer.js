import multer from "multer";
import path from "path";
import fs from "fs";

// --- Directorio de destino ---
// Nos aseguramos de que el directorio exista
const uploadDir = "uploads/documentos/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// --- Configuración de almacenamiento ---
// Dónde guardar los archivos y cómo nombrarlos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Guardamos los documentos en la carpeta que definimos
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Nombramos el archivo de forma única para evitar colisiones:
    // "IDdelUsuario-timestamp.extensión"
    // req.usuario.id viene del middleware 'verificarUsuario'
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, req.usuario.id + "-" + uniqueSuffix + extension);
  },
});

// --- Filtro de archivos ---
// Qué tipos de archivos aceptamos (basado en tu mockup)
const fileFilter = (req, file, cb) => {
  // Verificamos los mimetypes permitidos
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true); // Aceptar el archivo
  } else {
    // Rechazar el archivo
    cb(
      new Error("Formato de archivo no válido. Solo se acepta PDF, PNG o JPG."),
      false
    );
  }
};

// --- Exportamos el middleware de Multer ---
// Lo configuramos con el almacenamiento, el filtro y límites
export const uploadDocumento = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // Límite de 5MB por archivo
  },
});
