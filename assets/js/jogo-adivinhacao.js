const input = document.getElementById('input');
const botao = document.querySelector('.btn-palpite');
const mensagem = document.querySelector('.mensagem');
const tentativasTexto = document.querySelector('.tentativas');
const gameCard = document.querySelector('.game-card')
const botaoNovoJogo = document.querySelector('.btn-novo-jogo')

let numeroSecreto = gerarNumero();
let tentativas = 0;

botaoNovoJogo.classList.remove('show');

function gerarNumero() {
    return Math.floor(Math.random() * 100) + 1;
}

function atualizarMensagem(texto, tipo = '') {
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`.trim();
}

function criarCelebracao() {
    const container = document.querySelector('.celebration');
    const cores = ['#4dd2ff', '#8b5cf6', '#2ecc71', '#ffd166', '#ff5d7a', '#ffffff'];

    container.innerHTML = '';

    for (let i = 0; i < 28; i++) {
        const piece = document.createElement('span');
        piece.className = 'piece';

        piece.style.left = `${Math.random() * 100}%`;
        piece.style.top = `${Math.random() * 20}%`;
        piece.style.background = cores[Math.floor(Math.random() * cores.length)];
        piece.style.setProperty('--x', `${(Math.random() * 220 - 110)}px`);
        piece.style.setProperty('--y', `${(Math.random() * 240 + 140)}px`);
        piece.style.setProperty('--rot', `${Math.random() * 360}deg`);
        piece.style.setProperty('--duration', `${0.9 + Math.random() * 0.8}s`);

        container.appendChild(piece);
        setTimeout(() => piece.remove(), 2500);
    }
}

function verificarPalpite() {
    if (input.value.trim() === "") {
        atualizarMensagem('Digite um número para jogar.', 'error');
        return;
    }

    const valor = Number(input.value);

    if (Number.isNaN(valor)) {
        atualizarMensagem('Digite um número válido.', 'error');
        input.value = '';
        return;
    }

    tentativas++;

    if (valor === numeroSecreto) {
        atualizarMensagem(`Parabéns! Você acertou o número ${numeroSecreto} em ${tentativas} tentativas.`, 'success');
        gameCard.classList.add('win');
        botaoNovoJogo.classList.add('show');
        criarCelebracao();
        input.disabled = true;
        botao.disabled = true;
    } else if (valor < numeroSecreto) {
        atualizarMensagem('Tente um número maior!', 'error');
    } else {
        atualizarMensagem('Tente um número menor!', 'error');
    }

    tentativasTexto.textContent = `Tentativas: ${tentativas}`;
    input.value = '';
}
botao.addEventListener('click', verificarPalpite);

function reiniciarJogo() {
    numeroSecreto = gerarNumero()
    tentativas = 0;

    tentativasTexto.textContent = 'Tentativas: 0'

    input.value = ""
    input.disabled = false;
    botao.disabled = false;

    gameCard.classList.remove('win')
    botaoNovoJogo.classList.remove('show')

    atualizarMensagem('Novo jogo foi iniciado, Tente adivinhar o novo número!')
    input.focus();
}
botaoNovoJogo.addEventListener('click', reiniciarJogo)

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        verificarPalpite();
    }
});