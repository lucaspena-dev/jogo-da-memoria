//Variáveis
const form = document.querySelector('.login_form');
const input = document.querySelector('#input');
const button = document.querySelector('.login_button');

// Função que redireciona o jogador para a página do jogo.
function playButton() {
    window.location.assign("./pages/jogo-da-memoria.html");
}

// Função que adiciona uma validação no input para liberar o botão.
const validateInput = ({ target }) => {
    if (target.value.length >= 1) {
        button.removeAttribute('disabled');
        return;
    }
    button.setAttribute('disabled', '');
};

// Função que salva o nickname do jogador no LocalStorage do navegador.
const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('player', input.value);
};

//Comando que adiciona eventos para as variáveis.
input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);

