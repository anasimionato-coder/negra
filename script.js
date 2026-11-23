const URL = "https://jsonplaceholder.typicode.com/posts?_limit=6";
let publicacoes = [];

const botao = document.querySelector("#btn-carregar");
const filtro = document.querySelector("#filtro");
const mensagem = document.querySelector("#mensagem");
const painel = document.querySelector("#lista-posts");

function mostrarMensagem(texto, tipo = "") {
  mensagem.textContent = texto;
  mensagem.className = tipo;
}

function renderizarPublicacoes(lista) {
  painel.replaceChildren();

  lista.forEach((publicacao) => {
    const cartao = document.createElement("article");
    cartao.classList.add("cartao");

    const id = document.createElement("span");
    id.classList.add("cartao-id");
    id.textContent = `Publicação #${publicacao.id}`;

    const titulo = document.createElement("h2");
    titulo.textContent = publicacao.title;

    const texto = document.createElement("p");
    texto.textContent = publicacao.body;

    cartao.append(id, titulo, texto);
    painel.append(cartao);
  });
}

function carregarPublicacoes() {
  mostrarMensagem("Carregando publicações...", "carregando");
  botao.disabled = true;

  fetch(URL)
    .then((resposta) => {
      if (!resposta.ok) {
        throw new Error(`Erro HTTP: ${resposta.status}`);
      }
      return resposta.json();
    })
    .then((dados) => {
      publicacoes = dados;
      filtro.value = "";
      mostrarMensagem("");
      renderizarPublicacoes(publicacoes);
    })
    .catch((erro) => {
      console.error(erro);
      publicacoes = [];
      painel.replaceChildren();
      mostrarMensagem("Não foi possível carregar as publicações. Tente novamente.", "erro");
    })
    .finally(() => {
      botao.disabled = false;
    });
}

botao.addEventListener("click", () => {
  console.log("Botão clicado");
  carregarPublicacoes();
});

filtro.addEventListener("input", () => {
  const termo = filtro.value.trim().toLowerCase();

  const encontradas = publicacoes.filter((item) => {
    return item.title.toLowerCase().includes(termo);
  });

  renderizarPublicacoes(encontradas);

  if (publicacoes.length > 0 && encontradas.length === 0) {
    mostrarMensagem("Nenhuma publicação encontrada para esse título.", "aviso");
  } else {
    mostrarMensagem("");
  }
});