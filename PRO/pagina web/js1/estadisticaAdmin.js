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
        myChart.data['labels'].push(element.titulo)
        myChart.data['datasets'][0].data.push(element.nota)
    });
};

var ctx = document.getElementById('myChart1').getContext('2d');
var myChart = new Chart(ctx, {
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

var ctx12 = document.getElementById('myChart2').getContext('2d');
var myChart12 = new Chart(ctx12, {
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
        mostrarDoughnut12(data)
    })
    .catch(error => {
        console.error('Error al cargar el JSON:', error);
    });

const mostrarDoughnut12 = (usuarios) => {
    usuarios.forEach(element => {
        myChart12.data.labels.push(element.carrera)
        myChart12.data.datasets[0].data.push(element.total)
    });
};

var ctx13 = document.getElementById('myChart3').getContext('2d');
var myChart13 = new Chart(ctx13, {
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
        mostrarDoughnut13(data)
    })
    .catch(error => {
        console.error('Error al cargar el JSON:', error);
    });

const mostrarDoughnut13 = (usuarios) => {
    usuarios.forEach(element => {
        myChart13.data.labels.push(element.carrera)
        myChart13.data.datasets[0].data.push(element.total)
    });
};

var ctx14 = document.getElementById('myChart4').getContext('2d');
var myChart14 = new Chart(ctx14, {
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
    mostrarChart14(data);
})
.catch(error => {
    console.error('Error al cargar el JSON:', error);
});

const mostrarChart14 = (estudiantes) => {
    estudiantes.forEach(element => {
        myChart14.data.labels.push(element.nombre_completo);
        myChart14.data.datasets[0].data.push(element.total_retroalimentaciones);
    });
};

var ctx15 = document.getElementById('myChart5').getContext('2d');
var myChart15 = new Chart(ctx15, {
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
    mostrarDoughnut15(data);
})
.catch(error => {
    console.error('Error al cargar el JSON:', error);
});

const mostrarDoughnut15 = (Estado) => {
    Estado.forEach(element => {
        myChart15.data.labels.push(element.estado);
        myChart15.data.datasets[0].data.push(element.total);
    });
};

var ctx16 = document.getElementById('myChart6').getContext('2d');
var myChart16 = new Chart(ctx16, {
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
    mostrarChart16(data)
})
.catch(error => {
    console.error('Error al cargar los docentes:', error);
});
mostrarChart16 = (docentes) => {
    docentes.forEach(element => {
        myChart16.data.labels.push(element.nombre_completo);
        myChart16.data.datasets[0].data.push(element.total_retroalimentaciones);
    });
}
// var ctx17 = document.getElementById('myChart7').getContext('2d');
// var myChart17 = new Chart(ctx17, {
//     type: 'bar',
//     data: {
//         datasets: [{
//             label: 'Proyectos en web',
//             backgroundColor: ['#55ABE7'],
//             borderColor: ['black']
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true,
//             }
//         }
//     }
// });

fetch("http://127.0.0.1:3000/getAll/proyecto")
    .then(response => response.json())
    .then(data => {

        const totalProyectos = data.length;
        const enProgreso = data.filter(proyecto => proyecto.idEstado === 1).length;
        const terminado = data.filter(proyecto => proyecto.idEstado === 2).length;

        document.getElementById('totalProyectos').innerText = totalProyectos;
        document.getElementById('EnProgreso').innerText = enProgreso;
        document.getElementById('ProyectoTerminado').innerText = terminado;

    })
    .catch(error => {
        console.error('Error al cargar el JSON:', error);
    });

// const mostrarChart17 = (proyecto) => {
//     proyecto.forEach(element => {
//         myChart17.data['labels'].push(element.titulo)
//         myChart17.data['datasets'][0].data.push(element.nota)
//     });
//     myChart17.update();
// };
// var ctx18 = document.getElementById('myChart8').getContext('2d');
// var myChart18 = new Chart(ctx18, {
//     type: 'pie',
//     data: {
//         datasets: [{
//             label: 'Numero de proyectos',
//             backgroundColor: ['#4CE1FF', '#FF5733', '#C34CFF', '#FF4C6C','#4C4CFF'],
//             borderColor: ['black']
//         }]
//     },
//     options: {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//         title: {
//             display: true,
//             text: 'Estado Proyecto'
//         }
//         }
//     },
// });
// fetch("http://127.0.0.1:3000/getAll/proyecto")
//     .then(response => response.json())
//     .then(data => {
//         proyectos = data;
//         const conteoEstado = contarEstado18(data);
//         mostrarDoughnut18(conteoEstado)
//     })
//     .catch(error => {
//         console.error('Error al cargar el JSON:', error);
//     });

// const contarEstado18 = (proyectos) => {
//     const conteoEstado = {};
//     proyectos.forEach(proyecto => {
//         if (conteoEstado[proyecto.idEstado]) {
//             conteoEstado[proyecto.idEstado]++;
//         } else {
//             conteoEstado[proyecto.idEstado] = 1;
//         }
//     });
//     return conteoEstado;
// };

// const mostrarDoughnut18 = (conteoEstado) => {
//     const tipoEstado = {
//         1: 'En desarrollo',
//         2: 'Terminado'
//     };
//     for (const [estado, cantidad] of Object.entries(conteoEstado)) {
//         myChart18.data.labels.push(tipoEstado[estado] || `Estado ${estado}`);
//         myChart18.data.datasets[0].data.push(cantidad);
//     }
//     myChart18.update();
// };
