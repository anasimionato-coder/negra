(function () {
  const TOTAL = 8; // perguntas por rodada

  // Banco de perguntas: p = pergunta, o = opções, c = índice da certa, e = explicação
  const banco = [
    { p: "Em que data se comemora o Dia da Consciência Negra?", o: ["20 de novembro", "13 de maio", "7 de setembro", "21 de abril"], c: 0,
      e: "O 20 de novembro lembra a morte de Zumbi dos Palmares, em 1695. Desde 2023 é feriado nacional." },
    { p: "Quem foi o líder do Quilombo dos Palmares na fase final?", o: ["Luiz Gama", "Zumbi", "Abdias Nascimento", "Milton Santos"], c: 1,
      e: "Zumbi liderou Palmares e virou símbolo da resistência à escravidão." },
    { p: "Em que ano foi assinada a Lei Áurea?", o: ["1822", "1850", "1888", "1889"], c: 2,
      e: "A Lei Áurea foi assinada em 13 de maio de 1888 e aboliu a escravidão no Brasil." },
    { p: "O que é um quilombo?", o: ["Um tipo de navio negreiro", "Uma comunidade formada por pessoas que escaparam da escravidão", "Uma festa religiosa", "Uma lei do Império"], c: 1,
      e: "Quilombos eram comunidades de resistência. Hoje, muitas comunidades quilombolas ainda existem." },
    { p: "Quem escreveu o livro \"Quarto de Despejo\"?", o: ["Conceição Evaristo", "Lélia Gonzalez", "Maria Firmina dos Reis", "Carolina Maria de Jesus"], c: 3,
      e: "Carolina Maria de Jesus publicou \"Quarto de Despejo\" em 1960, um diário sobre a vida na favela." },
    { p: "Qual lei tornou obrigatório o ensino de história e cultura afro-brasileira nas escolas?", o: ["Lei 10.639, de 2003", "Lei do Ventre Livre", "Lei Áurea", "Lei Eusébio de Queirós"], c: 0,
      e: "A Lei 10.639/2003 inclui a história e a cultura afro-brasileira no ensino da educação básica." },
    { p: "A roda de capoeira foi reconhecida pela UNESCO como:", o: ["Patrimônio Natural", "Patrimônio Cultural Imaterial da Humanidade", "Monumento Histórico", "Reserva Ecológica"], c: 1,
      e: "A UNESCO reconheceu a roda de capoeira como Patrimônio Cultural Imaterial da Humanidade em 2014." },
    { p: "Quem foi Luiz Gama?", o: ["Um general do Império", "Um geógrafo", "Um advogado abolicionista", "Um jogador de futebol"], c: 2,
      e: "Luiz Gama foi advogado e abolicionista, e ajudou a libertar muitas pessoas escravizadas na Justiça." },
    { p: "Qual lei proibiu a entrada de africanos escravizados no Brasil em 1850?", o: ["Lei Eusébio de Queirós", "Lei do Ventre Livre", "Lei Áurea", "Lei de Cotas"], c: 0,
      e: "A Lei Eusébio de Queirós acabou com o tráfico, embora o tráfico ilegal tenha continuado por um tempo." },
    { p: "O que determinava a Lei do Ventre Livre, de 1871?", o: ["O fim imediato da escravidão", "Que filhos de mulheres escravizadas nascidos depois da lei seriam livres", "A distribuição de terras aos libertos", "A proibição do tráfico"], c: 1,
      e: "Os filhos nascidos depois da lei passavam a ser considerados livres, mas com muitas limitações na prática." },
    { p: "O Brasil foi o último país das Américas a fazer o quê?", o: ["Proclamar a independência", "Abolir a escravidão", "Aprovar uma Constituição", "Criar um feriado nacional"], c: 1,
      e: "A abolição só veio em 1888, e os libertos ficaram sem apoio do Estado." },
    { p: "Onde ficava o Quilombo dos Palmares?", o: ["Serra da Barriga, na região da atual Alagoas", "Serra Gaúcha", "Pantanal", "Chapada Diamantina, na Bahia"], c: 0,
      e: "Palmares ficava na Serra da Barriga e foi o maior quilombo do período colonial." },
    { p: "Quem propôs o 20 de novembro como data de reflexão, em 1971, em Porto Alegre?", o: ["O Grupo Palmares, com Oliveira Silveira", "A princesa Isabel", "O Teatro Experimental do Negro", "Machado de Assis"], c: 0,
      e: "O Grupo Palmares propôs a data no lugar do 13 de maio, que celebrava a Lei Áurea." },
    { p: "Em que ano foi criado o Movimento Negro Unificado (MNU)?", o: ["1888", "1944", "1978", "2003"], c: 2,
      e: "O MNU, criado em 1978, reuniu organizações contra a discriminação racial." },
    { p: "O que a Constituição de 1988 estabeleceu sobre o racismo?", o: ["Que é uma contravenção simples", "Que é crime inafiançável e imprescritível", "Que prescreve em 5 anos", "Nada sobre o assunto"], c: 1,
      e: "A Constituição também garante aos quilombolas o direito às terras que ocupam." },
    { p: "Qual lei criou as cotas para escola pública, pretos, pardos e indígenas nas universidades federais?", o: ["Lei 7.716/1989", "Lei 12.711/2012", "Lei 10.639/2003", "Lei 14.759/2023"], c: 1,
      e: "A Lei 12.711/2012 reserva vagas em universidades e institutos federais." },
    { p: "Qual é a obra de Maria Firmina dos Reis, de 1859?", o: ["Úrsula", "Ponciá Vicêncio", "Quarto de Despejo", "Dom Casmurro"], c: 0,
      e: "\"Úrsula\" é considerado o primeiro romance abolicionista escrito por uma mulher no Brasil." },
    { p: "Quem fundou o Teatro Experimental do Negro, em 1944?", o: ["Abdias Nascimento", "Milton Santos", "Luiz Gama", "Zumbi"], c: 0,
      e: "Abdias Nascimento foi ativista, artista e político." },
    { p: "Que conceito foi criado pela escritora Conceição Evaristo?", o: ["Racismo estrutural", "Escrevivência", "Antirracismo", "Quilombismo"], c: 1,
      e: "\"Escrevivência\" une escrita e vivência, e aparece em obras como \"Ponciá Vicêncio\" (2003)." },
    { p: "Quantos por cento dos brasileiros se declararam pretos ou pardos no Censo 2022 do IBGE?", o: ["25,5%", "38%", "55,5%", "80%"], c: 2,
      e: "Segundo o Censo 2022, 55,5% da população se declarou preta ou parda." },
    { p: "Qual ofício das baianas é patrimônio imaterial do Brasil?", o: ["O de acarajé", "O de bordadeira", "O de ceramista", "O de rendeira"], c: 0,
      e: "O acarajé e o dendê mostram a força da cozinha afro-brasileira." },
    { p: "Qual destas é uma religião de matriz africana?", o: ["Luteranismo", "Candomblé", "Budismo", "Hinduísmo"], c: 1,
      e: "Candomblé e umbanda preservam crenças e ritmos trazidos pelos africanos, e ainda enfrentam intolerância." },
    { p: "Qual destes ritmos nasceu nas comunidades afro-brasileiras?", o: ["Valsa", "Polca", "Samba", "Minueto"], c: 2,
      e: "O samba nasceu nas comunidades afro-brasileiras, com destaque para a Bahia e o Rio de Janeiro." },
    { p: "Lélia Gonzalez é referência nos estudos sobre:", o: ["Astronomia", "Racismo e gênero no Brasil", "Engenharia naval", "Direito marítimo"], c: 1,
      e: "Lélia Gonzalez foi intelectual e ativista, referência nos estudos sobre racismo e gênero." },
  ];

  const caixa = document.getElementById("quiz-caixa");
  if (!caixa) return;

  let rodada = [], i = 0, acertos = 0;

  function embaralhar(lista) {
    const a = lista.map((t, idx) => ({ t, idx }));
    for (let k = a.length - 1; k > 0; k--) {
      const j = Math.floor(Math.random() * (k + 1));
      [a[k], a[j]] = [a[j], a[k]];
    }
    return a;
  }

  // Perguntas já sorteadas nesta sessão (para não repetir até acabar o banco)
  function lerUsadas() {
    try { return JSON.parse(sessionStorage.getItem("quiz-usadas")) || []; } catch (e) { return []; }
  }
  function guardarUsadas(lista) {
    try { sessionStorage.setItem("quiz-usadas", JSON.stringify(lista)); } catch (e) {}
  }

  function sortear() {
    const todas = banco.map((_, k) => k);
    let usadas = lerUsadas();
    let livres = todas.filter((k) => !usadas.includes(k));
    if (livres.length < TOTAL) { usadas = []; livres = todas; }
    const sorteadas = embaralhar(livres).slice(0, TOTAL).map((x) => x.t);
    guardarUsadas(usadas.concat(sorteadas));
    rodada = sorteadas.map((k) => banco[k]);
    i = 0;
    acertos = 0;
  }

  function mostrar() {
    const q = rodada[i];
    caixa.innerHTML = `
      <div class="quiz-topo"><span>Pergunta ${i + 1} de ${rodada.length}</span><span>Acertos: ${acertos}</span></div>
      <div class="quiz-barra"><span style="width:${(i / rodada.length) * 100}%"></span></div>
      <h3></h3>
      <div class="quiz-opcoes"></div>
      <div class="quiz-extra"></div>`;
    caixa.querySelector("h3").textContent = q.p;
    const area = caixa.querySelector(".quiz-opcoes");

    embaralhar(q.o).forEach(({ t, idx }) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "quiz-op";
      b.textContent = t;
      b.addEventListener("click", () => responder(b, idx === q.c));
      area.appendChild(b);
    });
  }

  function responder(botao, certo) {
    const q = rodada[i];
    caixa.querySelectorAll(".quiz-op").forEach((b) => {
      b.disabled = true;
      if (b.textContent === q.o[q.c]) b.classList.add("certa");
    });
    if (certo) acertos++; else botao.classList.add("errada");

    const ultima = i === rodada.length - 1;
    caixa.querySelector(".quiz-extra").innerHTML = `
      <p class="quiz-retorno"><strong>${certo ? "Acertou!" : "Não foi dessa vez."}</strong> ${q.e}</p>
      <button type="button" class="botao" id="quiz-prox">${ultima ? "Ver resultado" : "Próxima pergunta"}</button>`;
    document.getElementById("quiz-prox").focus();
    document.getElementById("quiz-prox").addEventListener("click", () => {
      if (ultima) fim(); else { i++; mostrar(); }
    });
  }

  function fim() {
    const msg = acertos === rodada.length ? "Perfeito! Você aprendeu tudo."
      : acertos >= 5 ? "Muito bem! Você conhece bem o tema."
      : "Vale rever a exposição e tentar de novo.";
    caixa.innerHTML = `
      <div class="quiz-final">
        <h3>Resultado</h3>
        <p class="quiz-nota">${acertos}/${rodada.length}</p>
        <p>${msg}</p>
        <button type="button" class="botao" id="quiz-de-novo">Jogar de novo com novas perguntas</button>
      </div>`;
    document.getElementById("quiz-de-novo").addEventListener("click", () => { sortear(); mostrar(); });
  }

  sortear();
  mostrar();
})();
