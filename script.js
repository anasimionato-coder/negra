// Botão flutuante de navegação (criado aqui para não repetir o HTML)
const pagina = location.pathname.split("/").pop() || "index.html";

// [nome, link, é subitem?]
const atalhos = [
  ["Início", "index.html"],
  ["História", "historia.html"],
  ["Linha do tempo", "historia.html#linha-do-tempo", true],
  ["Conceitos", "historia.html#conceitos", true],
  ["Personalidades", "personalidades.html"],
  ["Exposições", "exposicoes.html"],
  ["Galeria de fotos", "exposicoes.html#galeria", true],
  ["Fontes", "exposicoes.html#fontes", true],
  ["Quiz", "quiz.html"],
];

const nav = document.createElement("div");
nav.className = "nav";
nav.innerHTML = `
  <nav class="nav-painel" id="navPainel" aria-label="Atalhos do museu" hidden>
    ${atalhos
      .map(([nome, href, sub]) => {
        const atual = !sub && href === pagina;
        return `<a href="${href}" class="${sub ? "sub" : ""} ${atual ? "atual" : ""}">${nome}</a>`;
      })
      .join("")}
  </nav>
  <button class="nav-botao" id="navBotao" aria-expanded="false" aria-controls="navPainel">Navegar</button>`;
document.body.appendChild(nav);

const navBotao = document.getElementById("navBotao");
const navPainel = document.getElementById("navPainel");

function abrirNav(abrir) {
  navPainel.hidden = !abrir;
  navBotao.setAttribute("aria-expanded", String(abrir));
  navBotao.textContent = abrir ? "Fechar" : "Navegar";
}

navBotao.addEventListener("click", () => abrirNav(navPainel.hidden));
navPainel.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => abrirNav(false)));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !navPainel.hidden) {
    abrirNav(false);
    navBotao.focus();
  }
});

document.addEventListener("click", (e) => {
  if (!navPainel.hidden && !nav.contains(e.target)) abrirNav(false);
});

// Linha do tempo (abre um item por vez)
const itensTempo = document.querySelectorAll(".tempo-btn");

itensTempo.forEach((botao) => {
  botao.addEventListener("click", () => {
    const estavaAberto = botao.getAttribute("aria-expanded") === "true";
    itensTempo.forEach((b) => b.setAttribute("aria-expanded", "false"));
    botao.setAttribute("aria-expanded", String(!estavaAberto));
  });
});

// ======================================================
// ANIMAÇÕES E NAVEGAÇÃO ENTRE PÁGINAS
// ======================================================
document.documentElement.classList.add("js");

// Ordem das páginas
const ordem = [
  ["index.html", "Início"],
  ["historia.html", "História"],
  ["personalidades.html", "Personalidades"],
  ["exposicoes.html", "Exposições"],
  ["quiz.html", "Quiz"],
];

// Botões "Anterior" e "Próxima" no fim de cada página
(function () {
  const pos = ordem.findIndex(([arq]) => arq === pagina);
  const rodape = document.querySelector(".rodape");
  if (pos === -1 || !rodape) return;

  const ant = ordem[pos - 1];
  const prox = ordem[pos + 1];
  const pager = document.createElement("nav");
  pager.className = "pager";
  pager.setAttribute("aria-label", "Navegação entre páginas");
  pager.innerHTML =
    (ant ? `<a class="ant" href="${ant[0]}"><small>Anterior</small><strong>${ant[1]}</strong></a>` : "") +
    (prox
      ? `<a class="prox" href="${prox[0]}"><small>Próxima página</small><strong>${prox[1]}</strong></a>`
      : `<a class="prox" href="index.html"><small>Fim da visita</small><strong>Voltar ao início</strong></a>`);
  rodape.before(pager);
})();

// Barra de progresso + topo que encolhe
(function () {
  const barra = document.createElement("div");
  barra.className = "progresso";
  barra.setAttribute("aria-hidden", "true");
  document.body.prepend(barra);
  const topo = document.querySelector(".topo");

  function atualizar() {
    const alto = document.documentElement.scrollHeight - innerHeight;
    barra.style.width = (alto > 0 ? (scrollY / alto) * 100 : 0) + "%";
    if (topo) topo.classList.toggle("rolou", scrollY > 40);
  }
  addEventListener("scroll", atualizar, { passive: true });
  atualizar();
})();

// Revelar elementos ao rolar + contagem dos números
(function () {
  const grupos = [
    ".chamada", ".titulo-centro", ".secao > h2", ".secao > .intro", ".coluna",
    ".pilares article", ".dados article", ".banner-conteudo",
    ".cartao", ".pessoa", ".foto", ".tempo li", ".glossario details", ".quiz", ".galeria + *",
  ];
  const alvos = [...document.querySelectorAll(grupos.join(","))];

  alvos.forEach((el) => {
    el.classList.add("reveal");
    if (el.matches(".tempo li")) el.classList.add("esq");
    if (el.matches(".pilares article")) el.classList.add("pilares-item");
    if (el.matches(".dados article")) el.classList.add("dado");
    // atraso escalonado entre irmãos (máx. 6 passos)
    const irmaos = [...el.parentElement.children].filter((c) => c.classList.contains("reveal") || alvos.includes(c));
    el.style.setProperty("--d", Math.min(irmaos.indexOf(el), 6) * 0.09 + "s");
  });

  function contar(el) {
    const m = el.textContent.trim().match(/^([\d.,]+)(.*)$/);
    if (!m) return;
    const virgula = m[1].includes(",");
    const alvo = parseFloat(m[1].replace(",", "."));
    if (isNaN(alvo) || alvo >= 1000) return; // anos ficam como estão
    const casas = virgula ? 1 : 0;
    const inicio = performance.now();
    (function passo(agora) {
      const t = Math.min((agora - inicio) / 1400, 1);
      const v = alvo * (1 - Math.pow(1 - t, 3));
      el.textContent = v.toFixed(casas).replace(".", ",") + m[2];
      if (t < 1) requestAnimationFrame(passo);
    })(inicio);
  }

  const reduz = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!("IntersectionObserver" in window) || reduz) {
    alvos.forEach((el) => el.classList.add("visivel"));
    return;
  }

  const obs = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("visivel");
        const num = e.target.querySelector(".dados strong") || (e.target.matches(".dado") && e.target.querySelector("strong"));
        if (num) contar(num);
        obs.unobserve(e.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  alvos.forEach((el) => obs.observe(el));
})();

// Fotos dos cartões de Exposições: 1º cartão = foto11, 2º = foto12, 3º = foto13, 4º = foto14
(function () {
  const exts = ["jpg", "jpeg", "png", "webp", "JPG", "JPEG", "PNG", "WEBP"];
  document.querySelectorAll(".expo .expo-topo").forEach((topo, k) => {
    const n = 11 + k;
    (function tentar(i) {
      if (i >= exts.length) return;
      const url = `assets/foto${n}.${exts[i]}`;
      const img = new Image();
      img.onload = () => { topo.style.background = `url("${url}") center / cover no-repeat`; };
      img.onerror = () => tentar(i + 1);
      img.src = url;
    })(0);
  });
})();