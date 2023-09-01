import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (req, saveLocally) => {
  const options = {};

  if (saveLocally) {
    options.uploadDir = path.join(
      process.cwd(),
      "/public/uploads/images/products"
    );
    options.filename = (name, ext, path, form) => {
      return Date.now().toString() + "_" + path.originalFilename;
    };
  }

  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      console.log(files);
      resolve({ fields, files });
    });
  });
};

export default async function (req, res) {
  try {
    await fs.readdir(
      path.join(process.cwd() + "/public", "/uploads", "/images", "/products")
    );
  } catch (error) {
    await fs.mkdir(
      path.join(process.cwd() + "/public", "/uploads", "/images", "/products")
    );
  }

  const result = await readFile(req, true);
  res.json({ success: true, fileInfo: result?.files });
}
