const postsList = document.getElementById('postsList');
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');
const fileShareList = document.getElementById('fileShareList');
const radioForm = document.getElementById('radioForm');
const radioUrlInput = document.getElementById('radioUrlInput');
const audioPlayer = document.getElementById('audioPlayer');
const radioStatus = document.getElementById('radioStatus');
const adminForm = document.getElementById('adminForm');
const adminPasswordInput = document.getElementById('adminPassword');
const adminLogin = document.getElementById('adminLogin');
const adminPanel = document.getElementById('adminPanel');
const adminLogout = document.getElementById('adminLogout');

let posts = [];
const adminPassword = 'GauchoAdmin2026';

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

function renderFiles(files) {
  if (!fileShareList) return;

  if (!files || files.length === 0) {
    fileShareList.innerHTML = '<p class="empty-state">Nenhum arquivo disponível no momento.</p>';
    return;
  }

  fileShareList.innerHTML = files
    .map((file) => {
      return `
        <article class="file-card">
          <div>
            <h3>${file.title}</h3>
            <p>${file.description}</p>
          </div>
          <div class="file-meta">
            <span>${file.category}</span>
            <span>${file.size}</span>
          </div>
          <a class="btn btn-secondary" href="${file.url}" target="_blank" rel="noreferrer">Baixar</a>
        </article>
      `;
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

function setAdminVisibility(isAdmin) {
  if (isAdmin) {
    adminLogin.classList.add('hidden');
    adminPanel.classList.remove('hidden');
  } else {
    adminLogin.classList.remove('hidden');
    adminPanel.classList.add('hidden');
  }
}

function loadAdminState() {
  const isAdmin = localStorage.getItem('adminLogged') === 'true';
  setAdminVisibility(isAdmin);
}

async function loadPosts() {
  try {
    const response = await fetch('data/posts.json');
    posts = await response.json();
    updateCategoryOptions(posts);
    renderPosts(posts);
  } catch (error) {
    if (postsList) {
      postsList.innerHTML = '<p class="empty-state">Falha ao carregar os artigos. Verifique se o arquivo <code>data/posts.json</code> existe.</p>';
    }
    console.error('Erro ao carregar posts:', error);
  }
}

async function loadFiles() {
  try {
    const response = await fetch('data/files.json');
    const files = await response.json();
    renderFiles(files);
  } catch (error) {
    if (fileShareList) {
      fileShareList.innerHTML = '<p class="empty-state">Falha ao carregar os arquivos. Verifique se o arquivo <code>data/files.json</code> existe.</p>';
    }
    console.error('Erro ao carregar arquivos:', error);
  }
}

function activateRadio(url) {
  if (!audioPlayer || !radioStatus) return;

  audioPlayer.src = url;
  audioPlayer.play().catch(() => {
    radioStatus.textContent = 'A stream foi definida. Clique em play se o navegador não iniciar automaticamente.';
  });
  radioStatus.textContent = 'Stream definida com sucesso! O player está pronto.';
}

function initParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const offset = window.pageYOffset;
    hero.style.backgroundPosition = `center ${Math.max(0, 45 + offset * 0.2)}%`;
  });
}

if (searchInput) {
  searchInput.addEventListener('input', filterPosts);
}

if (categorySelect) {
  categorySelect.addEventListener('change', filterPosts);
}

if (radioForm) {
  radioForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const url = radioUrlInput.value.trim();
    if (!url) {
      radioStatus.textContent = 'Insira uma URL de stream válida.';
      return;
    }
    activateRadio(url);
  });
}

if (adminForm) {
  adminForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = adminPasswordInput.value.trim();
    if (value === adminPassword) {
      localStorage.setItem('adminLogged', 'true');
      setAdminVisibility(true);
      adminPasswordInput.value = '';
    } else {
      alert('Senha incorreta. Tente novamente.');
    }
  });
}

if (adminLogout) {
  adminLogout.addEventListener('click', () => {
    localStorage.removeItem('adminLogged');
    setAdminVisibility(false);
  });
}

loadAdminState();
loadPosts();
loadFiles();
initParallax();
