// Manejar el cierre de sesión
document.getElementById('logoutButton').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar que el enlace navegue
    // Limpiar session storage
    sessionStorage.clear();
    // Redirigir a index.html
    window.location.href = 'index.html';
});

// Cargar tareas desde el archivo JSON
async function cargarTareas() {
    try {
        const response = await fetch('data/tareas.json');
        const tareas = await response.json();
        mostrarTareas(tareas);
    } catch (error) {
        console.error('Error al cargar las tareas:', error);
    }
}

// Mostrar tareas en la interfaz
function mostrarTareas(tareas) {
    const taskContainer = document.getElementById('taskContainer');
    taskContainer.innerHTML = ''; // Limpiar el contenedor

    tareas.forEach((tarea) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('list-group-item', 'list-group-item-action');
        taskItem.innerHTML = `
            <h5>${tarea.cliente}</h5>
            <p><strong>Productos:</strong> ${tarea.productos.join(', ')}</p>
            <p><strong>Fecha de Inicio:</strong> ${tarea.fechaInicio}</p>
            <p><strong>Fecha Límite:</strong> ${tarea.fechaLimite}</p>
            <p><strong>Horas de Trabajo:</strong> ${tarea.horasTrabajo}</p>
            <p><strong>Precio Total:</strong> $${tarea.precioTotal}</p>
            <p><strong>Avances:</strong> ${tarea.avances}</p>
            <p><strong>Responsable:</strong> ${tarea.responsable}</p>
        `;
        taskContainer.appendChild(taskItem);
    });
}

// Descargar PDF
document.getElementById('downloadPdf').addEventListener('click', async () => {
    const tareas = await fetch('data/tareas.json').then(res => res.json());
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Tareas', 10, 10);

    let y = 20;
    tareas.forEach((tarea) => {
        doc.setFontSize(14);
        doc.text(`Cliente: ${tarea.cliente}`, 10, y);
        doc.text(`Productos: ${tarea.productos.join(', ')}`, 10, y + 10);
        doc.text(`Fecha de Inicio: ${tarea.fechaInicio}`, 10, y + 20);
        doc.text(`Fecha Límite: ${tarea.fechaLimite}`, 10, y + 30);
        doc.text(`Horas de Trabajo: ${tarea.horasTrabajo}`, 10, y + 40);
        doc.text(`Precio Total: $${tarea.precioTotal}`, 10, y + 50);
        doc.text(`Avances: ${tarea.avances}`, 10, y + 60);
        doc.text(`Responsable: ${tarea.responsable}`, 10, y + 70);
        y += 80; // Espaciado entre tareas
    });

    doc.save('tareas.pdf');
});

// Cargar las tareas al iniciar
document.addEventListener('DOMContentLoaded', cargarTareas);
