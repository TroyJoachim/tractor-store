import fs from 'fs';
import path from 'path';
import { DatabaseData } from '../types';

const dbPath = path.resolve(process.cwd(), 'src', 'database', 'database.json');
const rawData = fs.readFileSync(dbPath, 'utf8');
const data: DatabaseData = JSON.parse(rawData);

export default data;
