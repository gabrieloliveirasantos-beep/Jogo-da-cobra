const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const TAMANHO_BLOCO = 20;

// Posição inicial da cobra (um bloco no centro)
let cobra = [{ x: 200, y: 200 }];

// Direção atual do movimento
let direcao = { x: 1, y: 0 };

// Posição da comida
let comida = { x: 100, y: 100 };

// Pontuação
let pontos = 0;

// Função que gera a comida em posição aleatória
function gerarComida() {
  let x = Math.floor(Math.random() * (canvas.width / TAMANHO_BLOCO)) * TAMANHO_BLOCO;
  let y = Math.floor(Math.random() * (canvas.height / TAMANHO_BLOCO)) * TAMANHO_BLOCO;
  comida = { x, y };
}

// Captura o teclado e muda a direção
document.addEventListener("keydown", function (evento) {
  if (evento.key === "ArrowUp"    && direcao.y === 0) direcao = { x: 0, y: -1 };
  if (evento.key === "ArrowDown"  && direcao.y === 0) direcao = { x: 0, y: 1 };
  if (evento.key === "ArrowLeft"  && direcao.x === 0) direcao = { x: -1, y: 0 };
  if (evento.key === "ArrowRight" && direcao.x === 0) direcao = { x: 1, y: 0 };
});

// Função principal do jogo
function atualizarJogo() {
  // 1. Calcula a nova posição da cabeça
  let novasCabeca = {
    x: cobra[0].x + direcao.x * TAMANHO_BLOCO,
    y: cobra[0].y + direcao.y * TAMANHO_BLOCO,
  };

  // 2. Verifica colisão com as paredes
  if (
    novasCabeca.x < 0 || novasCabeca.x >= canvas.width ||
    novasCabeca.y < 0 || novasCabeca.y >= canvas.height
  ) {
    clearInterval(loop);
    ctx.fillStyle = "white";
    ctx.font = "32px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over! Pontos: " + pontos, canvas.width / 2, canvas.height / 2);
    return;
  }

  // 3. Verifica colisão com o próprio corpo
  for (let bloco of cobra) {
    if (novasCabeca.x === bloco.x && novasCabeca.y === bloco.y) {
      clearInterval(loop);
      ctx.fillStyle = "white";
      ctx.font = "32px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Game Over! Pontos: " + pontos, canvas.width / 2, canvas.height / 2);
      return;
    }
  }

  // 4. Adiciona a nova cabeça
  cobra.unshift(novasCabeca);

  // 5. Verifica se comeu a comida
  if (novasCabeca.x === comida.x && novasCabeca.y === comida.y) {
    pontos++;
    gerarComida();
  } else {
    cobra.pop(); // remove o rabo se não comeu
  }

  // 6. Desenha tudo
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

// Inicia o loop do jogo (200ms = velocidade média)
gerarComida();
let loop = setInterval(atualizarJogo, 200);
