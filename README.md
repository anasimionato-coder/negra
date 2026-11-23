# Meu Mural de Publicações

## Objetivo
Praticar consumo de API com `fetch()` usando HTML, CSS e JavaScript puro: buscar publicações na JSONPlaceholder, exibi-las como cartões, filtrar por título e tratar carregamento e erros.

## Como executar
1. Baixe ou clone o repositório.
2. Abra `index.html` no navegador (de preferência com a extensão Live Server do VS Code).
3. Clique em "Carregar publicações" e use o campo para filtrar por título.

## Respostas
**1. O que é uma API e por que usamos `fetch()`?**
Uma API é uma forma padronizada de um sistema oferecer dados ou funcionalidades a outro. Usamos `fetch()` para o navegador fazer a requisição HTTP à API e receber os dados sem recarregar a página.

**2. Qual o papel de `resposta.json()`?**
Ler o corpo da resposta HTTP (texto em formato JSON) e convertê-lo em objetos/arrays JavaScript utilizáveis. É assíncrono, por isso retorna uma Promise.

**3. Diferença entre filtrar localmente e fazer nova requisição?**
Filtrar localmente usa o array já carregado em memória: é instantâneo e não gera tráfego de rede. Uma nova requisição consulta a API de novo, demora mais e depende da rede, mas traz dados atualizados do servidor.

## Organização dos arquivos

- index.html: estrutura da página.
- style.css: aparência e responsividade.
- script.js: requisição à API, filtros e criação dos cartões.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript puro
- Fetch API
- JSONPlaceholder