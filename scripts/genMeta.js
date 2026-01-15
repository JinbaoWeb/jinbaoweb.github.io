import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const DOCS_DIR = path.resolve("docs");
const OUTPUT = path.resolve("docs/.vitepress/metadata.json");
const IGNORE_DIRS = new Set(['.vitepress', 'public', 'assets', '.git']);
const IGNORE_FILENAMES = new Set(['index.md', 'README.md', 'metadata.json']);

console.log(`✅ IGNORE_DIRS = ${JSON.stringify(IGNORE_DIRS, null, 2)}`);
console.log(`✅ IGNORE_FILENAMES = ${JSON.stringify(IGNORE_FILENAMES, null, 2)}`);
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
/**
 * 提取 Markdown 标题
 */
function extractTitleFromMarkdown(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

/**
 * 将文件名转为可读标题（如 hello-world.md → Hello World）
 */
function humanizeFilename(filename) {
  return filename
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
// 递归扫描 docs 下的 md 文件
function scanDocs(dir, parent) {
  const result = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && !IGNORE_DIRS.has(file)) {
      console.log(`当前扫描 ${dir}/${file}目录`);
      const new_parent = parent + "/" + file
      result.push(...scanDocs(fullPath, new_parent));
    } else if (file.endsWith(".md")) {
      const relPath = path.relative(DOCS_DIR, fullPath);
      const parts = parent.split('/');
      const file_name = file.split('.')[0]
      const category = parts.length > 0 ? parts[parts.length-1] : 'Uncategorized';
      const content = fs.readFileSync(fullPath, 'utf8');
      const title = extractTitleFromMarkdown(content) || humanizeFilename(path.basename(file, '.md'));
      const slug = "/" + category + "/" + file_name;
      const link = slug + '.html';
      const date = getGitTime(fullPath)
      result.push({ title, slug, link, category, date, relPath, fullPath, dir, file, parent });
    }
  }
  return result;
}
const parent = ""
const articles = scanDocs(DOCS_DIR, parent);
console.log(`✅ 共 ${articles.length} 篇文章`);
console.log(`✅ articles = ${JSON.stringify(articles, null, 2)}`);
const categoryStats = {};
for (const article of articles) {
  const category = article.category
  categoryStats[category] = (categoryStats[category] || 0) + 1;
}
// 最近 5 篇
  const recentPosts = [...articles]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const metadata = {
    articles,
    categoryStats,
    recentPosts
  };

console.log(`✅ metadata = ${JSON.stringify(metadata, null, 2)}`);

fs.writeFileSync(OUTPUT, JSON.stringify(metadata, null, 2));
console.log(`✅ ${OUTPUT} 已生成，共 ${articles.length} 篇文章`);

const categories = Object.keys(categoryStats || {}).filter(cat => cat && cat.trim());
if (categories.length === 0) {
  console.warn('⚠️ No valid categories found in metadata.json');
  process.exit(0);
}

let generatedCount = 0;
for (const cat of categories) {
  const safeCat = cat.trim();
  if (!safeCat) continue;

  const categoryDir = path.join(DOCS_DIR, safeCat);

  // 如果分类目录不存在，跳过（理论上不应发生）
  if (!fs.existsSync(categoryDir)) {
    console.warn(`⚠️ Skipping category "${safeCat}": directory not found.`);
    continue;
  }

  const indexPath = path.join(categoryDir, 'index.md');

  let shouldWrite = true;

  // 如果 index.md 已存在，检查是否为自动生成
  // if (fs.existsSync(indexPath)) {
  //   const content = fs.readFileSync(indexPath, 'utf8');
  //   if (!content.includes(AUTO_COMMENT)) {
  //     console.warn(`⚠️ Skipped ${indexPath} (exists and not auto-generated).`);
  //     shouldWrite = false;
  //   }
  // }

  if (!shouldWrite) continue;

  // 生成简洁的 frontmatter-only index.md
  const content = `---
layout: CategoryPage
category: ${safeCat}
---
`;

  fs.writeFileSync(indexPath, content, 'utf8');
  console.log(`✅ Generated: ${indexPath}`);
  generatedCount++;
}

console.log(`\n✨ Successfully generated index.md for ${generatedCount} categories.`);
