let tabuleiro = [ ['', '', ''], ['', '', ''], ['', '', ''] ];
let jogador   = 'X';
let jogadorIA = 'O';

let placar = { x: 0, o: 0 }

let qtde = 0;
let fimDoJogo = false;

function pisca(div1, div2, div3) 
{

    let interval = setInterval(function() {

        div1.style.backgroundColor = div1.style.backgroundColor == 'red' ? 'white' : 'red';
        div2.style.backgroundColor = div2.style.backgroundColor == 'red' ? 'white' : 'red';
        div3.style.backgroundColor = div3.style.backgroundColor == 'red' ? 'white' : 'red';

        qtde++;
        if (qtde >= 4) clearInterval(interval);

    }, 750);

}

function celClick(linha, coluna) 
{
    
    if ( ( tabuleiro[linha][coluna] == '' ) && ( !fimDoJogo ) ) {
        
        tabuleiro[linha][coluna] = jogador;

        let img = document.getElementById('imagem'+linha+coluna);
        img.src = jogador == 'X' ? 'img/i-x.png' : 'img/i-o.png';
        
        jogador = jogador == 'X' ? 'O' : 'X';

        IA();
        
        let verifica = VerificaGanhador();
        if (verifica.ganhador) {
            AtualizarPlacar(verifica.jogador);
            FimDoJogo(verifica.c1, verifica.c2, verifica.c3);
        }

    }

}

function FimDoJogo(cel1, cel2, cel3)
{
    
    fimDoJogo = true;

    let div1 = document.getElementById('cel'+cel1);
    let div2 = document.getElementById('cel'+cel2);
    let div3 = document.getElementById('cel'+cel3);

    div1.style.backgroundColor = 'red';
    div2.style.backgroundColor = 'red';
    div3.style.backgroundColor = 'red';
        
    pisca(div1, div2, div3);

}

function VerificaGanhador() 
{

    if ( tabuleiro[0][0] != '' && tabuleiro[0][0] == tabuleiro[0][1] && tabuleiro[0][0] == tabuleiro[0][2] ) {
        return {ganhador: true, jogador: tabuleiro[0][0], c1: 0, c2: 1, c3: 2};
    } else if ( tabuleiro[1][0] != '' && tabuleiro[1][0] == tabuleiro[1][1] && tabuleiro[1][0] == tabuleiro[1][2] ) {
        return {ganhador: true, jogador: tabuleiro[1][0], c1: 3, c2: 4, c3: 5};
    } else if ( tabuleiro[2][0] != '' && tabuleiro[2][0] == tabuleiro[2][1] && tabuleiro[2][0] == tabuleiro[2][2] ) {
        return {ganhador: true, jogador: tabuleiro[2][0], c1: 6, c2: 7, c3: 8};
    } else if ( tabuleiro[0][0] != '' && tabuleiro[0][0] == tabuleiro[1][0] && tabuleiro[0][0] == tabuleiro[2][0] ) {
        return {ganhador: true, jogador: tabuleiro[0][0], c1: 0, c2: 3, c3: 6};
    } else if ( tabuleiro[0][1] != '' && tabuleiro[0][1] == tabuleiro[1][1] && tabuleiro[0][1] == tabuleiro[2][1] ) {
        return {ganhador: true, jogador: tabuleiro[0][1], c1: 1, c2: 4, c3: 7};
    } else if ( tabuleiro[0][2] != '' && tabuleiro[0][2] == tabuleiro[1][2] && tabuleiro[0][2] == tabuleiro[2][2] ) {
        return {ganhador: true, jogador: tabuleiro[0][2], c1: 2, c2: 5, c3: 8};
    } else if ( tabuleiro[0][0] != '' && tabuleiro[0][0] == tabuleiro[1][1] && tabuleiro[0][0] == tabuleiro[2][2] ) {
        return {ganhador: true, jogador: tabuleiro[0][0], c1: 0, c2: 4, c3: 8};
    } else if ( tabuleiro[0][2] != '' && tabuleiro[0][2] == tabuleiro[1][1] && tabuleiro[0][2] == tabuleiro[2][0] ) {
        return {ganhador: true, jogador: tabuleiro[0][2], c1: 2, c2: 4, c3: 6};
    } else {
        return {ganhador: false, jogador: '', c1: 0, c2: 0, c3: 0};
    }

}

function TabuleiroCompleto()
{

    return (
        tabuleiro[0][0] != '' && tabuleiro[0][1] != '' && tabuleiro[0][2] != '' &&
        tabuleiro[1][0] != '' && tabuleiro[1][1] != '' && tabuleiro[1][2] != '' &&
        tabuleiro[2][0] != '' && tabuleiro[2][1] != '' && tabuleiro[2][2] != ''
    );

}

function Recomecar() 
{

    let recomecar = confirm('Recomeçar Jogo?');

    if (recomecar) {

        tabuleiro = [ ['', '', ''], ['', '', ''], ['', '', ''] ];
        jogador   = 'X';
        qtde      = 0;
        fimDoJogo = false;

        let imagens = document.getElementsByTagName('img');
        for (let imagem of imagens) {
            imagem.src = '';
        }

        let celulas = document.getElementsByClassName('celula');
        for (let celula of celulas) {
            celula.style.backgroundColor = 'white';
        }

    }

}

