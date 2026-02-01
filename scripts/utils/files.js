import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const CONTENT_DIR = path.join(ROOT, 'content');

/**
 * Read and parse a YAML file
 */
export const readYaml = async (filePath) => {
  const content = await fs.readFile(filePath, 'utf-8');
  const data = YAML.parse(content);
  return { data };
};

/**
 * Read all YAML files from a collection directory
 */
export const readCollection = async (collectionName) => {
  const collectionPath = path.join(CONTENT_DIR, collectionName);
  
  try {
    const files = await fs.readdir(collectionPath);
    const yamlFiles = files.filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));
    
    return Promise.all(
      yamlFiles.map(async (file) => {
        const filePath = path.join(collectionPath, file);
        const { data } = await readYaml(filePath);
        return {
          slug: path.basename(file, '.yaml').replace('.yml', ''),
          ...data,
        };
      })
    );
  } catch (error) {
    console.warn(`Collection ${collectionName} not found or empty`);
    return [];
  }
};

/**
 * Read a singleton content file
 */
export const readSingleton = async (name) => {
  const filePath = path.join(CONTENT_DIR, `${name}.yaml`);
  try {
    return await readYaml(filePath);
  } catch (error) {
    console.warn(`Singleton ${name} not found at ${filePath}`);
    return { data: {} };
  }
};

/**
 * Copy directory recursively
 */
export const copyDir = async (src, dest) => {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
};

/**
 * Ensure directory exists
 */
export const ensureDir = async (dir) => {
  await fs.mkdir(dir, { recursive: true });
};
