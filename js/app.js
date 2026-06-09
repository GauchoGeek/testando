const postsList = document.getElementById('postsList');
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');
let posts = [];

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function renderPosts(postItems) {
  if (!postsList) return;

  if (postItems.length === 0) {
    postsList.innerHTML = '<p class="empty-state">Nenhum artigo encontrado.</p>';
    return;
  }

  postsList.innerHTML = postItems
    .map((post) => {
      return `
        <article class="post-card">
          <div class="meta">
            <span>${post.category}</span>
            <span>${formatDate(post.publishedAt)}</span>
          </div>
          <h3>${post.title}</h3>
          <p>${post.excerpt}</p>
          <a href="${post.url}" target="_blank" rel="noreferrer">Ler artigo</a>
        </article>
      `;
    })
    .join('');
}

function updateCategoryOptions(items) {
  const categories = ['all', ...new Set(items.map((post) => post.category))];
  categorySelect.innerHTML = categories
    .map((category) => {
      const label = category === 'all' ? 'Todas as categorias' : category;
      return `<option value="${category}">${label}</option>`;
    })
    .join('');
}

function filterPosts() {
  const query = searchInput.value.toLowerCase();
  const selectedCategory = categorySelect.value;

  const filtered = posts.filter((post) => {
    const matchesSearch = [post.title, post.excerpt, post.category]
      .join(' ')
      .toLowerCase()
      .includes(query);
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  renderPosts(filtered);
}

async function loadPosts() {
  try {
    const response = await fetch('data/posts.json');
    posts = await response.json();
    updateCategoryOptions(posts);
    renderPosts(posts);
  } catch (error) {
    postsList.innerHTML = '<p class="empty-state">Falha ao carregar os artigos. Verifique se o arquivo <code>data/posts.json</code> existe.</p>';
    console.error('Erro ao carregar posts:', error);
  }
}

searchInput.addEventListener('input', filterPosts);
categorySelect.addEventListener('change', filterPosts);

loadPosts();
