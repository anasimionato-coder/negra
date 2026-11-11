(function () {
  const visor = document.getElementById("visor");
  if (!visor || visor.dataset.pronto) return;
  visor.dataset.pronto = "1";
  // Galeria: foto ampliada com setas
  const visorImg = document.getElementById("visorImg");
  const visorLeg = document.getElementById("visorLeg");
  // Plano B: se "fotoN.jpg" não existir, tenta o nome original do arquivo em assets/
  function tentarOriginal(img) {
    if (img.dataset.tentou || !img.dataset.orig) return;
    img.dataset.tentou = "1";
    const novo = "assets/" + encodeURIComponent(img.dataset.orig);
    img.src = novo;
    img.closest(".foto-btn").dataset.src = novo;
  }
  document.querySelectorAll(".foto-btn img").forEach((img) => {
    img.addEventListener("error", () => tentarOriginal(img));
    if (img.complete && img.naturalWidth === 0) tentarOriginal(img);
  });

  const fotos = [...document.querySelectorAll(".foto-btn")];
  let atual = 0;

  function mostrar(i) {
    atual = (i + fotos.length) % fotos.length;
    const f = fotos[atual];
    visorImg.src = f.dataset.src;
    visorImg.alt = f.querySelector("img").alt;
    visorLeg.textContent = f.dataset.legenda;
  }

  fotos.forEach((f, i) => f.addEventListener("click", () => { mostrar(i); visor.showModal(); }));
  document.getElementById("visorFechar").addEventListener("click", () => visor.close());
  document.getElementById("visorAnt").addEventListener("click", () => mostrar(atual - 1));
  document.getElementById("visorProx").addEventListener("click", () => mostrar(atual + 1));

  // Clicar fora da foto fecha; setas do teclado trocam de foto
  visor.addEventListener("click", (e) => { if (e.target === visor) visor.close(); });
  visor.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") mostrar(atual - 1);
    if (e.key === "ArrowRight") mostrar(atual + 1);
  });
})();