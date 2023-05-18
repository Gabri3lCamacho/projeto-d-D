// Declaração das variáveis
const pontosTotais = 32;
let pontosRestantes = pontosTotais;

// Seleciona os elementos HTML que serão utilizados
const botoes = document.querySelectorAll("[data-controle]");
const contadores = document.querySelectorAll("[data-contador]");
const estatisticas = document.querySelectorAll("[data-estatistica]");

// Adiciona um evento de clique para cada botão de controle
botoes.forEach((botao) => {
  botao.addEventListener("click", (evento) => {
    // Seleciona o contador correspondente ao botão clicado
    const contador = evento.target.parentNode.querySelector("[data-contador]");
    // Identifica qual operação foi realizada (+ ou -)
    const operacao = evento.target.dataset.controle;
    // Identifica o índice do contador
    const index = parseInt(contador.dataset.index);
    // Calcula o modificador de acordo com o valor atual do contador
    let mod = (contador.value - 10) / 2;

    // Se o botão de subtração foi clicado e o contador não atingiu o mínimo, diminui o valor do contador e aumenta os pontos restantes
    if (operacao === "-" && parseInt(contador.value) > 8) {
      contador.value = parseInt(contador.value) - 1;
      pontosRestantes++;
    // Se o botão de adição foi clicado e o contador não atingiu o máximo e ainda há pontos restantes, aumenta o valor do contador e diminui os pontos restantes
    } else if (operacao === "+" && parseInt(contador.value) < 27 && pontosRestantes > 0) {
      contador.value = parseInt(contador.value) + 1;
      pontosRestantes--;
    }

    // Desabilita o botão de adição se não há mais pontos restantes para distribuir
    if (pontosRestantes === 0) {
      botoes.forEach((botao) => {
        if (botao.dataset.controle === "+") {
          botao.disabled = true;
        }
      });
    // Habilita o botão de adição caso ainda haja pontos restantes para distribuir
    } else {
      botoes.forEach((botao) => {
        if (botao.dataset.controle === "+") {
          botao.disabled = false;
        }
      });
    }

    // Atualiza o modificador correspondente ao contador
    // Atualiza a estatística correspondente ao contador

    // Atualiza as estatísticas correspondentes aos outros contadores
    for (let i = 0; i < contadores.length; i++) {
      if (i !== index) {
        let mod = (contadores.item(i).value - 10) / 2;

        if (contadores.item(i).value == 8 || contadores.item(i).value == 9) {
          mod = -1;
        } else if (contadores.item(i).value == 10 || contadores.item(i).value == 11) {
          mod = 0;
        } else if (contadores.item(i).value > 11) {
          mod = Math.floor((contadores.item(i).value - 10) / 2);
        } else if (contadores.item(i).value < 8) {
          mod = Math.ceil((contadores.item(i).value - 10) / 2);
        }

        estatisticas.item(i).textContent = mod;
      }
    }
  });
});