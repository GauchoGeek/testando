# Meu Site Pessoal

Este repositório contém uma página pessoal moderna e profissional, pronta para ser publicada no GitHub Pages.

## Estrutura do projeto

- `index.html` — página principal com parallax, rádio e painel admin.
- `css/style.css` — estilos escuros, responsivos e com efeito premium.
- `js/app.js` — lógica para carregar artigos, arquivos, rádio e controle admin.
- `data/posts.json` — "banco de dados" de artigos usado pelo site.
- `data/files.json` — lista de arquivos compartilhados.
- `uploads/` — pasta para armazenar arquivos que podem ser baixados no site.
- `assets/itachi-bg.jpg` — imagem de fundo recomendada para o tema Itachi.

## Como publicar no GitHub Pages

1. Commit e push no branch `main`.
2. Abra o repositório no GitHub.
3. Vá em **Settings > Pages**.
4. Selecione a branch `main` e a pasta `/` (root).
5. Salve e aguarde alguns minutos.

## Como usar o site

- Adicione artigos em `data/posts.json` para publicar novas postagens.
- Coloque arquivos em `uploads/` e adicione os metadados em `data/files.json` para disponibilizá-los para download.
- Insira o link da sua stream de áudio no campo de rádio para tocar diretamente no site.
- Use o painel admin na seção `Admin` para ver instruções de publicação.

## Senha do painel admin

- Senha padrão: `GauchoAdmin2026`

> Observação: este painel administrativo é um recurso de visualização em site estático. A senha é verificada no navegador e não substitui uma autenticação segura com servidor.

## Personalização

- Substitua `assets/itachi-bg.jpg` por uma imagem 4K do Itachi, se você tiver permissão.
- Ajuste `css/style.css` para alterar cores, tipografia e efeitos.
- Atualize `index.html` se quiser adicionar seções extras.
