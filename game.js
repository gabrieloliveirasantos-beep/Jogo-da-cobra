// Pega o canvas do HTML e prepara o "pincel" para desenhar
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Tamanho de cada quadradinho do jogo (cobra e comida)
const TAMANHO_BLOCO = 20;

// Posição inicial da cobra (um único bloco no centro)
let cobra = [{ x: 200, y: 200 }];

// Posição inicial da comida (fixa por enquanto)
let comida = { x: 100, y: 100 };

// Função que desenha tudo na tela
function desenhar() {
  // 1. Limpa a tela antes de redesenhar
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 2. Desenha a cobra (verde)
  ctx.fillStyle = "#00ff88";
  for (let bloco of cobra) {
    ctx.fillRect(bloco.x, bloco.y, TAMANHO_BLOCO, TAMANHO_BLOCO);
  }

  // 3. Desenha a comida (vermelha)
  ctx.fillStyle = "#ff4444";
  ctx.fillRect(comida.x, comida.y, TAMANHO_BLOCO, TAMANHO_BLOCO);
}

// Chama a função para desenhar na tela
desenhar();