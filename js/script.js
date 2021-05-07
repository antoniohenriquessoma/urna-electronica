
//Variaveis de visualizacao da tela para display & none
const votoPara = document.querySelector('.d-1 span');
const cargo = document.querySelector('.d-2 span');
const quadrados = document.querySelector('.d-3');
const descricao = document.querySelector('.d-4')
const mensagem = document.querySelector('.mensagem');
const nomeCandidato = document.querySelector('.nome-candidato');
const partidoPolitico = document.querySelector('.partido-politico');
const nomeVice = document.querySelector('.nome-vice');
const candidato = document.querySelector('.candidato');
const vice = document.querySelector('.candidato.small');
const rodape = document.querySelector('.rodape');

const votos = [];

var numeroDigitado = '';
var etapas = null;
var etapaAtual = 0;
var votoBranco = false;


ajax('util/etapas.json', 'GET', (response) => {

    etapas = JSON.parse(response)
    console.log(etapas);
    comecarVotacao()
  
});

function comecarVotacao(){
 
    let etapa = etapas[etapaAtual];

    numeroDigitado = ''
    votoEmBranco = false
  
    quadrados.style.display = 'block'
    quadrados.innerHTML = ''
    votoPara.style.display = 'none'
    candidato.style.display = 'none'
    vice.style.display = 'none'
    descricao.style.display = 'none'
    mensagem.style.display = 'none'
    nomeCandidato.style.display = 'none'
    partidoPolitico.style.display = 'none'
    nomeVice.style.display = 'none'
    rodape.style.display = 'none'
  
    for (let i = 0; i < etapa['numeros']; i++) {
        let pisca = i == 0 ? ' pisca' : ''
     
     if(i === 0){
        quadrados.innerHTML += `
        <div class="quadrado${pisca}"></div>
      `
     }else{
        quadrados.innerHTML += `
        <div class="quadrado"></div>
      ` 
     }
       
    }

    cargo.innerHTML = etapa['titulo'];

}

function actualizarInterface(){

    console.log('Numero Digitado', numeroDigitado);

    let etapa = etapas[etapaAtual]
  let candidato = null

  for (let num in etapa['candidatos']) {
    if (num == numeroDigitado) {
      candidato = etapa['candidatos'][num]
      break
    }
  }

  console.log('Candidato: ' + candidato)
    
}




function clicou(n) {

    let elNumero = document.querySelector('.pisca')

    if(elNumero !== null){
        elNumero.innerHTML = n;
        numeroDigitado = `${numeroDigitado}${n}`;

        elNumero.classList.remove('pisca');
    
        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca');
        }else{
            actualizarInterface();
        }
      
    }
}

