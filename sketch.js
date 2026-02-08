// mapa é um grid de células bidimensional (matriz)
// Cada célula pode estar viva ou morta
// Mapa finito e não pode haver células fora do mapa


// 0 = vazio
// 1 = viva
let numeroColunas;
let numeroLinhas;
const tamanhoCelula = 20;

var mapaMatriz = [];
var proximoMapaMatriz = [];

var gameStarted = false;
var setupCompleto = false;

// 0 = preparação
// 1 = começou
let estagioJogo = 0;

function setup() {
    frameRate(10);
    createCanvas(600, 600);

    numeroColunas = floor(width / tamanhoCelula);
    numeroLinhas = floor(height / tamanhoCelula);

    for (let linha = 0; linha < numeroLinhas; linha++){
        mapaMatriz[linha] = [];
        proximoMapaMatriz[linha] = [];
        for (let coluna = 0; coluna < numeroColunas; coluna++){
            mapaMatriz[linha][coluna] = [0];
            proximoMapaMatriz[linha][coluna] = [0];
        }
    }

    let divWrapperBotoes = createDiv();
    divWrapperBotoes.class('wrapperBotoes')

    
    let divBotaoRandomizar = createDiv('<h3>Randomizar</h3>');
    divBotaoRandomizar.class('botaoIniciar botaoDesbloqueadoRandom');
    divBotaoRandomizar.mouseClicked(() => {
        randomizarMatriz()
    })
    divWrapperBotoes.child(divBotaoRandomizar)

    
    let divBotaoIniciar = createDiv('<h3>Iniciar</h3>')
    divBotaoIniciar.class('botaoIniciar botaoDesbloqueado')
    divBotaoIniciar.mouseClicked(() => {
        gameStarted = true;

        divBotaoIniciar.class('botaoIniciar botaoBloqueado')
        divBotaoRandomizar.class('botaoIniciar botaoBloqueado')
    })
    divWrapperBotoes.child(divBotaoIniciar)


    setupCompleto = true;
}

function draw() {
    background(255);

    console.log("gameStarted ", gameStarted)

    if (gameStarted && setupCompleto){
        simular()
    }

    for(let coluna = 0; coluna < numeroColunas; coluna++){
        for(let linha = 0; linha < numeroLinhas; linha++){
            stroke(0)
            if (mapaMatriz[coluna][linha] == 0){
                fill('white');
            }
            else if(mapaMatriz[coluna][linha] == 1){
                fill('black');
            }
            
            rect(coluna*tamanhoCelula, linha*tamanhoCelula, tamanhoCelula, tamanhoCelula);
            fill('white');
        }
    }
}

function contagemCelulasVivasVizinhas(linha, coluna){
    let contagem = 0;

    let esquerda = (coluna - 1 + numeroColunas) % numeroColunas;

    let direita = (coluna + 1) % numeroColunas;

    let cima = (linha - 1 + numeroLinhas) % numeroLinhas;

    let baixo = (linha + 1) % numeroLinhas;

    contagem = mapaMatriz[cima][esquerda] + mapaMatriz[cima][coluna] + mapaMatriz[cima][direita] + mapaMatriz[linha][esquerda] + mapaMatriz[linha][direita] + mapaMatriz[baixo][esquerda] + mapaMatriz[baixo][coluna] + mapaMatriz[baixo][direita]

    return contagem;
}

function randomizarMatriz(){
    console.log("randomizei")
    for (let linha = 0; linha < numeroLinhas; linha++){
        for(let coluna = 0; coluna < numeroColunas; coluna++){

            mapaMatriz[linha][coluna] = random([0, 1])
        }
    }
}

function simular(){
    for (let linha = 0; linha < numeroLinhas; linha++){
        for(let coluna = 0; coluna < numeroColunas; coluna++){
            let contagemVizinhos = contagemCelulasVivasVizinhas(linha, coluna);
            
            // - Qualquer célula viva com menos de 2 células (vivas) vizinhas, morre. SUBPOPULAÇÃO
            // - Qualquer célula viva com mais de três células (vivas) vizinhas, morre. SUPERPOPULAÇÃO
            if (contagemVizinhos < 2 || contagemVizinhos > 3) {
                proximoMapaMatriz[linha][coluna] = 0;
            }

            // - Qualquer célula morta com exatas três células (vivas) vizinhas, revive.
            else if (contagemVizinhos == 3 && mapaMatriz[linha][coluna] == 0){
                proximoMapaMatriz[linha][coluna] = 1
            }
            
            // - Qualquer célula viva com duas ou três células (vivas) vizinhas, vive.
            else {
                proximoMapaMatriz[linha][coluna] = mapaMatriz[linha][coluna];
            }

        }
    }

    let temporario = mapaMatriz;
    mapaMatriz = proximoMapaMatriz;
    proximoMapaMatriz = temporario;
}

function mouseClicked(){
    if (gameStarted || !setupCompleto){
        return;
    }

    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
        let colunaPos = floor(mouseX / tamanhoCelula)
        let linhaPos = floor(mouseY / tamanhoCelula)

        if (mapaMatriz[colunaPos][linhaPos] == 0) {
            mapaMatriz[colunaPos][linhaPos] = 1
        }
        else if (mapaMatriz[colunaPos][linhaPos] == 1) {
            mapaMatriz[colunaPos][linhaPos] = 2
        }
        else if (mapaMatriz[colunaPos][linhaPos] == 2) {
            mapaMatriz[colunaPos][linhaPos] = 0
        }

    }
}