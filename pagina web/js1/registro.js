const registrar = () => {
    const tipoIdentificacion = document.getElementById("tipo_identificacion").value;
    const numeroIdentificacion = document.getElementById("identificacion").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const contraseña = document.getElementById("contraseña").value.trim();
    const carrera = document.getElementById("carrera").value.trim();
    
    const validarContraseña = (contraseña) => {
        const longitudMinima = 8;
        const tieneMayuscula = /[A-Z]/.test(contraseña);
        const tieneMinuscula = /[a-z]/.test(contraseña);
        const tieneNumero = /\d/.test(contraseña);
        const tieneCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(contraseña);
        return contraseña.length >= longitudMinima && tieneMayuscula && tieneMinuscula && tieneNumero && tieneCaracterEspecial;
    };
    
    const validarFormulario = () => {
        if (!tipoIdentificacion) {
            alert("Por favor, ingrese su tipo de identificación");
            return false;
        }
        if (!numeroIdentificacion) {
            alert("Por favor ingrese su número de identificación");
            return false;
        }
        if (!nombre) {
            alert("Por favor, ingrese un nombre");
            return false;
        }
        if (!correo) {
            alert("Por favor, ingrese un correo");
            return false;
        }
        if (!contraseña) {
            alert("Por favor, ingrese una contraseña");
            return false;
        }
        if (!validarContraseña(contraseña)) {
            alert("La contraseña debe tener mínimo 8 letras, 1 mayúscula, 1 minúscula, 1 número, y 1 carácter especial");
            return false;
        }
        if (!carrera) {
            alert("Por favor, ingrese su carrera");
            return false;
        }
        return true;
    };
    
    if (validarFormulario()) {
        const data = {
            tipo_identificación: tipoIdentificacion,
            numero_identificación: numeroIdentificacion,
            nombre_completo: nombre,
            correo_institucional: correo,
            password: contraseña,
            carrera: carrera,
        };
        fetch("http://127.0.0.1:3000/add_estudiante", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            alert("Estudiante registrado satisfactoriamente");
            window.location.href = '../index.html';
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }
};