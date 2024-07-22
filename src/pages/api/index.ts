import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';


const transformFileContent = (fileContent: string): string => {
  const lines = fileContent.split('\n');

  const header = lines[0].split('\t');

  const data = lines.slice(1).map(line => {
    const values = line.split('\t');

    return header.reduce((acc: Record<string, string>, key, index) => {
      acc[key] = values[index];
    
      return acc;
    }, {});
  });

  return JSON.stringify(data);
};


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const uploadsDirPath = path.resolve('.', 'public', 'uploads');

  let txtFiles: string[] = [];

  try {
    // Read the directory contents
    const files = fs.readdirSync(uploadsDirPath);

    txtFiles = files.filter(file => file.endsWith('-Inventory.txt'));
  } catch (error) {
    console.error('Error reading directory:', error);
  }

  const filesContent: string[] = [];

  txtFiles.map(filename => {
    const path = `${uploadsDirPath}/${filename}`;

    // Check if the file exists
    if (!fs.existsSync(path)) {
      res.status(404).json({ error: 'File not found' });
      return;
    }
  
    try {
      const fileContent = fs.readFileSync(path, 'utf8');

      filesContent.push(transformFileContent(fileContent));
    } catch (error) {
      res.status(500).json({ error: 'Error reading file' });
    }
  });

  res.status(200).json(filesContent);
}
