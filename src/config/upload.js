import multer from "multer";
import path from "path";

export default {
  //caminho aonde armazenaremos as fotos
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "uploads"),// declarando desta forma o sistema é automaticamente e evita erros exemplo o windows le a barra imvertida \
		filename:(req,file,cb) => {
			const ext =  path.extname(file.originalname)
			const name = path.basename(file.originalname)

		cb(null, `${name}-${Date.now()}${ext}`)
		}
  }),
};
