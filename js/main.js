//INGRESO TAREAS

let inputTarea = document.querySelector('.titulo-tarea');
let botonIcono = document.querySelector ('.boton-icono');
let contenedorIcono = document.querySelector ('.contenedor-icono');
let botonTiempo = document.querySelector ('.boton-tiempo');
let contenedorDropdown = document.querySelector ('.contenedor-dropdown');
let botonAgregar = document.querySelector ('.boton-agregar');
let iconoSeleccionado = null;


//FUNCIONES

//funcion evento para mostrar/ocultar
function accionBotonIcono(boton, contenedor) {
    //utilizando el primer parametro
    boton.addEventListener('click', () => {
        //utilizando el segundo parametro
        //getComputedStyle para seleccionar un atributo existente
        const parametro = getComputedStyle(contenedor);
        if (parametro.display == 'none') {
        contenedor.style.display = 'flex';
        } else {
            contenedor.style.display = 'none';
        }
    });
}
accionBotonIcono(botonIcono, contenedorIcono);
accionBotonIcono(botonTiempo, contenedorDropdown);

//funcion evento para guardar la imagen en una variable
let seleccionIcono = () => {
    let iconos = contenedorIcono.querySelectorAll('img');

    iconos.forEach(icono => {
        icono.addEventListener("click", () => {
            iconoSeleccionado = icono;
            console.log(iconoSeleccionado);
        });
    });
};
seleccionIcono();





