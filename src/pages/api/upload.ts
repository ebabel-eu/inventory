import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

// Disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), '/uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const form = new IncomingForm({ uploadDir, keepExtensions: true });

  form.parse(req, (err: Error, fields: formidable.Fields, files: formidable.Files) => {
    if (err) {
      return res.status(500).json({ message: 'File upload failed', error: err });
    }

    const file: formidable.File | undefined = Array.isArray(files.file) ? files.file[0] : (files.file as formidable.File | undefined);
    if (file) {
      const filePath: string = (file as formidable.File).filepath || '';

      // Perform any additional operations on the uploaded file here

      return res.status(200).json({ message: 'File uploaded successfully', filePath });
    } else {
      return res.status(400).json({ message: 'No file uploaded' });
    }
  });
};

export default handler;
