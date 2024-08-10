const tablaProyectos = document.querySelector("#lista-proyectos tbody");
const proyectosT = document.getElementById("lista-proyectos");

const mostrarTablaP = () => {
    fetch("http://127.0.0.1:3000/getAll/evaluar")
    .then(response => response.json())
    .then(evaluaciones => {
        const evaluados = evaluaciones.map(evaluacion => evaluacion.idProyecto);
        fetch("http://127.0.0.1:3000/getAll/proyecto")
            .then(response => response.json())
            .then(proyectos => {
                const proyectosFiltrados = proyectos.filter(proyecto => !evaluados.includes(proyecto.idProyecto));
                tablaProyectos.innerHTML = '';
                proyectosFiltrados.forEach(proyecto => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${proyecto.idProyecto}</td>
                        <td>${proyecto.titulo}</td>
                        <td>${proyecto.descripción}</td>
                        <td><a href="${proyecto.archivo}" target="_blank">Ver Archivo</a></td>
                        <td>${proyecto.fecha_subida}</td>
                        <td>
                            <button class="btn btn-dark btn-sm" onclick="enviarEvaluar(${proyecto.idProyecto})">Evaluar</button>
                        </td>
                    `;
                    tablaProyectos.appendChild(row);
                });
                let table = new DataTable('#myTableEvaluador')
            })
            .catch(error => {
                console.error('Error al cargar los proyectos:', error);
            });
    })
    .catch(error => {
        console.error('Error al cargar las evaluaciones:', error);
    });
};
mostrarTablaP();
const mostrarP = () => {
    if (proyectosT.style.display === "none") {
        proyectosT.style.display = "";
        if (tablaProyectos.children.length === 0) {
            //mostrarTablaP();
        }
    } else {
        proyectosT.style.display = "none";
    }
};

const enviarEvaluar = (idProyecto) => {
    const nota = document.getElementById("nota").value;
    const docente = JSON.parse(localStorage.getItem('usuario'));
    const idDocente = docente.idDocente;

    const data = {
        idDocente: idDocente,
        idProyecto: idProyecto,
        nota: nota
    };
    fetch("http://127.0.0.1:3000/add_evaluar", {
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
};
const cerrarSesion = () => {
    localStorage.removeItem("token");
    alert("Has cerrado sesión. Serás redirigido a la página de inicio de sesión.");
    location.href = "ingreso.html";
};