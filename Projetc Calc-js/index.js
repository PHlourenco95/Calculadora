//acesso aos elemtentos
const main = document.querySelector("main");
const root = document.querySelector(":root");
const input = document.getElementById("input");
const resultInput = document.getElementById("result");

//Codigo para impedir que o usuario digite qualquer coisa...( somente digitar os botoes que esta na calculadora)

const allowedKeys = [
  "(",
  ")",
  "/",
  "*",
  "-",
  "+",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "1",
  "0",
  ".",
  "%",
  " ",
];
// apertar os botoes a seguir

document.querySelectorAll(".charKey").forEach(function (charKeyBtn) {
  charKeyBtn.addEventListener("click", function () {
    const value = charKeyBtn.dataset.value; //atribultos data
    input.value += value; //associar o valor do botao ao input
  });
});

// botao clear

document.getElementById("clear").addEventListener("click", function () {
  input.value = "";
  input.focus(); // o modo focos vai focar no input, ele vai colocar o cursor no input(quando o usuario clicar para digitar, ja vai estar como estivesse selecionado)
});

input.addEventListener("keydown", function (ev) {
  ev.preventDefault();
  if (allowedKeys.includes(ev.key)) {
    input.value += ev.key;
    return;
  }
  if (ev.key === "Backspace") {
    input.value = input.value.slice(0, -1);
  }
  if (ev.key === "Enter") {
    calculate();
  }
});

// resultado botao ( = ) calcular os valores

document.getElementById("equal").addEventListener("click", calculate);

function calculate() {
  resultInput.value = "ERROR";
  resultInput.classList.add("error");
  const result = eval(input.value); //essa e uma function perigosa pq o usuario consegue executar qualquer coisa no eval( incluido codigo js malisioso)
  resultInput.value = result;
  resultInput.classList.remove("error"); //Remover a cor
  //limpar o input
}

//Botao de Copy

document
  .getElementById("copyToClipboard")
  .addEventListener("click", function (ev) {
    // o parametro evento vai servir para selecionar o proprio botao
    const button = ev.currentTarget;
    if (button.innerText === "Copy") {
      button.innerText = "Copied!";
      button.classList.add("success"); // adcionar uma class de css, para pintar de verde
      //copiar o valor do input para a area de transferencia
      navigator.clipboard.writeText(resultInput.value);
    } else {
      // voltar para o padrao que estava ( Copy )
      button.innerText = "Copy";
      button.classList.remove("success"); //remover a cor
    }
  });

// Elemento do botao de troca de tema

document.getElementById("themeSwitcher").addEventListener("click", function () {
  //essa funçao vai ser resopndavel, por trocar o tema da aplicaçao a partir das variaveis do CSS
  if (main.dataset.theme === "dark") {
    root.style.setProperty("--bg-color", "#f1f5f9");
    root.style.setProperty("--border-color", "#aaa");
    root.style.setProperty("--font-color", "#212529");
    root.style.setProperty("--primary-color", "#26834a");
    main.dataset.theme = "light";
  } else {
    root.style.setProperty("--bg-color", "#212529");
    root.style.setProperty("--border-color", "#666");
    root.style.setProperty("--font-color", "#f1f5f9");
    root.style.setProperty("--primary-color", "#4dff91");
    main.dataset.theme = "dark";
  }
});
