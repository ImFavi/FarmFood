// Función para manejar el inicio de sesión
document.getElementById('loginButton').addEventListener('click', function() {
    // Obtener los valores de los campos
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validar el formato del correo electrónico
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón simple para validar el formato del correo
    const passwordPattern = /.{6,}/; // Validación simple para que la contraseña tenga al menos 6 caracteres

    if (emailPattern.test(email) && passwordPattern.test(password)) {
        // Guardar el email y password en sessionStorage si la validación es exitosa
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('password', password);
        
        // Definir roles posibles
        const roles = ["Vendedor", "Trabajador", "Supervisor", "Administrador"];
        
        // Seleccionar un rol al azar
        const rolAleatorio = roles[Math.floor(Math.random() * roles.length)];
        
        // Guardar el rol en sessionStorage
        sessionStorage.setItem('rolUsuario', rolAleatorio);
        
        alert(`Inicio de sesión exitoso. Rol asignado: ${rolAleatorio}`);
        
        // Redirigir a inicio.html
        window.location.href = 'inicio.html'; // Cambia la URL según sea necesario
    } else {
        alert('Por favor, introduce un correo y contraseña válidos.');
    }
});
