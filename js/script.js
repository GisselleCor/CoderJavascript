/* comentario de 
    dos líneas*/

//Este es un comentario de una sola línea

// Declarar una variable
//let nombre; 

//Asignar valor a la variable 
//nombre = "Gisselle";

//Declarar y asignar
//let apellido = "Cordova";

//Reasignando el valor de una variable
//apellido = "Diaz";

//const anioNacimiento = 1991;

//string - se utiliza en formato de texto
//number - el valor es un número, con este formato se pueden hacer operaciones + - / 

//let numero1= 5;
//let numero2=10;
//let resultado= 10 -5

//console.log(resultado);

//let nombre1 = "Gisselle";
//let nombre2 = "Coder";

//let nombreCompleto = nombre1 + nombre2;
//console.log(nombreCompleto);

// Actividad en clase

//Act 1
// let nombreIngresado = prompt("Ingrese su nombre");
// alert("Hola, " + nombreIngresado + ". ¡Bienvenido!");
// console.log("Hola, " + nombreIngresado + ". ¡Bienvenido!");

//ACT 2 
// let numeroInterno = 5;
// let numeroIngresado = parseInt(promt("Ingrese un número"));

// Palabra secreta para adivinar
const palabraSecreta = "vital";
let intentos = 3; // Número máximo de intentos permitidos

// Función para verificar la palabra ingresada por el usuario
function verificarPalabra() {
    const inputPalabra = document.getElementById("input-palabra").value.toLowerCase();
    const mensaje = document.getElementById("mensaje");

    if (intentos > 0) {
        if (inputPalabra === palabraSecreta) {
            mensaje.textContent = `¡Felicidades! Adivinaste la palabra secreta "${palabraSecreta}".`;
        } else {
            mensaje.textContent = "¡Incorrecto! Intenta de nuevo.";
            intentos--;
            if (intentos === 0) {
                mensaje.textContent = `¡Lo siento! Se acabaron los intentos. La palabra secreta era "${palabraSecreta}".`;
            }
        }
    } else {
        mensaje.textContent = `¡Lo siento! Se acabaron los intentos. La palabra secreta era "${palabraSecreta}".`;
    }
}

// Función para terminar el juego
function terminarJuego() {
    document.getElementById("mensaje").textContent = "¡Hasta luego!";
}
