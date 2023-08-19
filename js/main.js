let ulNav = document.querySelector(".ul-nav");
let botonPlus = document.querySelector(".boton-plus");
let form = document.querySelector("form");
let inputTarea = document.querySelector(".titulo-tarea");
let botonIcono = document.querySelector(".boton-icono");
let contenedorIcono = document.querySelector(".contenedor-icono");
let contenedorDropdown = document.querySelector(".contenedor-dropdown");
let botonAgregar = document.querySelector(".boton-agregar");
let noHayTarea = document.querySelector(".h1");
let listaIndex = document.querySelector(".lista-index");

let iconoSeleccionado = null;

//FUNCIONES

//funcion evento para mostrar
function mostrar(boton, contenedor) {
  boton.addEventListener("click", () => {
    contenedor.classList.toggle("d-flex");
  });
}
mostrar(botonIcono, contenedorIcono);
mostrar(botonPlus, form);
mostrar(botonPlus, listaIndex);

//funcion para el boton que muestra el form y transforma el boton
function botonTransform(contenedor) {
  botonPlus.addEventListener("click", () => {
    const parametro = getComputedStyle(contenedor);
    if (parametro.justifyContent == "flex-end") {
      contenedor.style.justifyContent = "flex-start";
    } else {
      contenedor.style.justifyContent = "flex-end";
    }

    if (botonPlus.textContent == "+") {
      botonPlus.textContent = "<";
    } else {
      botonPlus.textContent = "+";
    }
  });
}
botonTransform(ulNav);

//funcion evento para guardar la imagen en una variable
let seleccionIcono = () => {
  let iconos = contenedorIcono.querySelectorAll("img");

  iconos.forEach((icono) => {
    icono.addEventListener("click", () => {

      iconos.forEach((icono) => {
        icono.style.backgroundColor = 'transparent';
      });
      
      iconoSeleccionado = icono.src;
      icono.style.backgroundColor = 'var(--verde)';
    });
  });
};
seleccionIcono();

//funcion que genera la tarea
function tarea() {
  let li = document.createElement("li");
  let div = document.createElement("div");
  div.classList.add("tarea");
  let img = document.createElement("img");
  img.src = iconoSeleccionado;
  let div2 = document.createElement("div");
  let h1 = document.createElement("h1");
  h1.textContent = inputTarea.value;
  let p = document.createElement("p");
  p.textContent = "La tarea debe realizarse en : ";
  listaIndex.appendChild(li);
  li.appendChild(div);
  div.appendChild(img);
  div.appendChild(div2);
  div2.appendChild(h1);
  div2.appendChild(p);
}

let agregarTarea = () => {
  botonAgregar.addEventListener("click", (e) => {
    e.preventDefault();
    tarea();
    inputTarea.value = "";
  });
};

//EVENTOS
