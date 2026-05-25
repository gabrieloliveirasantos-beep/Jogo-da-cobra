const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const TAMANHO_BLOCO = 20;

let cobra, direcao, comida, pontos, loop;

// Inicia ou reinicia o jogo com a velocidade escolhida
function iniciarJogo(velocidade) {
  document.getElementById("controles").style.display = "none";
  document.getElementById("reiniciar").style.display = "none";
  canvas.style.display = "block";

  cobra = [{ x: 200, y: 200 }];
  direcao = { x: 1, y: 0 };
  pontos = 0;

  gerarComida();
  clearInterval(loop);
  loop = setInterval(() => atualizarJogo(velocidade), velocidade);
}

// Volta para o menu de escolha de velocidade
function voltarMenu() {
  document.getElementById("controles").style.display = "flex";
  document.getElementById("reiniciar").style.display = "none";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Gera comida em posição aleatória
function gerarComida() {
  let x = Math.floor(Math.random() * (canvas.width / TAMANHO_BLOCO)) * TAMANHO_BLOCO;
  let y = Math.floor(Math.random() * (canvas.height / TAMANHO_BLOCO)) * TAMANHO_BLOCO;
  comida = { x, y };
}

// Captura o teclado
document.addEventListener("keydown", function (evento) {
  if (evento.key === "ArrowUp"    && direcao.y === 0) direcao = { x: 0, y: -1 };
  if (evento.key === "ArrowDown"  && direcao.y === 0) direcao = { x: 0, y: 1 };
  if (evento.key === "ArrowLeft"  && direcao.x === 0) direcao = { x: -1, y: 0 };
  if (evento.key === "ArrowRight" && direcao.x === 0) direcao = { x: 1, y: 0 };
});

// Game over
function gameOver() {
  clearInterval(loop);
  document.getElementById("mensagemFinal").textContent = "Você fez " + pontos + " ponto(s)!";
  document.getElementById("reiniciar").style.display = "block";
}

// Loop principal
function atualizarJogo(velocidade) {
  let novasCabeca = {
    x: cobra[0].x + direcao.x * TAMANHO_BLOCO,
    y: cobra[0].y + direcao.y * TAMANHO_BLOCO,
  };

  if (
    novasCabeca.x < 0 || novasCabeca.x >= canvas.width ||
    novasCabeca.y < 0 || novasCabeca.y >= canvas.height
  ) { gameOver(); return; }

  for (let bloco of cobra) {
    if (novasCabeca.x === bloco.x && novasCabeca.y === bloco.y) {
      gameOver(); return;
    }
  }

  cobra.unshift(novasCabeca);

  if (novasCabeca.x === comida.x && novasCabeca.y === comida.y) {
    pontos++;
    gerarComida();
  } else {
    cobra.pop();
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff88";
  for (let bloco of cobra) {
    ctx.fillRect(bloco.x, bloco.y, TAMANHO_BLOCO, TAMANHO_BLOCO);
  }

  ctx.fillStyle = "#ff4444";
  ctx.fillRect(comida.x, comida.y, TAMANHO_BLOCO, TAMANHO_BLOCO);

  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.textAlign = "left";
  ctx.fillText("Pontos: " + pontos, 8, 20);
}