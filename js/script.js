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

                    let action = bestAction(tabuleiro, jogador);

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
        function heuristica(board, jogador) 
        { 

            var h = 0;
            var oponente = jogador == 'X' ? 'O' : 'X';

            for (var i = 0; i < 3; i++) {                
                if (board[i][0] != oponente && board[i][1] != oponente && board[i][2] != oponente)
                    h += Math.pow((board[i][0] == jogador) + (board[i][1] == jogador) + (board[i][2] == jogador), 2);
            }

            for (var i = 0; i < 3; i++) {
                if (board[0][i] != oponente && board[1][i] != oponente && board[2][i] != oponente)
                    h += Math.pow((board[0][i] == jogador) + (board[1][i] == jogador) + (board[2][i] == jogador), 2);
            }

            if (board[0][0] != oponente && board[1][1] != oponente && board[2][2] != oponente)
                h += Math.pow((board[0][0] == jogador) + (board[1][1] == jogador) + (board[2][2] == jogador), 2);

            if (board[0][2] != oponente && board[1][1] != oponente && board[2][0] != oponente)
                h += Math.pow((board[0][2] == jogador) + (board[1][1] == jogador) + (board[2][0] == jogador), 2);

            for (var i = 0; i < 3; i++) {
                if (board[i][0] != jogador && board[i][1] != jogador && board[i][2] != jogador)
                    h -= Math.pow((board[i][0] == oponente) + (board[i][1] == oponente) + (board[i][2] == oponente), 2);
            }

            for (var i = 0; i < 3; i++) {
                if (board[0][i] != jogador && board[1][i] != jogador && board[2][i] != jogador)
                    h -= Math.pow((board[0][i] == oponente) + (board[1][i] == oponente) + (board[2][i] == oponente), 2);
            }

            if (board[0][0] != jogador && board[1][1] != jogador && board[2][2] != jogador)
                h -= Math.pow((board[0][0] == oponente) + (board[1][1] == oponente) + (board[2][2] == oponente), 2);

            if (board[0][2] != jogador && board[1][1] != jogador && board[2][0] != jogador)
                h -= Math.pow((board[0][2] == oponente) + (board[1][1] == oponente) + (board[2][0] == oponente), 2);
            
        return h;

        }

        //Computa resultado da jogada
        function jogada(board, pos, jogador) 
        {
        
            let new_board = deepCopy(board);

            new_board[pos[0]][pos[1]] = jogador;
        
            return new_board;

        }

        //Lista jogadas possíveis
        function jogadasPossiveis(board) 
        {

            let jogadas = [];

            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    
                    if (board[i][j] == '') {
                        jogadas.push([i, j]);
                    }
                    
                }
            }

  	        return jogadas;

        }

        function minimax(board, jogador, eu, maxdepth=9)
        {

            let w = VerificaGanhador();
            if ( w.ganhador && w.jogador == eu ) return 999;
            if ( w.ganhador && w.jogador != eu ) return -999;
            if ( TabuleiroCompleto() ) return 0;
            if (maxdepth == 0) return heuristica(board, eu);

            let jogadas = jogadasPossiveis(board);
            
            if (jogador == eu) { //MAX

                let best = -Infinity;

                for (let i in jogadas) {
                    
                    let resultado = jogada(board, jogadas[i], jogador);
                    let valor = minimax(resultado, jogador == 'X' ? 'O' : 'X', eu, maxdepth-1);

                    if (valor > best) {
                        best = valor;
                    }

                }

                return best;

            } else { //MIN

                let best = Infinity;

                for (var i in jogadas) {
                    
                    let resultado = jogada(board, jogadas[i], jogador);
                    let valor = minimax(resultado, jogador == 'X' ? 'O' : 'X', eu, maxdepth-1);

                    if (valor < best) {
                        best = valor;
                    }

                }

                return best;

            }

        }

        //Retorna melhor jogada. 'eu' = quem é o max
        function bestAction(board, eu) 
        {

            let jogadas = jogadasPossiveis(board);
            let best = -Infinity;
            let besta = null;

            for (let i in jogadas) {

                let resultado = jogada(board, jogadas[i], eu);
                let valor = minimax(resultado, eu == 'X' ? 'O' : 'X', eu, 1);

                if (valor > best) {
                    best = valor;
                    besta = jogadas[i];
                }

            }

            return besta;

        }