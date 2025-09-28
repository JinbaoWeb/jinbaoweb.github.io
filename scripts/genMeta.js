import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const DOCS_DIR = path.resolve("docs");
const OUTPUT = path.resolve("docs/.vitepress/meta.json");

// 获取 git 最后提交时间
function getGitTime(filePath) {
  try {
    const output = execSync(
      `git log -1 --format=%ct -- "${filePath}"`,
      { encoding: "utf8" }
    ).trim();
    return output ? new Date(parseInt(output) * 1000).toISOString() : null;
  } catch {
    return null;
  }
}

// 递归扫描 docs 下的 md 文件
function scanDocs(dir) {
  const result = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      result.push(...scanDocs(fullPath));
    } else if (file.endsWith(".md")) {
      const relPath = path.relative(DOCS_DIR, fullPath);
      const category = path.dirname(relPath) === "." ? "root" : path.dirname(relPath);

      result.push({
        title: path.basename(file, ".md"),
        path: "/" + relPath.replace(/\\/g, "/"),
        category,
        gitTime: getGitTime(fullPath)
      });
    }
  }
  return result;
}

const meta = scanDocs(DOCS_DIR);
fs.writeFileSync(OUTPUT, JSON.stringify(meta, null, 2));
console.log(`✅ meta.json 已生成，共 ${meta.length} 篇文章`);
