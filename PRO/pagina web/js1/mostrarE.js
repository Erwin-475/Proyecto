const tablaProyectos = document.querySelector("#lista-proyectos tbody");
const proyectosT = document.getElementById("lista-proyectos");
const mostrarProyectoL = document.getElementById("mostrar");
const subirT = document.getElementById("subir-proyecto");
const foroT = document.getElementById("foro");
const graficoT = document.getElementById("grafico");
const tablaProyectosGuia = document.querySelector("#lista-proyectosT tbody");
const proyectosGuia = document.getElementById("lista-proyectosT");
const tablaProyectosBuscado = document.querySelector("#lista-proyectosBuscar tbody");
const Main = document.getElementById("Main");

const mostrarMain = async () => {
    if (!(await verificarToken())) return;
    Main.style.display = "block";
    proyectosT.style.display = "none";
    subirT.style.display = "none";
    foroT.style.display = "none";
    graficoT.style.display = "none";
    proyectosGuia.style.display = "none";
};

const mostrarP = async () => {
    if (!(await verificarToken())) return;
    Main.style.display = "none";
    proyectosT.style.display = "block";
    subirT.style.display = "none";
    foroT.style.display = "none";
    graficoT.style.display = "none";
    proyectosGuia.style.display = "none";
    
    if (tablaProyectos.children.length === 0) {
        mostrarTablaP();
    }
};

const mostrarGuia = async () => {
    if (!(await verificarToken())) return;
    Main.style.display = "none";
    proyectosGuia.style.display = "block";
    subirT.style.display = "none";
    foroT.style.display = "none";
    graficoT.style.display = "none";
    proyectosT.style.display = "none";
    
    if (tablaProyectosGuia.children.length === 0) {
        mostrarTablaGuia();
    }
};

const mostrarF = async () => {
    if (!(await verificarToken())) return;
    Main.style.display = "none";
    foroT.style.display = "block";
    proyectosT.style.display = "none";
    subirT.style.display = "none";
    graficoT.style.display = "none";
    proyectosGuia.style.display = "none";
    
    ObtenerForo();
};

const mostrarS = async () => {
    if (!(await verificarToken())) return;
    Main.style.display = "none";
    subirT.style.display = "block";
    proyectosT.style.display = "none";
    foroT.style.display = "none";
    graficoT.style.display = "none";
    proyectosGuia.style.display = "none";
};

const mostrarGrafica = async () => {
    if (!(await verificarToken())) return;
    Main.style.display = "none";
    graficoT.style.display = "block";
    proyectosT.style.display = "none";
    subirT.style.display = "none";
    foroT.style.display = "none";
    proyectosGuia.style.display = "none";
};

const mostrarBuscado = async () => {
    if (!(await verificarToken())) return;
    Main.style.display = "none";
    proyectosBuscado.style.display = "block";
    subirT.style.display = "none";
    foroT.style.display = "none";
    graficoT.style.display = "none";
    proyectosGuia.style.display = "none";
    if (tablaProyectosGuia.children.length === 0) {
        mostrarTablaGuia();
    }
};

const cerrarSesion = () => {
    localStorage.removeItem("token");
    alert("Has cerrado sesión. Serás redirigido a la página de inicio de sesión.");
    location.href = "ingreso.html";
};