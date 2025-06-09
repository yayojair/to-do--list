/**
 * Autor: Edgar Jair  Martinez Ruiz
 * Proyecto: Lista de tareas
 * Descripción: crear y  almacenar listas de tareas.
 */

// Identificador único para cada tarea
let id_tareas = 0;

// Arreglo para almacenar las tareas
let arr_tareas = [];

/**
 * Recupera las tareas almacenadas en localStorage y las muestra en pantalla
 */
function desplegarStorage() {
    arr_tareas = JSON.parse(localStorage.getItem("tareas") || "[]");
    for (let i = 0; i < arr_tareas.length; i++) {
        crear_tarea(arr_tareas[i]);
    }
}

/**
 * Guarda el arreglo de tareas actual en localStorage
 */
function guardaStorage() {
    localStorage.setItem("tareas", JSON.stringify(arr_tareas));
}

/**
 * Crea una nueva tarea y la agrega al DOM y al almacenamiento si es nueva
 * @param {string} paramtarea - Texto de la tarea (puede venir de localStorage)
 */
function crear_tarea(paramtarea = "") {
    let tarea = "";
    let nueva = false;

    if (paramtarea !== "") {
        tarea = paramtarea;
    } else {
        nueva = true;
        const inputTarea = document.getElementById("tarea");
        tarea = inputTarea.value.trim();
        inputTarea.style.height = "100px";

        // Validación: no permitir tareas vacías
        if (tarea === "") {
            alert("¡El input está vacío! Escribe algo.");
            inputTarea.focus();
            return;
        }

        inputTarea.value = "";
        inputTarea.focus();
    }

    const contenedorTareas = document.getElementById("mostrar_tareas");
    const nuevaTarea = document.createElement('li');
    nuevaTarea.id = `${id_tareas}`;

    arr_tareas[id_tareas] = tarea;
    id_tareas++;

    // Estructura HTML de cada tarea (texto, botón mostrar, botón eliminar)
    nuevaTarea.innerHTML = `
        <textarea readonly id="espacio-tarea">${tarea}</textarea>
        <button class="mostrar">show</button>
        <button class="eliminar">×</button>
    `;

    contenedorTareas.appendChild(nuevaTarea);

    if (nueva) {
        guardaStorage();
    }

    // Evento para eliminar una tarea
    nuevaTarea.querySelector('.eliminar').addEventListener('click', function () {
        const id = parseInt(nuevaTarea.id);
        arr_tareas.splice(id, 1);
        nuevaTarea.remove();
        guardaStorage();
        id_tareas--;

        // Limpia todo el almacenamiento si no quedan tareas
        if (id_tareas === 0) {
            localStorage.clear();
        }
    });

    // Evento para alternar el tamaño del textarea (mostrar o reducir)
    nuevaTarea.querySelector('.mostrar').addEventListener('click', function () {
        const reducir = nuevaTarea.querySelector('.mostrar');
        const abre_tarea = nuevaTarea.querySelector('#espacio-tarea');

        if (reducir.textContent === "reducir") {
            reducir.textContent = "show";
            abre_tarea.style.position = "";
            abre_tarea.style.width = '';
            abre_tarea.style.height = '';
            abre_tarea.style.overflowY = "";
        } else {
            reducir.textContent = "reducir";
            abre_tarea.style.position = "relative";
            abre_tarea.style.height = 'auto';

            // Limita la altura si es muy grande
            if (abre_tarea.scrollHeight >= 150) {
                abre_tarea.style.height = "150px";
                abre_tarea.style.overflowY = "auto";
            } else {
                abre_tarea.style.height = abre_tarea.scrollHeight + 'px';
            }
        }
    });
}

// Referencia al textarea para escribir tareas
const scalarTarea = document.getElementById('tarea');

// Evento que ajusta dinámicamente la altura del textarea
scalarTarea?.addEventListener('input', function () {
    this.style.height = 'auto'; // Reinicia altura
    this.style.height = this.scrollHeight + 'px'; // Ajusta a contenido

    // Controla el scroll si la altura es excesiva
    if (this.scrollHeight >= 300) {
        this.style.overflowY = 'auto';
        this.style.height = '300px';
    } else {
        this.style.overflowY = 'hidden';
    }
});

/**
 * Crea una burbuja animada que sube por la pantalla (efecto visual)
 */
function creatBubble() {
    const bubble = document.createElement("div");
    bubble.classList.add('bubble');

    // Tamaño aleatorio entre 10px y 30px
    const size = Math.random() * 20 + 10;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    const contenedor = document.getElementById('contenedor');
    const contenedorWidth = contenedor.offsetWidth;

    bubble.style.left = `${Math.random() * contenedorWidth}px`;
    bubble.style.bottom = '0';

    // Duración de la animación aleatoria (40-50s)
    bubble.style.animationDuration = `${40 + Math.random() * 10}s`;

    contenedor.appendChild(bubble);

    // Elimina la burbuja después de un tiempo
    setTimeout(() => {
        bubble.remove();
    }, Math.random() * (3000 - 2800) + 2800);
}

// Genera una burbuja cada 200 ms
setInterval(creatBubble, 200);

// Al cargar la página, muestra las tareas almacenadas
desplegarStorage();
