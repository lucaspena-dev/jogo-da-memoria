// Variáveis.
const spanPlayer = document.querySelector('.player');
const grid = document.querySelector('.grid');
const tagRound = document.querySelector('#round');
const watch = document.querySelector('.watch');
const bclose = document.querySelector('#close');

// Array com o nome das imagens.
const characters = [
  'Boo',
  'Bowser',
  'Coin',
  'Daisy',
  'Goomba',
  'Luigi',
  'Mario',
  'Peach',
  'Piranha',
  'Shell',
  'Shy Guy',
  'Toad',
  'Toadette',
  'Waluigi',
  'Wario',
  'Yoshi',
];

// Variáveis para os contadores de round, pontos e tempo. 
let interval;
let round = 1;
let hours = 0;
let minutes = 0;
let seconds = 0;

// Função para acessar a página inicial.
 function closeButton() {
  bclose = window.location.assign("../index.html");
 }

// Função que adicionar um zero na frente para os contadores.
 function twoDigits(number) {
  return number < 10? `0${number}` : number;
}

// Função que cria tags e classes.
const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

// Função que cria as cartas.
const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../src/media/img/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', flipCard);
  card.setAttribute('data-character', character);

  return card;
}

// Função que duplica as cartas.
const loadGame = () => {
  const duplicatedCharacters = [...characters,...characters];
  const shuflleArray = duplicatedCharacters.sort(() => Math.random() - 0.5);
  duplicatedCharacters.forEach((character) => {
      const card = createCard(character);
      grid.appendChild(card);
  });
}

// Função que aciona a animação de virada da carta no CSS.
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('reveal-card');
  
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
    secondCard = this;
    checkCards();
}

// Função que checa se tem 2 cartas viradas e se elas são iguais.
const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');
    disabledCards();
    checkEndGame();
  } else {
    unflipCard();
  }
}

// Função que desabilita o evento 'click' das cartas pares.
const disabledCards = () => {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

// Função que desvira as cartas.
const unflipCard = () => {
  lockBoard = true;

  setTimeout (() => {
    firstCard.classList.remove('reveal-card');
    secondCard.classList.remove('reveal-card');
    resetBoard();
  }, 650);
}

// Função que reseta os valores da para null.
// Só permite clicar em 2 cartas ao mesmo tempo.
const resetBoard = () => {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Função que checa se todas as cartas pares foram localizadas.
// Se confirmado um ponto é adicionado e uma nova rodada começa.
const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');
  if (disabledCards.length === 32) {
    setTimeout(() => {
      clearInterval(watch);
      alert(`Parabéns ${spanPlayer.innerHTML}, você ganhou esta rodada! Seu tempo foi de ${watch.innerHTML}!`)
      }, 200);
    setTimeout(() => {
      round++;
      tagRound.innerHTML = twoDigits(round);
      resetTimer();
      grid.innerHTML = '';
      return loadGame();
    }, 300);
  }
}

// Função que reseta o timer.
const resetTimer = () => {
  hours = 0;
  minutes = 0;
  seconds = 0;

  hours.textContent = '00';
  minutes.textContent = '00';
  seconds.textContent = '00';
}

// Função que da ínicio a contagem do tempo.
const startTimer = () => {
   const watch = setInterval(() => {
    seconds += 1;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    if (minutes === 60) {
      hours++;
      minutes = 0;
    }
    document.querySelector('.watch').innerText = twoDigits(hours)+':'+twoDigits(minutes)+':'+twoDigits(seconds); 
  }, 1000);
}

// Função que inicia o jogo quando a página é carregada.  
window.onload = () => {
  const playerName = localStorage.getItem('player');
  spanPlayer.innerHTML = playerName;
  startTimer();
  loadGame();
}
