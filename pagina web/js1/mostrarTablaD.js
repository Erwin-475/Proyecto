let idProyectoSeleccionado = null;

const mostrarTablaP = () => {
    fetch("http://127.0.0.1:3000/getAll/proyecto")
        .then(response => response.json())
        .then(data => {
            users = data;
            console.log(users);
            users.forEach(proyecto => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${proyecto.idProyecto}</td>
                    <td>${proyecto.titulo}</td>
                    <td>${proyecto.descripción}</td>
                    <td><a href="${proyecto.archivo}" target="_blank">Ver Archivo</a></td>
                    <td>${proyecto.fecha_subida}</td>
                    <td>${proyecto.nota}</td>
                    <td>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16" onclick="mostrarF('${proyecto.titulo}', ${proyecto.idProyecto})">
                            <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
                        </svg>
                    </td>
                `;
                tablaProyectos.appendChild(row);
            });
            let table = new DataTable('#myTableProyecto');
        })
        .catch(error => {
            console.error('Error al cargar el JSON:', error);
        });
};
const retroalimentacion = () => {
    fetch("http://127.0.0.1:3000/getAll/subir")
    .then(response => response.json())
    .then(data => {
        users = data;
        const user = users.find(subir => subir.idProyecto === idProyectoSeleccionado);
        console.log('Usuario encontrado:', user);
        if (user) {
            enviarForo(user.idEstudiante, user.idProyecto);
        } else {
            console.error('No se encontró el estudiante para este proyecto');
        }
    })
    .catch(error => {
        console.error('Error al cargar el JSON:', error);
    });
}
const mostrarTablaGuia = () => {
    fetch(`http://127.0.0.1:3000/getAll/proyecto/${2}`)
    .then(response => response.json())
    .then(data => {
        users = data;
        users.forEach(proyecto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${proyecto.titulo}</td>
                <td>${proyecto.descripción}</td>
                <td><a href="${proyecto.archivo}" target="_blank">Ver Archivo</a></td>
                <td>${proyecto.fecha_subida}</td>
            `;
            tablaProyectosGuia.appendChild(row);
            return proyecto.idProyecto
        });
    })
    .catch(error => {
        console.error('Error al cargar el JSON:', error);
    });
}
const enviarForo = (idEstudiante, idProyecto) => {
    const asunto = document.getElementById('asunto').value;
    const descripción = document.getElementById('descripción').value;
    const nota = document.getElementById('nota').value;

    const docente = JSON.parse(localStorage.getItem('usuario'));
    console.log(docente)
    const idDocente = docente.idEstudiante;
    console.log(idDocente)
    const data = {
        asunto: asunto,
        descripción: descripción,
        nota: nota,
        idDocente: idDocente,
        idEstudiante: idEstudiante,
        idProyecto: idProyecto,
    };
    fetch("http://127.0.0.1:3000/add_foro", {
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
// const mostrarTablaE = () => {
//     fetch("http://127.0.0.1:3000/getAll/estudiante")
//     .then(response => response.json())
//     .then(data => {
//         data.forEach(estudiante => {
//             const row = document.createElement("tr");
//             row.innerHTML = `
//                 <td>${estudiante.nombre_completo}</td>
//                 <td>${estudiante.correo_institucional}</td>
//                 <td>${estudiante.carrera}</td>
//             `;
//             tablaEstudiante.appendChild(row);
//         });
//     })
//     .catch(error => {
//         console.error("Error al cargar el JSON:", error);
//     });
// };
