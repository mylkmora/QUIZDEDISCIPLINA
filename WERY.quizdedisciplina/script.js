// Lógica de Dados
const perguntas = [
    {
        pergunta: "Qual linguagem é usada para estruturar páginas web?",
        opcoes: ["HTML", "CSS", "JavaScript", "Python"],
        correta: 0
    },
    {
        pergunta: "O que significa CSS?",
        opcoes: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
        correta: 1
    },
    {
        pergunta: "Qual símbolo usa-se para criar uma variável em JavaScript?",
        opcoes: ["#", "@", "let / const", "$"],
        correta: 2
    },
    {
        pergunta: "Qual método altera o conteúdo de um elemento no DOM?",
        opcoes: ["changeText", "textContent", "getElement", "modifyHTML"],
        correta: 1
    },
    {
        pergunta: "O que é o GitHub Pages?",
        opcoes: ["Um editor de código", "Hospedagem de sites gratuita", "Banco de dados", "Linguagem de programação"],
        correta: 1
    }
];

let pontuacao = 0;
let indiceAtual = 0;

// Elementos DOM
const telaQuiz = document.getElementById('tela-quiz');
const telaResultado = document.getElementById('tela-resultado');
const elementoPergunta = document.getElementById('pergunta');
const elementoOpcoes = document.getElementById('opcoes');
const barraProgresso = document.getElementById('progresso');
const mensagemFinal = document.getElementById('mensagem-final');
const pontuacaoFinal = document.getElementById('pontuacao-final');
const botaoReiniciar = document.getElementById('reiniciar');

// Iniciar quiz
carregarPergunta();

function carregarPergunta() {
    // Atualizar barra de progresso
    barraProgresso.style.width = `${(indiceAtual / perguntas.length) * 100}%`;

    // Pegar pergunta atual
    const atual = perguntas[indiceAtual];
    elementoPergunta.textContent = atual.pergunta;
    elementoOpcoes.innerHTML = '';

    // Criar botões das opções
    atual.opcoes.forEach((opcao, indice) => {
        const botao = document.createElement('div');
        botao.classList.add('opcao');
        botao.textContent = opcao;
        botao.addEventListener('click', () => verificarResposta(indice));
        elementoOpcoes.appendChild(botao);
    });
}

// Verificar resposta
function verificarResposta(indiceEscolhido) {
    const botoes = document.querySelectorAll('.opcao');
    const correta = perguntas[indiceAtual].correta;

    // Bloquear clique
    botoes.forEach(b => b.style.pointerEvents = 'none');

    // Marcar certo ou errado
    if (indiceEscolhido === correta) {
        botoes[indiceEscolhido].classList.add('certo');
        pontuacao++;
    } else {
        botoes[indiceEscolhido].classList.add('errado');
        botoes[correta].classList.add('certo');
    }

    // Próxima pergunta ou finalizar
    setTimeout(() => {
        indiceAtual++;
        if (indiceAtual < perguntas.length) {
            carregarPergunta();
        } else {
            mostrarResultado();
        }
    }, 1000);
}

// Tela de resultado
function mostrarResultado() {
    telaQuiz.classList.add('oculto');
    telaResultado.classList.remove('oculto');
    barraProgresso.style.width = '100%';

    const porcentagem = Math.round((pontuacao / perguntas.length) * 100);

    if (porcentagem >= 80) {
        mensagemFinal.textContent = "🎉 Parabéns! Você arrasou!";
    } else if (porcentagem >= 50) {
        mensagemFinal.textContent = "👍 Bom trabalho! Continue estudando!";
    } else {
        mensagemFinal.textContent = "💤 Fica tranquilo, pratique mais!";
    }

    pontuacaoFinal.textContent = `Você acertou ${pontuacao} de ${perguntas.length} questões (${porcentagem}%)`;
}

// Reiniciar
botaoReiniciar.addEventListener('click', () => {
    pontuacao = 0;
    indiceAtual = 0;
    telaResultado.classList.add('oculto');
    telaQuiz.classList.remove('oculto');
    carregarPergunta();
});