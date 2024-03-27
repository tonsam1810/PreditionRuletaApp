let lastFirst12 = 0;
let lastSecond12 = 0;
let lastThird12 = 0;
let totalPlays = 0;

let first12Count = 0;
let second12Count = 0;
let third12Count = 0;

let lastPosition = null;
let streakCount = 0;

function addNumber() {
    const numberInput = document.getElementById('number');
    const number = parseInt(numberInput.value);

    if (isNaN(number) || number < 1 || number > 36) {
        alert("Por favor ingrese un número válido entre 1 y 36.");
        return;
    }

    let position;
    if ([3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36].includes(number)) {
        position = "1st 12";
        lastFirst12 = totalPlays;
        first12Count++;
    } else if ([2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35].includes(number)) {
        position = "2nd 12";
        lastSecond12 = totalPlays;
        second12Count++;
    } else {
        position = "3rd 12";
        lastThird12 = totalPlays;
        third12Count++;
    }

    if (position === lastPosition) {
        streakCount++;
    } else {
        streakCount = 1;
        lastPosition = position;
    }

    totalPlays++;
    updateNumbersList(number, position);
    updateLastChosen();
    updateProbability();
    numberInput.value = "";
}

function updateLastChosen() {
    document.getElementById('firstCount').textContent = first12Count + " veces";
    document.getElementById('secondCount').textContent = second12Count + " veces";
    document.getElementById('thirdCount').textContent = third12Count + " veces";
    
    document.getElementById('firstStreak').textContent = (lastPosition === "1st 12" ? streakCount : 0) + " veces";
    document.getElementById('secondStreak').textContent = (lastPosition === "2nd 12" ? streakCount : 0) + " veces";
    document.getElementById('thirdStreak').textContent = (lastPosition === "3rd 12" ? streakCount : 0) + " veces";

    document.getElementById('firstLastChoice').textContent = (totalPlays - lastFirst12) + " jugadas";
    document.getElementById('secondLastChoice').textContent = (totalPlays - lastSecond12) + " jugadas";
    document.getElementById('thirdLastChoice').textContent = (totalPlays - lastThird12) + " jugadas";
}

function updateProbability() {
    const firstProbability = (first12Count / totalPlays) * 100;
    const secondProbability = (second12Count / totalPlays) * 100;
    const thirdProbability = (third12Count / totalPlays) * 100;

    document.getElementById('firstProbability').textContent = firstProbability.toFixed(2) + "%";
    document.getElementById('secondProbability').textContent = secondProbability.toFixed(2) + "%";
    document.getElementById('thirdProbability').textContent = thirdProbability.toFixed(2) + "%";
}

function updateNumbersList(number) {
    const numbersList = document.getElementById('numbersList');
    const numberBox = document.createElement('div');
    numberBox.textContent = number;

    // Define los números rojos y negros
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    const blackNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

    // Aplica el color de fondo correspondiente
    if (redNumbers.includes(number)) {
        numberBox.style.backgroundColor = 'red';
    } else if (blackNumbers.includes(number)) {
        numberBox.style.backgroundColor = 'black';
        numberBox.style.color = 'white'; // Cambia el color del texto a blanco para los números negros
    }

    // Aplica estilos adicionales al cuadro del número
    numberBox.style.width = '50px';
    numberBox.style.height = '50px';
    numberBox.style.lineHeight = '50px'; // Centra verticalmente el texto
    numberBox.style.textAlign = 'center'; // Centra horizontalmente el texto
    numberBox.style.margin = '5px';
    numberBox.style.display = 'inline-block'; // Permite que los cuadros se alineen horizontalmente

    numbersList.appendChild(numberBox);
}
