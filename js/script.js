// Elementos del DOM
const monedasDiv = document.getElementById("monedas")
const palanca = document.getElementById("palanca")

// Elementos del DOM del formulario
const formulario = document.getElementById("formulario")
const botonIntroducir = document.getElementById("botonFormulario")
const inputFormulario = document.getElementById("inputFormulario")

// Elementos del DOM donde iran los resultados
const resultadoUno = document.getElementById("resultadoUno")
const resultadoDos = document.getElementById("resultadoDos")
const resultadoTres = document.getElementById("resultadoTres")

// Rutas de imagenes por default
const palancaArriba = "../img/palancaUP.png"
const palancaAbajo = "../img/palancaDOWN.png"
const imagenDefault = "../img/pingu.png"

// Imagenes de posibles resultados
const imagenes = [
  "../img/aubergine.png",
  "../img/banana.png",
  "../img/carrots.png",
  "../img/cherries.png",
  "../img/dollar.png",
  "../img/lemon.png",
  "../img/orange.png",
  "../img/peach.png",
  "../img/potato.png",
  "../img/tomato.png"
]

var monedas = 0;

init();

function init() {
  actualizarMonedas();
  actualizarPalanca();
  actualizarResultados();
}

function actualizarMonedas() {
  monedasDiv.innerText = monedas
}

function actualizarPalanca(status="Up") {
  if (status == "Up") {
    palanca.src = palancaArriba
  } else {
    palanca.src = palancaAbajo
  }
}

function actualizarResultados (tirada=false, resultados) {
  if (tirada) {
    revolverTirada(resultados);
    resultadoUno.src = imagenes[resultados[0]];
    resultadoDos.src = imagenes[resultados[1]];
    resultadoTres.src = imagenes[resultados[2]];
  } else {
    resultadoUno.src = imagenDefault;
    resultadoDos.src = imagenDefault;
    resultadoTres.src = imagenDefault;
  }
}

function revolverTirada(resultados) {
  const numeroImagenes = imagenes.length -1;
  for (let i = 0; i < numeroImagenes * 2; i++) {
    resultadoUno.src = imagenes[i];
    resultadoDos.src = imagenes[i + 1];
    resultadoTres.src = imagenes[i + 2];
  }
}

function tirar() {
  const maximo = imagenes.length - 1;
  const minimo = 0;
  const numeroRandomUno = Math.floor(Math.random() * (maximo - minimo + 1) + minimo);
  const numeroRandomDos = Math.floor(Math.random() * (maximo - minimo + 1) + minimo);
  const numeroRandomTres = Math.floor(Math.random() * (maximo - minimo + 1) + minimo);
  const resultados = [numeroRandomUno, numeroRandomDos, numeroRandomTres];
  actualizarResultados(true, resultados);
}

const tirada = palanca.addEventListener("mouseup", function() {
  actualizarPalanca();
  if (monedas > 0) {
    tirar();
  } else {
    alert("Por favor, introduce monedas.");
  }
})

palanca.addEventListener("mousedown", function() {
  actualizarPalanca("Down");
  tirada;
});

formulario.addEventListener('submit', function(event) {
  event.preventDefault();
  var input = inputFormulario.value;
  monedas = input;
  actualizarMonedas();
  inputFormulario.value = "";
});
