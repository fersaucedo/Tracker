// recuperar el array de tareas del localStorage al cargar la página
window.addEventListener('load', () => {
  let tareaGuardada = localStorage.getItem('tareas');
  if (tareaGuardada) {
    arrayTareas = JSON.parse(tareaGuardada);
  }
});

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
let tiempoSeleccionado = null;
let arrayTareas = [];

//TIEMPO

function calcularTiempoFaltante() {
  let tiempoActual = Date.now();
  let seleccion = parseInt(tiempoSeleccionado);

  tiempoFaltante = seleccion - (tiempoActual % seleccion);

}

// Agregar evento de cambio al elemento select
contenedorDropdown.addEventListener("change", function (e) {
  tiempoSeleccionado = e.target.value;
  let tiempoFaltante = calcularTiempoFaltante();
});

//FUNCIONES

//funcion reset
function reset() {
  inputTarea.value = "";
  ulNav.style.justifyContent = "flex-end";
  botonPlus.textContent = "+";
  contenedorIcono.classList.toggle("d-none");
  listaIndex.classList.remove("d-none");
}

//funcion evento para mostrar
function mostrar(boton, contenedor) {
  boton.addEventListener("click", () => {
    contenedor.classList.toggle("d-none");
  });
}
mostrar(botonIcono, contenedorIcono);
mostrar(botonPlus, form);
mostrar(botonPlus, listaIndex);
mostrar(botonAgregar, form);

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
      iconoSeleccionado = icono.src;
      icono.style.backgroundColor = "var(--verde)";
    });
  });
};
seleccionIcono();

//funcion que genera la tarea
function tarea(tiempoFaltante) {
  let segundos = Math.floor((tiempoFaltante / 1000) % 60);
  let minutos = Math.floor((tiempoFaltante / (1000 * 60)) % 60);
  let horas = Math.floor((tiempoFaltante / (1000 * 60 * 60)) % 24);
  let dias = Math.floor(tiempoFaltante / (1000 * 60 * 60 * 24));

  let li = document.createElement("li");
  let div = document.createElement("div");
  div.classList.add("tarea");
  let img = document.createElement("img");
  img.src = iconoSeleccionado;
  let div2 = document.createElement("div");
  let h1 = document.createElement("h1");
  h1.textContent = inputTarea.value;
  let p = document.createElement("p");
  p.textContent = `La tarea debe realizarse en : ${dias} días, ${horas} horas, ${minutos} minutos y ${segundos} segundos`;
  listaIndex.appendChild(li);
  li.appendChild(div);
  div.appendChild(img);
  div.appendChild(div2);
  div2.appendChild(h1);
  div2.appendChild(p);

  // objeto a guardar
  let objetoTareas = {
    titulo: inputTarea.value,
    icono: iconoSeleccionado,
    tiempoFaltante: {
      dias: Math.floor(tiempoFaltante / (1000 * 60 * 60 * 24)),
      horas: Math.floor(tiempoFaltante / (1000 * 60 * 60)) % 24,
      minutos: Math.floor(tiempoFaltante / (1000 * 60)) % 60,
      segundos: Math.floor(tiempoFaltante / 1000) % 60
    }
  };

  arrayTareas.push(objetoTareas);

  //local storage
  localStorage.setItem('tareas', JSON.stringify(arrayTareas));
}

let agregarTarea = () => {
  botonAgregar.addEventListener("click", (e) => {
    e.preventDefault();
    if (tiempoSeleccionado !== null || iconoSeleccionado !== null) {
      tarea(tiempoFaltante);
      reset();
      let h1 = document.querySelector("h1");
      h1.classList.add("d-none");
    } else {
      alert("Por favor, selecciona una opción.");
    }
  });
};

agregarTarea();
