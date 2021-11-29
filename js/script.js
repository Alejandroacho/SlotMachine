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

function actualizarResultados (tirada=false) {
  if (tirada) {
    console.log("Tirada")
  } else {
    resultadoUno.src = imagenDefault;
    resultadoDos.src = imagenDefault;
    resultadoTres.src = imagenDefault;
  }
}

// TODO el mouseup se ejecuta multiples veces por que toca matar el listener
palanca.addEventListener("mousedown", function() {
  if (monedas > 0) {
    actualizarPalanca("Down")
    palanca.addEventListener("mouseup", function() {
      actualizarPalanca();
      const maximo = imagenes.length - 1;
      const minimo = 0;
      const numeroRandom = Math.floor(Math.random() * (maximo - minimo + 1) + minimo);
      console.log(numeroRandom)
    })
  } else {
    alert("Por favor, introduce monedas.");
  }
});

formulario.addEventListener('submit', function(event) {
  event.preventDefault();
  var input = inputFormulario.value;
  monedas = input;
  actualizarMonedas()
  inputFormulario.value = "";
});
