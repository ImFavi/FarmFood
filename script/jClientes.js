// Cargar solicitudes de clientes desde el archivo JSON
async function cargarSolicitudes() {
    try {
        const response = await fetch('data/clientes.json');
        const solicitudes = await response.json();
        mostrarSolicitudes(solicitudes);
    } catch (error) {
        console.error('Error al cargar las solicitudes:', error);
    }
}

// Mostrar las solicitudes en formularios
function mostrarSolicitudes(solicitudes) {
    const solicitudesContainer = document.getElementById('solicitudesContainer');
    solicitudesContainer.innerHTML = ''; // Limpiar el contenedor

    solicitudes.forEach((solicitud) => {
        const col = document.createElement('div');
        col.classList.add('col-md-6', 'mb-6');
        col.innerHTML = `
            <div class="card shadow-sm" style="margin-top: 20px;">
                <div class="card-body">
                    <h5 class="card-title">${solicitud.nombre}</h5>
                    <p><strong>Productos:</strong> ${solicitud.productos.join(', ')}</p>
                    <p><strong>Fecha de Inicio:</strong> ${solicitud.fechaInicio}</p>
                    <p><strong>Fecha Límite:</strong> ${solicitud.fechaLimite}</p>
                    <p><strong>Horas de Trabajo:</strong> ${solicitud.horasTrabajo}</p>
                    <p><strong>Precio Total:</strong> $${solicitud.precioTotal.toFixed(2)}</p>
                </div>
            </div>
        `;
        solicitudesContainer.appendChild(col);
    });
}

// Cargar las solicitudes al cargar la página
document.addEventListener('DOMContentLoaded', cargarSolicitudes);
