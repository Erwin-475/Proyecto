const mostrarTablaD = () => {
    fetch("http://127.0.0.1:3000/getAll/docente")
    .then(response => response.json())
    .then(data => {
        data.forEach(docente => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${docente.idDocente}</td>
                <td>${docente.nombre_completo}</td>
                <td>${docente.tipo_identificacion}</td>
                <td>${docente.numero_identificacion}</td>
                <td>${docente.correo_institucional}</td>
                <td>${docente.password}</td>
                <td>${docente.carrera}</td>
                <td>${docente.idCargo}</td>
                <td>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16" onclick="editarDocente(${docente.idDocente})">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" onclick="eliminarDocente(${docente.idDocente})">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>
                </td>
            `;
            tablaDocente.appendChild(row);
        });
        let table = new DataTable('#myTableDocente');
    })
    .catch(error => {
        console.error("Error al cargar el JSON:", error);
    });
};
mostrarTablaD();
const mostrarTablaE = () => {
    fetch("http://127.0.0.1:3000/getAll/estudiante")
    .then(response => response.json())
    .then(data => {
        data.forEach(estudiante => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${estudiante.idEstudiante}</td>
                <td>${estudiante.tipo_identificacion}</td>
                <td>${estudiante.numero_identificacion}</td>
                <td>${estudiante.nombre_completo}</td>
                <td>${estudiante.correo_institucional}</td>
                <td>${estudiante.password}</td>
                <td>${estudiante.carrera}</td>
                <td>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16" onclick="editarEstudiante(${estudiante.idEstudiante})">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" onclick="eliminarEstudiante(${estudiante.idEstudiante})">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>
                </td>
            `;
            tablaEstudiante.appendChild(row);
        });
        let table = new DataTable('#myTableEstudiante');
    })
    .catch(error => {
        console.error("Error al cargar el JSON:", error);
    });
};
const mostrarTablaP = () => {
fetch("http://127.0.0.1:3000/getAll/proyecto")
    .then(response => response.json())
    .then(data => {
        users = data;
        users.forEach(proyecto => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${proyecto.idProyecto}</td>
                <td>${proyecto.titulo}</td>
                <td>${proyecto.descripción}</td>
                <td><a href="${proyecto.archivo}" target="_blank">Ver Archivo</a></td>
                <td>${proyecto.fecha_subida}</td>
                <td>${proyecto.nota}</td>
                <td>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16" onclick="editarProyecto(${proyecto.idProyecto})">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" onclick="eliminarProyecto(${proyecto.idProyecto})">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>
                </td>
            `;
            tablaProyectos.appendChild(row);
        });
        let table = new DataTable('#myTableProyecto');
    })
    .catch(error => {
        console.error("Error al cargar el JSON:", error);
    });
};
const eliminarDocente = (idDocente) =>{
    fetch(`http://127.0.0.1:3000/delete_docente/${idDocente}`, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
        alert(data.informacion);
        mostrarTablaD();
    })
    .catch(error => {
        console.error("Error al cargar el JSON:", error);
    });
    location.reload();
};
const eliminarEstudiante = (idEstudiante) =>{
    fetch(`http://127.0.0.1:3000/delete_estudiante/${idEstudiante}`, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
        alert(data.informacion);
    })
    .catch(error => {
        console.error("Error al cargar el JSON:", error);
    });
    location.reload();
};
const editarEstudiante = (idEstudiante) => {
    fetch(`http://127.0.0.1:3000/getAll/estudiante/${idEstudiante}`)
    .then(response => response.json())
    .then(data => {
        const estudiante = data[0];
        document.getElementById("idEstudiante").value = estudiante.idEstudiante;
        document.getElementById("edit_tipo_identificación").value = estudiante.tipo_identificación;
        document.getElementById("edit_numero_identificación").value = estudiante.numero_identificación;
        document.getElementById("edit_nombre_completo").value = estudiante.nombre_completo;
        document.getElementById("edit_correo_institucional").value = estudiante.correo_institucional;
        document.getElementById("edit_password").value = estudiante.password;
        document.getElementById("edit_carrera").value = estudiante.carrera;
        mostrarEditarEstudiante();
    })
    .catch(error => {
        console.error("Error al obtener los datos del estudiante:", error);
    });
};

