(async () => {
    try {
        const response = await fetch('http://localhost:4000/session', {
            method: 'GET',
            credentials: 'include' // Importante para enviar las cookies de sesión
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('user-name').innerText = data.user.username;
        } else {
            window.location.href = 'index.html';
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
})();

// Manejar el cierre de sesión
document.getElementById('logout').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:4000/logout', {
            method: 'POST',
            credentials: 'include'
        });

        if (response.ok) {
            window.location.href = 'index.html';
        } else {
            throw new Error('Error al cerrar sesión');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
});
