import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { initContent } from './initalContent';

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());

  const fullPath = path.join(dir, filename);

  router.get('/cells', async (req, res) => {
    try {
      //read the file
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' });

      res.send(JSON.parse(result));
    } catch (err) {
      //@ts-ignore
      if (err.code === 'ENOENT') {
        await fs.writeFile(fullPath, JSON.stringify(initContent), 'utf-8');
        res.send(JSON.stringify(initContent));
      }
    }
  });

  router.post('/cells', async (req, res) => {
    //Take the list  of cells from request object
    // serialaze them
    const { cells }: { cells: Cell[] } = req.body;
    // write the cells into the file
    try {
      await fs.writeFile(fullPath, JSON.stringify(cells), 'utf8');
      res.send({ status: 'ok' });
    } catch (err) {
      throw err;
    }
  });

  return router;
};
