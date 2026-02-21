// Visual
let tabuleiro = document.querySelector('.game-area');
let vezHtml = document.querySelector('.play-info #vez p');
let warningHtml = document.querySelector('.play-info #warning p');

// Eventos
document.querySelector('#reset').addEventListener('click', resetGame);

document.querySelectorAll('.item').forEach((item) => {
    item.addEventListener('click', itemClicked);
});

// Início
let jogo = {};
let player = '';
let warning = '';
let playing = false;

resetGame();

// Funções
function resetGame() {
    jogo = {
        a1: '', a2: '', a3: '',
        b1: '', b2: '', b3: '',
        c1: '', c2: '', c3: ''
    };

    player = sortPLayer();

    warning = '';

    playing = true;

    updateVisor();
}

function sortPLayer() {
    let n = Math.round(Math.random());
    let vez = (n === 1) ? 'X' : 'O';
    return vez;
}

function updateVisor() {
    vezHtml.innerHTML = player;
    warningHtml.innerHTML = warning;

    tabuleiro.querySelectorAll('div').forEach((div) => {
        let square = div.getAttribute('data-key');

        if(jogo[square] !== '') {
            div.innerText = jogo[square];
        } else {
            div.innerHTML = '';
        }
    })
}

function itemClicked(e) {
    let square = e.target.getAttribute('data-key');
    
    if(jogo[square] == '' && playing) {
        jogo[square] = player;

        togglePlayer();
        updateVisor();
        checkGame();
    }
}

function togglePlayer() {
    player = (player === 'X') ? 'O' : 'X';
}

function checkGame() {
    if(checkWinnerFor('X')) {
        playing = false;
        warningHtml.innerText = `O 'X' venceu.`
    }
    else if(checkWinnerFor('O')) {
        playing = false;
        warningHtml.innerText = `O 'O' venceu.`
    }
    else if(isFull()) {
        playing = false;
        warningHtml.innerText = `Empate`
    }
}

function checkWinnerFor(player) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let w in pos) {
        let pArray = pos[w].split(','); // a1, a2, a3
        let hasWon = pArray.every( option => jogo[option] === player );
        if(hasWon) {
            return true;
        }
    }

    return false;
}

function isFull() {
    for(let i in jogo) {
        let pos = jogo[i]
        
        if(pos == '') {
            return false;
        }
    }

    return true;
}