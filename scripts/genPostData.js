import { execSync } from "child_process";
import { readdirSync, writeFileSync, statSync } from "fs";
import { join, extname } from "path";

const DOCS_DIR = "docs";
const OUTPUT_FILE = ".vitepress/posts.data.json";

function getGitDate(file) {
  try {
    const output = execSync(
      `git log -1 --format=%ci -- "${file}"`,
      { encoding: "utf-8" }
    ).trim();
    return output ? new Date(output).toISOString() : null;
  } catch {
    return null;
  }
}

function walk(dir, base = "") {
  const files = readdirSync(dir);
  let results = [];
  for (const file of files) {
    const fullPath = join(dir, file);
    const relPath = join(base, file);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(walk(fullPath, relPath));
    } else if (extname(fullPath) === ".md") {
      results.push(relPath);
    }
  }
  return results;
}

function main() {
  const mdFiles = walk(DOCS_DIR);
  const posts = mdFiles.map((file) => {
    const date = getGitDate(join(DOCS_DIR, file));
    const slug = file.replace(/\.md$/, "");
    const category = slug.split("/")[0]; // docs 下的第一级目录作为分类
    return {
      title: slug.split("/").pop(),
      path: "/" + slug,
      category,
      date,
    };
  });

  // 按时间倒序
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2));
  console.log(`✅ Generated ${posts.length} posts -> ${OUTPUT_FILE}`);
}

main();
