import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getMainDir(dir) {
  if (fs.existsSync(path.join(dir, "package.json"))) {
    return dir;
  }
  const parent = path.resolve(dir, "..");
  if (parent == dir) return null; // we reached to the end and didn't find import
  return getMainDir(parent);
}
console.log(__dirname);
console.log(getMainDir(__dirname));
