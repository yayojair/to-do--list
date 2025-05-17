let id_tareas = 0;
let arr_tareas = [];


function desplegarStorage(){
    arr_tareas = JSON.parse(localStorage.getItem("tareas") || "[]");
    for (let i = 0; i<arr_tareas.length; i++){
        crear_tarea(arr_tareas[i]);
    }
}


function guardaStorage(){
    localStorage.setItem("tareas", JSON.stringify(arr_tareas));
}  


function crear_tarea(paramtarea="") {
    let tarea = "";
    let nueva = false;
    if (paramtarea != ""){
        tarea = paramtarea;
    }else{
        nueva = true;
        const inputTarea = document.getElementById("tarea");
        tarea = inputTarea.value.trim();
        inputTarea.style.height = "100px";
        if (tarea === "") {
            alert("¡El input está vacío! Escribe algo.");
            inputTarea.focus(); // Enfoca el input para que el usuario pueda escribir inmediatamente
            return; // Sale de la función temprano
        }
        inputTarea.value = "";
        inputTarea.focus(); // Vuelve a enfocar el input para la siguiente tarea
    }
    
    const contenedorTareas = document.getElementById("mostrar_tareas");
    const nuevaTarea = document.createElement('li');
    nuevaTarea.id = `${id_tareas}`;
    arr_tareas[id_tareas] = tarea;
    id_tareas ++;
    
    // Mejor estructura para la tarea (puedes personalizar)
    nuevaTarea.innerHTML = `
        <textarea readonly id="espacio-tarea">${tarea}</textarea>
        <button class="mostrar">show</button>
        <button class="eliminar">×</button>
    `;
    
    contenedorTareas.appendChild(nuevaTarea);
    
    if(nueva){
        guardaStorage();
    }
    
    // Agregar evento para eliminar tarea (opcional)
    nuevaTarea.querySelector('.eliminar').addEventListener('click', function() {
        const id = parseInt(nuevaTarea.id);
        arr_tareas.splice(id,1);
        nuevaTarea.remove();
        guardaStorage();
        id_tareas --;
        if(id_tareas == 0){
            localStorage.clear();
        }
    
    });

    nuevaTarea.querySelector('.mostrar').addEventListener('click', function(){
        const reducir = nuevaTarea.querySelector('.mostrar');
        const abre_tarea = nuevaTarea.querySelector('#espacio-tarea');
        if(reducir.textContent === "reducir"){
            reducir.textContent = "show";
            abre_tarea.style.position = "";
            abre_tarea.style.width = '';
            abre_tarea.style.height = '';
            abre_tarea.style.overflowY = "";
        }else{
            reducir.textContent = "reducir";
            abre_tarea.style.position = "relative";
            abre_tarea.style.height = 'auto';
            if(abre_tarea.scrollHeight >= 150){
                abre_tarea.style.height = "150px";
                abre_tarea.style.overflowY = "auto";
            }else{
                abre_tarea.style.height = abre_tarea.scrollHeight + 'px';
            }
            
        }
    });
}

const scalarTarea = document.getElementById('tarea');
scalarTarea.addEventListener('input', function (){
    
    // Reinicia la altura primero
    this.style.height = 'auto';

    // Ajusta la altura al contenido actual
    this.style.height = this.scrollHeight + 'px';

    // Si alcanzó una altura máxima (ej. 300px), puedes controlar el overflow
    if (this.scrollHeight >= 300) {
        this.style.overflowY = 'auto';  // Muestra scroll si ya está muy grande
        this.style.height = '300px';    // Limita la altura
    } else {
        this.style.overflowY = 'hidden'; // Sin scroll si es pequeño
    }
    
})

function creatBubble(){
    const bubble = document.createElement("div");
    bubble.classList.add('bubble');
    const size = Math.random()*20+10;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    const contenedor = document.getElementById('contenedor');
    const contenedorWidth  = contenedor.offsetWidth;
    bubble.style.left = `${Math.random()*contenedorWidth}px`;
    bubble.style.bottom = '0';
    bubble.style.animationDuration = `${40 + Math.random()*10}s`;
    contenedor.appendChild(bubble);
    setTimeout(() =>{
        bubble.remove();
    }, Math.random() * (3000 - 2800) + 2800);
}

setInterval(creatBubble, 200);

desplegarStorage();



