const emojis = ['🐶', '🐱', '🦊', '🐻', '🐼', '🐸', '🐵', '🦁'];
let cards = [...emojis, ...emojis]; // 8 pares = 16 cartas
cards = cards.sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById('gameBoard');
const resetBtn = document.getElementById('resetBtn');
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Crear cartas
function createBoard (){
cards.forEach((emoji) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="front">❓</div>
    <div class="back">${emoji}</div>
  `;

  card.addEventListener('click', () => {
    if (lockBoard || card.classList.contains('flipped')) return;

    card.classList.add('flipped');

    if (!firstCard) {
      firstCard = card;
    } else {
      secondCard = card;
      lockBoard = true;

      const firstEmoji = firstCard.querySelector('.back').textContent;
      const secondEmoji = secondCard.querySelector('.back').textContent;

      if (firstEmoji === secondEmoji) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetBoard();
      } else {
        setTimeout(() => {
          firstCard.classList.remove('flipped');
          secondCard.classList.remove('flipped');
          resetBoard();
        }, 1000);
      }
    }
  });

  gameBoard.appendChild(card);
});
}
function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}
function resetGame() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  gameBoard.innerHTML = "";
  cards = [...emojis, ...emojis].sort(() => 0.5 - Math.random());
  createBoard();
}
resetBtn.addEventListener('click',resetGame);
resetGame();