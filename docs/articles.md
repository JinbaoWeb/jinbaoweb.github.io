# 所有文章

<div id="articles-list"></div>

<script type="module">
  async function renderArticles() {
    const container = document.getElementById("articles-list");
    if (!container) return;

    // 加载 meta.json
    const res = await fetch('/.vitepress/meta.json');
    const meta = await res.json();

    // 按分类分组
    const grouped = meta.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});

    // 渲染
    container.innerHTML = Object.entries(grouped).map(([cat, articles]) => `
      <h2>${cat}</h2>
      <ul>
        ${articles.map(a => `<li><a href="${a.path}">${a.title}</a> <small>(${new Date(a.gitTime).toLocaleDateString()})</small></li>`).join('')}
      </ul>
    `).join('');
  }

  renderArticles();
</script>
