const tablaDocente = document.querySelector("#lista-docentes tbody");
const docentesT = document.getElementById("lista-docentes");
const tablaEstudiante = document.querySelector("#lista-estudiantes tbody");
const estudiantesT = document.getElementById("lista-estudiantes");
const tablaProyectos = document.querySelector("#lista-proyectos tbody");
const proyectosT = document.getElementById("lista-proyectos");
const FormularioD = document.getElementById("registrar-Docente");
const FormularioE = document.getElementById("registrar-Estudiante");
const inicioAdmin = document.getElementById("inicioAdmin");
const reportes = document.getElementById("reportes");  // Nueva ID

const modalEditarEstudiante = new bootstrap.Modal(document.getElementById('modalEditarEstudiante'));
const modalEditarDocente = new bootstrap.Modal(document.getElementById('modalEditarDocente'));
const modalEditarProyecto = new bootstrap.Modal(document.getElementById('modalEditarProyecto'));

const mostrarD = async () => {
    if (!(await verificarToken())) return;
    docentesT.style.display = "";
    estudiantesT.style.display = "none";
    proyectosT.style.display = "none";
    FormularioD.style.display = "none";
    FormularioE.style.display = "none";
    inicioAdmin.style.display = "none";
    if (tablaDocente.children.length === 0) {
        mostrarTablaD();
    }
};

const mostrarE = async () => {
    if (!(await verificarToken())) return;
    estudiantesT.style.display = "";
    docentesT.style.display = "none";
    proyectosT.style.display = "none";
    FormularioD.style.display = "none";
    FormularioE.style.display = "none";
    inicioAdmin.style.display = "none";
    if (tablaEstudiante.children.length === 0) {
        mostrarTablaE();
    }
};

const mostrarEditarEstudiante = () => {
    modalEditarEstudiante.show();
};

const mostrarEditarDocente = () => {
    modalEditarDocente.show();
};

const mostrarEditarProyecto = () => {
    modalEditarProyecto.show();
};

const mostrarP = async () => {
    if (!(await verificarToken())) return;
    proyectosT.style.display = "";
    docentesT.style.display = "none";
    estudiantesT.style.display = "none";
    FormularioD.style.display = "none";
    FormularioE.style.display = "none";
    inicioAdmin.style.display = "none";
    if (tablaProyectos.children.length === 0) {
        mostrarTablaP();
    }
};

const registrarD = async () => {
    if (!(await verificarToken())) return;
    FormularioD.style.display = "block";
    estudiantesT.style.display = "none";
    proyectosT.style.display = "none";
    docentesT.style.display = "none";
    FormularioE.style.display = "none";
    inicioAdmin.style.display = "none";
};

const registrarE = async () => {
    if (!(await verificarToken())) return;
    FormularioE.style.display = "block";
    estudiantesT.style.display = "none";
    proyectosT.style.display = "none";
    docentesT.style.display = "none";
    FormularioD.style.display = "none";
    inicioAdmin.style.display = "none";
};

const mostrarEstadisticas = async () => {
    if (!(await verificarToken())) return;
    inicioAdmin.style.display = "block";
    estudiantesT.style.display = "none";
    proyectosT.style.display = "none";
    docentesT.style.display = "none";
    FormularioD.style.display = "none";
    FormularioE.style.display = "none";
};

const mostrarReportes = async () => {
    if (!(await verificarToken())) return;
    reportes.style.display = "block";
    inicioAdmin.style.display = "none";
    estudiantesT.style.display = "none";
    proyectosT.style.display = "none";
    docentesT.style.display = "none";
    FormularioD.style.display = "none";
    FormularioE.style.display = "none";
};
const cerrarSesion = () => {
    localStorage.removeItem("token");
    alert("Has cerrado sesión. Serás redirigido a la página de inicio de sesión.");
    location.href = "ingreso.html";
};
