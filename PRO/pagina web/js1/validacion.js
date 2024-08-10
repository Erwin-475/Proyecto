const verificarToken = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("No has iniciado sesión. Serás redirigido a la página de inicio de sesión.");
        location.href = "ingreso.html";
        return false;
    }

    return fetch('http://127.0.0.1:3000/protegida', {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Token inválido o expirado');
        }
        return response.json();
    })
    .then(data => {
        console.log('Token válido:', data);
        return true;
    })
    .catch(error => {
        console.error('Error de autenticación:', error);
        alert("Sesión inválida. Serás redirigido a la página de inicio de sesión.");
        localStorage.removeItem("token");
        location.href = "ingreso.html";
        return false;
    });
};
