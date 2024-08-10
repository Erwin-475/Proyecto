const registrar = () => {
    const tipo_identificacionI = document.getElementById("tipo_identificacion").value;
    const numero_identificacionI = document.getElementById("identificacion").value.trim();
    const nombreI = document.getElementById("nombre").value.trim();
    const correoI = document.getElementById("correo").value.trim();
    const contraseñaI = document.getElementById("contraseña").value.trim();
    const carreraI = document.getElementById("carrera").value.trim();
    const cargoI = parseInt(document.getElementById("cargo").value.trim());

    const validarContraseña = (contraseñaI) => {
        console.log(contraseñaI);
        const longitudMinima = 8;
        const tieneMayuscula = /[A-Z]/.test(contraseñaI);
        const tieneMinuscula = /[a-z]/.test(contraseñaI);
        const tieneNumero = /\d/.test(contraseñaI);
        const tieneCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(contraseñaI);
        return contraseñaI.length >= longitudMinima && tieneMayuscula && tieneMinuscula && tieneNumero && tieneCaracterEspecial;
    };

    const validateForm = () => {
        if (!tipo_identificacionI) {
            alert("Por favor, ingrese un tipo de identificación");
            return false;
        }
        if (!numero_identificacionI) {
            alert("Por favor, ingrese un numero de identificación");
            return false;
        }
        if (!nombreI) {
            alert("Por favor, ingrese un nombre");
            return false;
        }
        if (!correoI) {
            alert("Por favor, confirme un correo");
            return false;
        }
        if (!contraseñaI) {
            alert("Por favor, ingrese una contraseña");
            return false;
        }
        if (!validarContraseña(contraseñaI)) {
            alert("La contraseña debe tener mínimo 8 letras, 1 mayúscula, 1 minúscula, 1 número, y 1 carácter especial");
            return false;
        }
        if (!carreraI) {
            alert("Por favor, ingrese una carrera");
            return false;
        }
        if (!cargoI) {
            alert("Por favor ingrese un cargo");
        }
        return true;
    };
    if (validateForm()) {
        const data = {
            tipo_identificacion: tipo_identificacionI,
            numero_identificacion: numero_identificacionI,
            nombre_completo: nombreI,
            correo_institucional: correoI,
            password: contraseñaI,
            carrera: carreraI,
            idCargo: cargoI 
        };
        fetch("http://127.0.0.1:3000/add_docente", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            alert("Datos Guardados");
        })
        .catch(error => {
            console.error("Error:", error);
        });
        location.reload();
    }
}