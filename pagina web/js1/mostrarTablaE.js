const mostrarTablaP = () => {
    fetch("http://127.0.0.1:3000/getAll/proyecto")
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
                <td>${proyecto.nota}</td>
            `;
            tablaProyectos.appendChild(row);
            return proyecto.idProyecto
        });
        let table = new DataTable('#myTableProyecto');
    })
    .catch(error => {
        console.error('Error al cargar el JSON:', error);
    });
};
const mostrarTablaGuia = () => {
    fetch(`http://127.0.0.1:3000/getAll/proyecto/idEstado/${2}`)
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
        let table = new DataTable('#myTableProyectoT');
    })
    .catch(error => {
        console.error('Error al cargar el JSON:', error);
    });
}
const subir = () => {
    const titulo = document.getElementById('titulo').value;
    const descripción = document.getElementById('descripción').value;
    const archivo = document.getElementById('archivo').value;

    const inicioSesion = JSON.parse(localStorage.getItem('usuario'));
    const idEstudiante = inicioSesion.idEstudiante;

    const data = {
        titulo: titulo,
        descripción: descripción,
        archivo: archivo,
        idEstudiante: idEstudiante
    }
    fetch("http://127.0.0.1:3000/add_proyecto", {
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
}

const ObtenerForo = () => {
    const estudiante = JSON.parse(localStorage.getItem('usuario'));
    const idEstudiante = estudiante.idEstudiante

    fetch("http://127.0.0.1:3000/getAll/subir")
    .then(response => response.json())
    .then(data => {
        users = data;
        const user = users.find(subir => subir.idEstudiante === idEstudiante);
        console.log('Usuario encontrado:', user.idEstudiante);
        if (user) {
            cargarForo(user.idProyecto);
        } else {
            console.error('No se encontró el estudiante para este proyecto');
        }
    })
    .catch(error => {
        console.error('Error al cargar los proyectos:', error);
    });
};
const cargarForo = (idProyecto) => {
    fetch("http://127.0.0.1:3000/getAll/foro")
        .then(response => response.json())
        .then(data => {
            const foro = document.getElementById('foroI');
                foro.innerHTML = '';

                const retroalimentaciones = data.filter(foro => foro.idProyecto === idProyecto);
                console.log(retroalimentaciones)
                retroalimentaciones.forEach(retro => {
                    const card = document.createElement('div');
                    card.classList.add('card', 'mb-3');

                    card.innerHTML = `
                        <div class="card-header">${retro.asunto}</div>
                        <div class="card-body">
                            <p class="card-text">${retro.descripción}</p>
                        </div>
                    `;
                    foro.appendChild(card);
                });
                document.getElementById('foro').style.display = 'block';
            })
        .catch(error => {
            console.error('Error al cargar la retroalimentación:', error);
        });
};

/*
<-------------------------------------------GRAFICAS--------------------------------------------------------->
<-------------------------------------------GRAFICAS--------------------------------------------------------->
<-------------------------------------------GRAFICAS--------------------------------------------------------->
<-------------------------------------------GRAFICAS--------------------------------------------------------->
<-------------------------------------------GRAFICAS--------------------------------------------------------->
<-------------------------------------------GRAFICAS--------------------------------------------------------->
*/

var ctx1 = document.getElementById('myChart1').getContext('2d');
var myChart1 = new Chart(ctx1, {
    type: 'bar',
    data: {
        datasets: [{
            label: 'Proyectos en web',
            backgroundColor: ['#55ABE7'],
            borderColor: ['black']
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    }
});

fetch("http://127.0.0.1:3000/getAll/proyecto")
    .then(response => response.json())
    .then(data => {
        proyecto = data;
        mostrarChart(proyecto)
    })
    .catch(error => {
        console.error('Error al cargar el JSON:', error);
    });

const mostrarChart = (proyecto) => {
    proyecto.forEach(element => {
        myChart1.data['labels'].push(element.titulo)
        myChart1.data['datasets'][0].data.push(element.nota)
    });
};

var ctx2 = document.getElementById('myChart2').getContext('2d');
var myChart2 = new Chart(ctx2, {
    type: 'pie',
    data: {
        datasets: [{
            label: 'Estudiante en carrera',
            backgroundColor: ['#4CE1FF', '#FF5733', '#C34CFF', '#FF4C6C','#4C4CFF'],
            borderColor: ['black']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        title: {
            display: true,
            text: 'Carreras cursadas por estudiante'
        }
        }
    },
});

fetch("http://127.0.0.1:3000/getAll/grafica/2")
    .then(response => response.json())
    .then(data => {
        mostrarDoughnut(data)
    })
    .catch(error => {
        console.error('Error al cargar el JSON:', error);
    });

const mostrarDoughnut = (usuarios) => {
    usuarios.forEach(element => {
        myChart2.data.labels.push(element.carrera)
        myChart2.data.datasets[0].data.push(element.total)
    });
};

var ctx3 = document.getElementById('myChart3').getContext('2d');
var myChart3 = new Chart(ctx3, {
    type: 'pie',
    data: {
        datasets: [{
            label: 'Proyectos en web',
            backgroundColor: ['#4CE1FF', '#FF5733', '#C34CFF', '#FF4C6C','#4C4CFF'],
            borderColor: ['black'],
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        title: {
            display: true,
            text: 'Programas Doncente'
        }
        }
    },
});

fetch("http://127.0.0.1:3000/getAll/grafica/3")
    .then(response => response.json())
    .then(data => {
        mostrarDoughnut2(data)
    })
    .catch(error => {
        console.error('Error al cargar el JSON:', error);
    });

const mostrarDoughnut2 = (usuarios) => {
    usuarios.forEach(element => {
        myChart3.data.labels.push(element.carrera)
        myChart3.data.datasets[0].data.push(element.total)
    });
};

var ctx4 = document.getElementById('myChart4').getContext('2d');
var myChart4 = new Chart(ctx4, {
    type: 'bar',
    data: {
        datasets: [{
            label: 'Estudiantes con retroalimentación',
            backgroundColor: ['#55ABE7'],
            borderColor: ['black']
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    }
});

fetch("http://127.0.0.1:3000/getAll/grafica/4")
.then(response => response.json())
.then(data => {
    mostrarChart2(data);
})
.catch(error => {
    console.error('Error al cargar el JSON:', error);
});

const mostrarChart2 = (estudiantes) => {
    estudiantes.forEach(element => {
        myChart4.data.labels.push(element.nombre_completo);
        myChart4.data.datasets[0].data.push(element.total_retroalimentaciones);
    });
};

var ctx5 = document.getElementById('myChart5').getContext('2d');
var myChart5 = new Chart(ctx5, {
    type: 'pie',
    data: {
        datasets: [{
            label: 'Estado de los Proyectos',
            backgroundColor: ['#4CE1FF', '#FF5733', '#C34CFF', '#FF4C6C','#4C4CFF'],
            borderColor: ['black']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        title: {
            display: true,
            text: 'Estado de los Proyectos'
        }
        }
    },
});

fetch("http://127.0.0.1:3000/getAll/grafica/5")
.then(response => response.json())
.then(data => {
    mostrarDoughnut3(data);
})
.catch(error => {
    console.error('Error al cargar el JSON:', error);
});

const mostrarDoughnut3 = (Estado) => {
    Estado.forEach(element => {
        myChart5.data.labels.push(element.estado);
        myChart5.data.datasets[0].data.push(element.total);
    });
};

var ctx6 = document.getElementById('myChart6').getContext('2d');
var myChart6 = new Chart(ctx6, {
    type: 'bar',
    data: {
        datasets: [{
            label: 'Docente con más retroalimentación',
            backgroundColor: ['#55ABE7'],
            borderColor: ['black']
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    }
});

fetch("http://127.0.0.1:3000/getAll/grafica/6")
.then(response => response.json())
.then(data => {
    mostrarChart3(data)
})
.catch(error => {
    console.error('Error al cargar los docentes:', error);
});
mostrarChart3 = (docentes) => {
    docentes.forEach(element => {
        myChart6.data.labels.push(element.nombre_completo);
        myChart6.data.datasets[0].data.push(element.total_retroalimentaciones);
    });
}