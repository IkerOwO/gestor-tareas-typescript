import './style.css'

/**
 * Main.ts
 * @author IkerOwO
 */

// Creamos la interfaz que define las tareas
interface Task {
  id: number,
  title: string,
  description: string,
  completed: boolean
  date?: Date
};

// Creamos el array que tendra las tasks y un numero que ira aumentando a medida que agregemos tareas
var tasks: Task[] = [];
let nextTaskId = 1;

const mainTitle = document.createElement('h1');
mainTitle.textContent = 'Gestor de tareas';

// Creamos el input del titulo
const taskInput = document.createElement('input');
taskInput.type = 'text';
taskInput.className = 'taskInput';
taskInput.placeholder = 'Introduce una tarea';

// Creamos el input de la descripcion
const taskDescription = document.createElement('textarea');
taskDescription.className = 'taskDescription';

// Creamos el boton para agregar una tarea
const addButton = document.createElement('button');
addButton.textContent = 'Agregar tarea';
addButton.className = 'addButton';

// Creamos la lista que contendra todas las tasks
const taskList = document.createElement('ul');
taskList.className = 'taskList';

// Agregamos todo al body de la pagina
document.body.appendChild(mainTitle);
document.body.appendChild(taskInput);
document.body.appendChild(taskDescription);
document.body.appendChild(addButton);
document.body.appendChild(taskList);

/**
 * Funcion principal
 * Contiene todo para renderizar la pagina
 */
function paginaInicial() {
  taskList.innerHTML = '';

  // Por cada tarea que agregmos crearemos todo lo que hay dentro del forEach
  tasks.forEach(t => {
    const listItem = document.createElement('li');
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    // Si esta el checkbox activado, el estado 'completed' de la tarea pasa a ser true
    checkBox.checked = t.completed;
    checkBox.addEventListener('change', () => toggleTasks(t.id));

    const label = document.createElement('label');
    label.textContent = t.title;
    // Si esta 'completed' en true, el texto sale tachado
    label.style.textDecoration = t.completed ? 'line-through' : 'none';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Borrar';
    deleteButton.addEventListener('click', () => deleteTask(t.id));

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
  });
}

/**
 * Function para agregar las tareas a la lista
 */
function agregarTask() {
  const title = taskInput.value.trim();
  const description = taskDescription.value.trim();

  // Si no hay texto o descripcion en el input
  if (!title || !description) {
    alert('No se pueden dejar inputs vacios!');
    return;
  };

  // Si no creamos una nueva tarea
  const newTask: Task = {
    id: nextTaskId++, // Aumentamos la var para evitar ids repetidos
    title: title,
    description: description,
    completed: false
  };
  // Agregamos la nueva entrada al array
  tasks.push(newTask);
  // Devolvemos ambos inputs sin texto
  taskInput.value = '';
  taskDescription.value = '';
  paginaInicial();
}

/**
 * Funcion para marcar si una tarea esta completada
 * @param id id de la tarea
 */
function toggleTasks(id: number) {
  /* Recorremos cada elemento 't' y creamos un nuevo array
     Para ello evaluamos que si t.id es igual que id, creamos un nuevo objeto
     pero con completed invertido (si era false ahora es true)
  */
  tasks = tasks.map(t => 
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  paginaInicial();
}

/**
 * Funcion para borrar una task
 * @param id id de la tarea
 */
function deleteTask(id: number) {
  // Filtramos para encontrar la task cuyo id no sea igual al introducido como parametro
  tasks = tasks.filter(t => t.id !== id);
  paginaInicial();
}

addButton.addEventListener('click', agregarTask);

paginaInicial();