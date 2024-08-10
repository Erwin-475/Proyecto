const tablaProyectos = document.querySelector("#lista-proyectos tbody");
const proyectosT = document.getElementById("lista-proyectos");
const foroT = document.getElementById("foro");
const tablaProyectosGuia = document.querySelector("#lista-proyectosT tbody");
const proyectosGuia = document.getElementById("lista-proyectosT");
const tablaProyectosBuscado = document.querySelector("#lista-proyectosBuscar tbody");
const proyectosBuscado = document.getElementById("lista-proyectosBuscar");
const tablaEstudiante = document.querySelector("#lista-estudiantes tbody");

mostrarTablaP();

const mostrarP = async () => {
    if (!(await verificarToken())) return;
    if (proyectosT.style.display === "none") {
    proyectosT.style.display = "";
    foroT.style.display = "none";
    proyectosGuia.style.display = "none";
    proyectosBuscado.style.display = "none";
        if (tablaProyectos.children.length === 0) {
            mostrarTablaP();
        }
    }
};

const mostrarF = (titulo, idProyecto) => {
    document.getElementById('tituloProyecto').textContent = titulo;
    idProyectoSeleccionado = idProyecto;
    const modal = new bootstrap.Modal(document.getElementById('feedbackModal'));
    modal.show();
};

const mostrarGuia = async () => {
    if (!(await verificarToken())) return;
    if (proyectosGuia.style.display === "none") {
        proyectosGuia.style.display = "";
        foroT.style.display = "none";
        proyectosBuscado.style.display = "none";
        if (tablaProyectosGuia.children.length === 0) {
            mostrarTablaGuia();
        }
    } else {
        proyectosGuia.style.display = "none";
    }
};
const cerrarSesion = () => {
    localStorage.removeItem("token");
    alert("Has cerrado sesión. Serás redirigido a la página de inicio de sesión.");
    location.href = "ingreso.html";
};