const actualizarEstudiante = () => {
    const idEstudiante = document.getElementById("idEstudiante").value;
    const tipo_identificación = document.getElementById("edit_tipo_identificación").value;
    const numero_identificación = document.getElementById("edit_numero_identificación").value;
    const nombre_completo = document.getElementById("edit_nombre_completo").value;
    const correo_institucional = document.getElementById("edit_correo_institucional").value;
    const password = document.getElementById("edit_password").value;
    const carrera = document.getElementById("edit_carrera").value;

    const datosEstudiante = {
        tipo_identificación,
        numero_identificación,
        nombre_completo,
        correo_institucional,
        password,
        carrera
    };

    fetch(`http://127.0.0.1:3000/update/estudiante/${idEstudiante}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosEstudiante)
    })
    .then(response => response.json())
    .then(data => {
        alert("Estudiante actualizado:", data);
        document.getElementById("form-editar-estudiante").style.display = "none";
        tablaEstudiante.innerHTML = "";
        mostrarTablaE();
    })
    .catch(error => {
        console.error("Error al actualizar el estudiante:", error);
    });
};
const editarDocente = (idDocente) => {
    fetch(`http://127.0.0.1:3000/getAll/docente/${idDocente}`)
    .then(response => response.json())
    .then(data => {
        const docente = data[0];
        document.getElementById("idDocente").value = docente.idDocente;
        document.getElementById("edit_tipo_identificación_docente").value = docente.tipo_identificación;
        document.getElementById("edit_numero_identificación_docente").value = docente.numero_identificación;
        document.getElementById("edit_nombre_completo_docente").value = docente.nombre_completo;
        document.getElementById("edit_correo_institucional_docente").value = docente.correo_institucional;
        document.getElementById("edit_password_docente").value = docente.password;
        document.getElementById("edit_carrera_docente").value = docente.carrera;
        document.getElementById("idCargo").value = docente.idCargo;
        mostrarEditarDocente();
    })
    .catch(error => {
        console.error("Error al obtener los datos del docente:", error);
    });
};

const actualizarDocente = () => {
    const idDocente = document.getElementById("idDocente").value;
    const tipo_identificacion = document.getElementById("edit_tipo_identificación_docente").value;
    const numero_identificacion = document.getElementById("edit_numero_identificación_docente").value;
    const nombre_completo = document.getElementById("edit_nombre_completo_docente").value;
    const correo_institucional = document.getElementById("edit_correo_institucional_docente").value;
    const password = document.getElementById("edit_password_docente").value;
    const carrera = document.getElementById("edit_carrera_docente").value;
    const idCargo = document.getElementById("idCargo").value;

    const datosDocente = {
        nombre_completo,
        tipo_identificacion,
        numero_identificacion,
        correo_institucional,
        password,
        carrera,
        idCargo
    };

    fetch(`http://127.0.0.1:3000/update/docente/${idDocente}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosDocente)
    })
    .then(response => response.json())
    .then(data => {
        alert("Docente actualizado:");
        document.getElementById("form-editar-docente").style.display = "none";
        tablaDocente.innerHTML = "";
        mostrarTablaD();
    })
    .catch(error => {
        console.error("Error al actualizar el Docente:", error);
    });
};
const editarProyecto = (idProyecto) => {
    fetch(`http://127.0.0.1:3000/getAll/proyecto/${idProyecto}`)
    .then(response => response.json())
    .then(data => {
        const proyecto = data[0];
        document.getElementById("idProyecto").value = proyecto.idProyecto;
        document.getElementById("edit_titulo").value = proyecto.titulo;
        document.getElementById("edit_descripción").value = proyecto.descripción;
        document.getElementById("edit_archivo").value = proyecto.archivo;
        document.getElementById("edit_nota").value = proyecto.nota;
        document.getElementById("idEstado").value = proyecto.idEstado;
        mostrarEditarProyecto();
    })
    .catch(error => {
        console.error("Error al obtener los datos del estudiante:", error);
    });
};
const actualizarProyecto = () => {
    const idProyecto = document.getElementById("idProyecto").value;
    const titulo = document.getElementById("edit_titulo").value;
    const descripción = document.getElementById("edit_descripción").value;
    const archivo = document.getElementById("edit_archivo").value;
    const nota = document.getElementById("edit_nota").value;
    const idEstado = document.getElementById("idEstado").value;

    const datosProyecto = {
        titulo,
        descripción,
        archivo,
        nota,
        idEstado
    };

    fetch(`http://127.0.0.1:3000/update/proyecto/${idProyecto}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosProyecto)
    })
    .then(response => response.json())
    .then(data => {
        alert("Proyecto actualizado:");
        document.getElementById("form-editar-proyecto").style.display = "none";
        tablaProyectos.innerHTML = "";
        mostrarTablaP();
    })
    .catch(error => {
        console.error("Error al actualizar el Docente:", error);
    });
};
const eliminarProyecto = (idProyecto) =>{
    fetch(`http://127.0.0.1:3000/delete_proyecto/${idProyecto}`, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
        alert(data.informacion);
    })
    .catch(error => {
        console.error("Error al cargar el JSON:", error);
    });
    location.reload();
};