const pizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];
// variables de los elemetes HTML
const numberPizza = document.getElementById("input_number");
const btnSubmit = document.getElementById("form_pizza");
const displayCard = document.getElementById("card");
const showAlertas = document.getElementById("alertas");

//JSON - ARRAY
let pizzaUser = JSON.parse(localStorage.getItem("pizzaUser")) || [];

//Funcion SAVE LStorage
const saveLocalStorage = (laPizza) => {
  localStorage.setItem("pizzaUser", JSON.stringify(laPizza));
};
//funcion LOAD pizza del LStorage
const pizzaLoad = () => {
  generadorCard(pizzaUser);
};

// funciones AUXILIARES
const estaVacio = (input) => {
  return !input.value.trim().length;
};
const numeroNegativo = (input) => {
  return Number(input.value) < 0 ? true : false;
};
const numeroCero = (input) => {
  return Number(input.value) === 0 ? true : false;
};

const mayorNumPizzas = (input) => {
  return input.value > pizzas.length ? true : false;
};
const alertas = (mensaje) => {
  showAlertas.style.color = "crimson";
  return (showAlertas.textContent = mensaje);
};
const alertasOk = (mensaje) => {
  showAlertas.style.color = "green";
  return (showAlertas.textContent = mensaje);
};
// funciones de validacion de INPUT NUMBER
const checkNumber = (input) => {
  let isValid = false;
  if (estaVacio(input)) {
    alertas("Ingrese un numero por favor.");
    return;
  }
  if (numeroNegativo(input)) {
    alertas("El numero debe ser positivo");
    return;
  }
  if (numeroCero(input)) {
    alertas("El numero no puede ser 0");
    return;
  }
  if (mayorNumPizzas(input)) {
    alertas(`El numero no puede ser mayor a ${pizzas.length}`);
    return;
  }
  const idPizza = Number(input.value) - 1;
  alertasOk(`${pizzas[idPizza].nombre}`);
  isValid = true;
  return isValid;
};
//funcion BUSCAR PIZZA
const findPizza = (pizzas) => {
  const id = Number(numberPizza.value);
  return pizzas.find((pizza) => pizza.id === id);
};
//funcion GENERADOR HTML - CARD
const generadorCard = (pizza) => {
  displayCard.innerHTML = ` <h3>${pizza.nombre}</h3> <img src="${
    pizza.imagen
  }" alt=""> <span>Su valor es: $${
    pizza.precio
  }</span>Los ingredientes son: <span></span>
  <p>${pizza.ingredientes.join(" ")}</p>`;
};
// renderizar FORM
const seletcPizza = (e) => {
  e.preventDefault();
  let numberValit = checkNumber(numberPizza);
  if (numberValit) {
    const arryPizza = findPizza(pizzas);
    generadorCard(arryPizza);
    saveLocalStorage(arryPizza);
    btnSubmit.reset();
    alertas("");
  }
};
// funcion INIT
const init = () => {
  numberPizza.addEventListener("input", () => checkNumber(numberPizza));
  btnSubmit.addEventListener("submit", seletcPizza);
  document.addEventListener("DOMContentLoaded", pizzaLoad);
};
init();
