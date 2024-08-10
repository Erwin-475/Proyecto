const Iniciar = async (event) => {
    event.preventDefault();                  
    const correoI = document.getElementById("correo_institucional").value.trim();
    const contraseñaI = document.getElementById("password").value.trim();

    if (!correoI || !contraseñaI) {
        alert("Completar todos los campos.");
        return;
    }

    const response = await fetch("http://127.0.0.1:3000/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correo_institucional: correoI, password: contraseñaI })
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify(data.user));
        alert('Login exitoso');
        console.log(data)
        if (data.user_type === 'estudiante') {
            location.href = "paginaEstudiante.html";
        } else if (data.user_type === 'administrador') {
            location.href = "paginaAdministrador.html";
        } else if (data.user_type === 'docente') {
            // Redirige según el idCargo
            if (data.user.idCargo == 1) {
                location.href = "paginaDocente.html";
            } else if (data.user.idCargo == 2) {
                location.href = "paginaEvaluador.html";
            }
        }
    } else {
        alert(data.message);
    }
};
