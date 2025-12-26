import multer from 'multer';
import path from 'path';
import fs from 'fs';

export default function instanciateMulter(savePath: string) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      fs.mkdirSync(savePath, { recursive: true });
      cb(null, savePath);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix =
        Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = path.extname(file.originalname);

      cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
    },
  });

  return multer({ storage });
}
