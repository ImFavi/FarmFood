// Obtener el correo y el rol desde sessionStorage
const email = sessionStorage.getItem('email');
const rol = sessionStorage.getItem('rolUsuario');

// Comprobar que el email y rol existen antes de mostrarlos
if (email && rol) {
    document.getElementById('nombreUsuario').textContent = email;
    document.getElementById('rolUsuario').textContent = rol;
} else {
    alert('No se ha iniciado sesión.');
    window.location.href = 'index.html'; // Redirigir si no se han encontrado datos
}

// Manejar el cierre de sesión
document.getElementById('logoutButton').addEventListener('click', function (event) {
    event.preventDefault();
    sessionStorage.clear();
    window.location.href = 'index.html';
});