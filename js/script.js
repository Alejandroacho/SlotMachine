var listaImagenes = ["aubergine", "banana", "carrots", "cherries", "dollar", "lemon", "orange", "peach", "potato", "tomato"];

// Elementos del DOM
const monedasDiv = document.getElementById("monedas")
const palanca = document.getElementById("palanca")
const historial = document.getElementById("historialMovimientos");
const movimientos = document.getElementById("movimientos");

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
// const imagenes = [
//   "../img/dollar.png",
//   "../img/aubergine.png",
//   "../img/banana.png",
//   "../img/carrots.png",
//   "../img/cherries.png",
//   "../img/lemon.png",
//   "../img/orange.png",
//   "../img/peach.png",
//   "../img/potato.png",
//   "../img/tomato.png"
// ]

// Posicion de la imagen dollar en el array de imagenes
const posicionDeDollar = 4;

var monedas = 0;

init();

function init() {
  actualizarMonedas();
  actualizarPalanca();
  actualizarResultados();
  actualizarMovimientos();
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

function actualizarMovimientos(tirada=false, descripcion) {
  if (tirada) {
    console.log("tirada");
  } else {
    historialMovimientos.hidden = true;
  }
}

function actualizarResultados (tirada=false, resultados) {
  if (tirada) {
    resultadoUno.src = "../img/" + listaImagenes[resultados[0]] + ".png";
    resultadoDos.src = "../img/" + listaImagenes[resultados[1]] + ".png";
    resultadoTres.src = "../img/" + listaImagenes[resultados[2]] + ".png";
    calcularGanancia(resultados);
  } else {
    resultadoUno.src = imagenDefault;
    resultadoDos.src = imagenDefault;
    resultadoTres.src = imagenDefault;
  }
}

function tirar() {
  monedas--;
  actualizarMonedas();
  const numeroRandomUno = numeroRandom();
  const numeroRandomDos = numeroRandom();
  const numeroRandomTres = numeroRandom();
  const resultados = [numeroRandomUno, numeroRandomDos, numeroRandomTres];
  actualizarResultados(true, resultados);
}

function numeroRandom(){
  const maximo = listaImagenes.length - 1;
  const minimo = 0;
  const numeroRandom = Math.floor(Math.random() * (maximo - minimo + 1) + minimo);
  return numeroRandom;
}

function calcularGanancia(resultados){
  const resultadoUno = resultados[0];
  const resultadoDos = resultados[1];
  const resultadoTres = resultados[2];
  const repeticiones = obtenerRepeticiones(resultadoUno, resultadoDos, resultadoTres);
  const iguales = repeticiones[0];
  const triple = repeticiones[1];
  const dolares = obtenerDolares(resultadoUno, resultadoDos, resultadoTres);
  const ganancia = obtenerGanancias(iguales, triple, dolares);
  console.log(monedas);
  monedas = monedas + ganancia;
  console.log(ganancia);
  actualizarMonedas();
  return ganancia;
}

function obtenerRepeticiones(resultadoUno, resultadoDos, resultadoTres){
  var iguales = false;
  var triple = false;
  if (resultadoUno == resultadoDos) {
    iguales = true;
    if (resultadoUno == resultadoTres) {
      triple = true;
    }
  }
  if (resultadoUno == resultadoTres) {
    iguales = true;
  }
  if (resultadoDos == resultadoTres) {
    iguales = true;
  }
  return [iguales, triple];
}

function obtenerDolares(resultadoUno, resultadoDos, resultadoTres){
  var dolares = 0;
  if(resultadoUno == posicionDeDollar){
    dolares++;
  }
  if(resultadoDos == posicionDeDollar){
    dolares++;
  }
  if(resultadoTres == posicionDeDollar){
    dolares++;
  }
  return dolares;
}

function obtenerGanancias(dolares, iguales, triple){
  var ganancia = 0;
  if (dolares == 1){
    ganancia = 1;
  } else if (dolares == 2) {
    ganancia = 4;
  } else if (dolares == 3) {
    ganancia = 10;
  }
  if (iguales) {
    ganancia = ganancia + 2;
  }
  if (triple && dolares == 0) {
    ganancia = 3;
  }
  return ganancia;
}

function registrarMovimiento(concepto){
  historialMovimientos.hidden = false;
  const movimiento = document.createElement("li");
  movimiento.innerText = concepto;
  movimientos.appendChild(movimiento);
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
  botonIntroducir.disabled = true;
  registrarMovimiento("Has introducido monedas.")
});