function AtualizarPlacar(jogador_vencedor)
{

    if (jogador_vencedor == 'X') {                
        placar.x++;
    } else if (jogador_vencedor == 'O') {                
        placar.o++;
    } else if (jogador_vencedor == 'zerar') {                
        placar.x = 0;
        placar.o = 0;
    }

    let placar_x = document.getElementById('placar_x');
    let placar_o = document.getElementById('placar_o');

    placar_x.innerHTML = placar.x;
    placar_o.innerHTML = placar.o;

}

function ZerarPlacar() 
{
    AtualizarPlacar('zerar');
}

function IA()
{

    if ( !TabuleiroCompleto() ) {
    
        if (jogador == jogadorIA) {

            let action = MelhorAcao(tabuleiro, jogador);

            if(action) {

                tabuleiro[action[0]][action[1]] = jogador;

                let img = document.getElementById('imagem'+action[0]+action[1]);
                img.src = jogador == 'X' ? 'img/i-x.png' : 'img/i-o.png';

                jogador = jogador == 'X' ? 'O' : 'X';

            }
        }

    }

}

/* INICIO IA MiniMax */

// Faz a copia 
function deepCopy(x)
{
    return JSON.parse(JSON.stringify(x));
}

//Estima valor do tabuleiro
function heuristica(tabu, jog) 
{ 

    var h = 0;
    var oponente = jog == 'X' ? 'O' : 'X';

    for (var i = 0; i < 3; i++) {                
        if (tabu[i][0] != oponente && tabu[i][1] != oponente && tabu[i][2] != oponente)
            h += Math.pow((tabu[i][0] == jog) + (tabu[i][1] == jog) + (tabu[i][2] == jog), 2);
    }

    for (var i = 0; i < 3; i++) {
        if (tabu[0][i] != oponente && tabu[1][i] != oponente && tabu[2][i] != oponente)
            h += Math.pow((tabu[0][i] == jog) + (tabu[1][i] == jog) + (tabu[2][i] == jog), 2);
    }

    if (tabu[0][0] != oponente && tabu[1][1] != oponente && tabu[2][2] != oponente)
        h += Math.pow((tabu[0][0] == jog) + (tabu[1][1] == jog) + (tabu[2][2] == jog), 2);

    if (tabu[0][2] != oponente && tabu[1][1] != oponente && tabu[2][0] != oponente)
        h += Math.pow((tabu[0][2] == jog) + (tabu[1][1] == jog) + (tabu[2][0] == jog), 2);

    for (var i = 0; i < 3; i++) {
        if (tabu[i][0] != jog && tabu[i][1] != jog && tabu[i][2] != jog)
            h -= Math.pow((tabu[i][0] == oponente) + (tabu[i][1] == oponente) + (tabu[i][2] == oponente), 2);
    }

    for (var i = 0; i < 3; i++) {
        if (tabu[0][i] != jog && tabu[1][i] != jog && tabu[2][i] != jog)
            h -= Math.pow((tabu[0][i] == oponente) + (tabu[1][i] == oponente) + (tabu[2][i] == oponente), 2);
    }

    if (tabu[0][0] != jog && tabu[1][1] != jog && tabu[2][2] != jog)
        h -= Math.pow((tabu[0][0] == oponente) + (tabu[1][1] == oponente) + (tabu[2][2] == oponente), 2);

    if (tabu[0][2] != jog && tabu[1][1] != jog && tabu[2][0] != jog)
        h -= Math.pow((tabu[0][2] == oponente) + (tabu[1][1] == oponente) + (tabu[2][0] == oponente), 2);
    
    return h;

}

//Computa resultado da jogada
function Jogada(tabu, pos, jog) 
{

    let novo_tabuleiro = deepCopy(tabu);

    novo_tabuleiro[pos[0]][pos[1]] = jog;

    return novo_tabuleiro;

}

//Lista jogadas possíveis
function JogadasPossiveis(tabu) 
{

    let jogadas = [];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            
            if (tabu[i][j] == '') {
                jogadas.push([i, j]);
            }
            
        }
    }

    return jogadas;

}

function Minimax(tabu, jog, eu, profundidade=9)
{

    let w = VerificaGanhador();
    if ( w.ganhador && w.jogador == eu ) return 999;
    if ( w.ganhador && w.jogador != eu ) return -999;
    if ( TabuleiroCompleto() ) return 0;
    if (profundidade == 0) return heuristica(tabu, eu);

    let jogadas = JogadasPossiveis(tabu);
    
    if (jog == eu) { //MAX

        let melhor = -Infinity;

        for (let i in jogadas) {
            
            let resultado = Jogada(tabu, jogadas[i], jog);
            let valor = Minimax(resultado, jog == 'X' ? 'O' : 'X', eu, profundidade-1);

            if (valor > melhor) {
                melhor = valor;
            }

        }

        return melhor;

    } else { //MIN

        let melhor = Infinity;

        for (var i in jogadas) {
            
            let resultado = Jogada(tabu, jogadas[i], jog);
            let valor = Minimax(resultado, jog == 'X' ? 'O' : 'X', eu, profundidade-1);

            if (valor < melhor) {
                melhor = valor;
            }

        }

        return melhor;

    }

}

//Retorna melhor jogada. 'eu' = quem é o max
function MelhorAcao(tabu, eu) 
{

    let jogadas = JogadasPossiveis(tabu);
    let melhor = -Infinity;
    let melhor_jogada = null;

    for (let i in jogadas) {

        let resultado = Jogada(tabu, jogadas[i], eu);
        let valor = Minimax(resultado, eu == 'X' ? 'O' : 'X', eu, 1);

        if (valor > melhor) {
            melhor = valor;
            melhor_jogada = jogadas[i];
        }

    }

    return melhor_jogada;

}