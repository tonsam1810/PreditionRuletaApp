// Inicializamos las variables que vamos a usar
let lastFirst12 = 0; // Última vez que se eligió el primer grupo de 12 números
let lastSecond12 = 0; // Última vez que se eligió el segundo grupo de 12 números
let lastThird12 = 0; // Última vez que se eligió el tercer grupo de 12 números
let totalPlays = 0; // Total de jugadas realizadas

let first12Count = 0; // Cantidad de veces que se eligió el primer grupo de 12 números
let second12Count = 0; // Cantidad de veces que se eligió el segundo grupo de 12 números
let third12Count = 0; // Cantidad de veces que se eligió el tercer grupo de 12 números

let lastPosition = null; // Última posición elegida
let streakCount = 0; // Cantidad de veces consecutivas que se ha elegido la misma posición

// Función que se ejecuta cuando se añade un número
function addNumber() {
    const numberInput = document.getElementById('number'); // Obtenemos el input del número
    const number = parseInt(numberInput.value); // Convertimos el valor del input a número

    // Comprobamos que el número sea válido
    if (isNaN(number) || number < 1 || number > 36) {
        alert("Por favor ingrese un número válido entre 1 y 36."); // Si no es válido, mostramos un mensaje de error
        return; // Y salimos de la función
    }
    //3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36
    let position; // Variable para guardar la posición del número
    // Comprobamos a qué grupo de 12 números pertenece el número
    if ([3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36].includes(number)) {
        position = "1st 12"; // Si pertenece al primer grupo, guardamos esa posición
        lastFirst12 = totalPlays; // Y actualizamos la última vez que se eligió ese grupo
        first12Count++; // Y aumentamos el contador de veces que se ha elegido ese grupo
    } else if ([2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35].includes(number)) {
        position = "2nd 12"; // Hacemos lo mismo para el segundo grupo
        lastSecond12 = totalPlays;
        second12Count++;
    } else {
        position = "3rd 12"; // Y para el tercer grupo
        lastThird12 = totalPlays;
        third12Count++;
    }

    // Comprobamos si la posición es la misma que la última vez
    if (position === lastPosition) {
        streakCount++; // Si es la misma, aumentamos el contador de veces consecutivas
    } else {
        streakCount = 1; // Si no es la misma, reiniciamos el contador
        lastPosition = position; // Y actualizamos la última posición
    }

    totalPlays++; // Aumentamos el total de jugadas
    // Actualizamos la lista de números, la última elección y la probabilidad
    updateNumbersList(number, position);
    updateLastChosen();
    updateProbability();
    numberInput.value = ""; // Limpiamos el input del número
}

// Función para actualizar la última elección
function updateLastChosen() {
    // Actualizamos los contadores de veces que se ha elegido cada grupo
    document.getElementById('firstCount').textContent = first12Count + " veces";
    document.getElementById('secondCount').textContent = second12Count + " veces";
    document.getElementById('thirdCount').textContent = third12Count + " veces";
    
    // Actualizamos las rachas de veces consecutivas que se ha elegido cada grupo
    document.getElementById('firstStreak').textContent = (lastPosition === "1st 12" ? streakCount : 0) + " veces";
    document.getElementById('secondStreak').textContent = (lastPosition === "2nd 12" ? streakCount : 0) + " veces";
    document.getElementById('thirdStreak').textContent = (lastPosition === "3rd 12" ? streakCount : 0) + " veces";

   // Actualizamos las jugadas desde la última vez que se eligió cada grupo
let firstLastChoice = totalPlays - lastFirst12;
document.getElementById('firstLastChoice').textContent = firstLastChoice + " jugadas";
if (firstLastChoice >= 6) {
    document.getElementById('firstLastChoice').parentNode.style.backgroundColor = 'yellow';
    document.getElementById('firstLastChoice').parentNode.style.color = 'red';
} else {
    document.getElementById('firstLastChoice').parentNode.style.backgroundColor = '';
    document.getElementById('firstLastChoice').parentNode.style.color = '';
}

let secondLastChoice = totalPlays - lastSecond12;
document.getElementById('secondLastChoice').textContent = secondLastChoice + " jugadas";
if (secondLastChoice >= 6) {
    document.getElementById('secondLastChoice').parentNode.style.backgroundColor = 'yellow';
    document.getElementById('secondLastChoice').parentNode.style.color = 'red';
} else {
    document.getElementById('secondLastChoice').parentNode.style.backgroundColor = '';
    document.getElementById('secondLastChoice').parentNode.style.color = '';
}

let thirdLastChoice = totalPlays - lastThird12;
document.getElementById('thirdLastChoice').textContent = thirdLastChoice + " jugadas";
if (thirdLastChoice >= 6) {
    document.getElementById('thirdLastChoice').parentNode.style.backgroundColor = 'yellow';
    document.getElementById('thirdLastChoice').parentNode.style.color = 'red';
} else {
    document.getElementById('thirdLastChoice').parentNode.style.backgroundColor = '';
    document.getElementById('thirdLastChoice').parentNode.style.color = '';
}
}

// Función para actualizar la probabilidad de cada grupo
function updateProbability() {
    // Calculamos la probabilidad de cada grupo
    const firstProbability = (first12Count / totalPlays) * 100;
    const secondProbability = (second12Count / totalPlays) * 100;
    const thirdProbability = (third12Count / totalPlays) * 100;

    // Actualizamos la probabilidad de cada grupo
    document.getElementById('firstProbability').textContent = firstProbability.toFixed(2) + "%";
    document.getElementById('secondProbability').textContent = secondProbability.toFixed(2) + "%";
    document.getElementById('thirdProbability').textContent = thirdProbability.toFixed(2) + "%";
}

// Función para actualizar la lista de números
function updateNumbersList(number) {
    const numbersList = document.getElementById('numbersList'); // Obtenemos la lista de números
    const numberBox = document.createElement('div'); // Creamos un nuevo div para el número
    numberBox.textContent = number; // Le asignamos el número como contenido

    // Definimos los números rojos y negros
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    const blackNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

    // Aplicamos el color de fondo correspondiente
    if (redNumbers.includes(number)) {
        numberBox.style.backgroundColor = 'red';
    } else if (blackNumbers.includes(number)) {
        numberBox.style.backgroundColor = 'black';
        numberBox.style.color = 'white'; // Cambiamos el color del texto a blanco para los números negros
    }

    // Aplicamos estilos adicionales al cuadro del número
    numberBox.style.width = '50px';
    numberBox.style.height = '50px';
    numberBox.style.lineHeight = '50px'; // Centramos verticalmente el texto
    numberBox.style.textAlign = 'center'; // Centramos horizontalmente el texto
    numberBox.style.margin = '5px';
    numberBox.style.display = 'inline-block'; // Permitimos que los cuadros se alineen horizontalmente

    numbersList.appendChild(numberBox); // Añadimos el cuadro del número a la lista
}