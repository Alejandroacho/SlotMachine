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
const botonSalir = document.getElementById("botonSalir");

// Elementos del DOM donde iran los resultados
const resultadoUno = document.getElementById("resultadoUno")
const resultadoDos = document.getElementById("resultadoDos")
const resultadoTres = document.getElementById("resultadoTres")

// Rutas de imagenes por default
const palancaArriba = "../img/palancaUP.png"
const palancaAbajo = "../img/palancaDOWN.png"
const imagenDefault = "../img/pingu.png"

// Posicion de la imagen dollar en el array de imagenes
const posicionDeDollar = 4;

var monedas = 0;

init();

function init() {
  actualizarMonedas();
  actualizarPalanca();
  actualizarResultados();
  historialMovimientos.hidden = true;
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
    resultadoUno.src = "../img/" + listaImagenes[resultados[0]] + ".png";
    resultadoDos.src = "../img/" + listaImagenes[resultados[1]] + ".png";
    resultadoTres.src = "../img/" + listaImagenes[resultados[2]] + ".png";
    calcularGanancia(resultados[0], resultados[1], resultados[2]);
  } else {
    resultadoUno.src = imagenDefault;
    resultadoDos.src = imagenDefault;
    resultadoTres.src = imagenDefault;
  }
}

function tirar() {
  monedas--;
  actualizarMonedas();
  registrarMovimiento("Gastas una moneda.");
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

function calcularGanancia(resultadoUno, resultadoDos, resultadoTres){
  const repeticiones = obtenerRepeticiones(resultadoUno, resultadoDos, resultadoTres);
  const doble = repeticiones[0];
  const triple = repeticiones[1];
  const dolares = obtenerNumeroDeDolares(resultadoUno, resultadoDos, resultadoTres);
  const ganancia = obtenerGanancias(dolares, doble, triple);
  registrarMensaje(dolares, doble, triple);
  monedas = monedas + ganancia;
  actualizarMonedas();
  return ganancia;
}

function obtenerRepeticiones(resultadoUno, resultadoDos, resultadoTres){
  var doble = false;
  var triple = false;
  if (resultadoUno == resultadoDos && resultadoUno == resultadoTres) {
    triple = true;
  } else if (resultadoUno == resultadoTres ||
             resultadoDos == resultadoTres ||
             resultadoUno == resultadoDos) {
    doble = true;
  }
  return [doble, triple];
}

function obtenerNumeroDeDolares(resultadoUno, resultadoDos, resultadoTres){
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

function obtenerGanancias(dolares, doble, triple){
  var ganancia = 0;
  ganancia = ganancia + obtenerGananciasConDolares(dolares);
  ganancia = ganancia + obtenerGananciasConRepeticiones(dolares, doble, triple);
  return ganancia;
}

function obtenerGananciasConDolares(dolares){
  var ganancia = 0;
  if (dolares == 1){
    ganancia = 1;
  } else if (dolares == 2) {
    ganancia = 4;
  } else if (dolares == 3) {
    ganancia = 10;
  }
  return ganancia;
}

function obtenerGananciasConRepeticiones(dolares, doble, triple){
  var ganancia = 0;
  if (doble && dolares < 2) {
    ganancia = ganancia + 2;
  }
  if (triple && dolares == 0) {
    ganancia = 5;
  }
  return ganancia;
}

function registrarMensaje(dolares, doble, triple){
  const mensaje = obtenerMensaje(dolares, doble, triple);
  if (mensaje != "") {
    registrarMovimiento(mensaje);
  }
}

function obtenerMensaje(dolares, doble, triple){
  var mensaje = "";
  mensaje = obtenerMensajePorDolares(dolares);
  mensaje = obtenerMensajePorRepeticionesYDolares(mensaje, dolares, doble, triple);
  return mensaje;
}

function obtenerMensajePorDolares(dolares){
  if (dolares == 1){
    return "¡Una MONEDA! Ganas 1 monedas.";
  }
  if (dolares == 2){
    return "¡Dos MONEDAS! Ganas 4 monedas.";
  }
  if (dolares == 3){
    return "¡Tres MONEDAS! Ganas 10 monedas.";
  }
  return "";
}

function obtenerMensajePorRepeticionesYDolares(mensaje, dolares, doble, triple){
  if (doble && dolares == 0) {
    return "¡Dos IGUALES! Ganas 2 monedas.";
  } else if (doble && dolares == 1) {
    return "¡Dos IGUALES y una MONEDA! Ganas 3 monedas.";
  } else if (triple && dolares == 0) {
    return "¡TRIPLE! Ganas 5 monedas.";
  }
  return mensaje;
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
  inputFormulario.disabled = true;
  registrarMovimiento("Has introducido monedas.")
});

botonSalir.addEventListener('click', function(event) {
  inputFormulario.value = monedas;
  monedas = 0;
  actualizarMonedas();
  botonIntroducir.disabled = false;
  inputFormulario.disabled = false;
  registrarMovimiento("Sacas todas las monedas.")
});