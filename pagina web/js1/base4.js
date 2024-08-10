document.addEventListener('DOMContentLoaded', (event) => {
    const tabla = document.querySelector('#lista-usuarios tbody')
    function cargarUsuarios() {
        fetch("http://127.0.0.1:3000/estudiante")
            .then(response => response.json())
            .then(usuarios => {
                usuarios.forEach(usuario => {
                    console.log(usuario)
                    const row = document.createElement('tr');
                    row.innerHTML += `
                        <td>${usuario.id}</td>
                        <td>${usuario.nombre_completo}</td>
                        <td>${usuario.correo_institucional}</td>
                        <td>${usuario.carrera}</td>
                    `;
                    tabla.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error al cargar el JSON:', error);
            });
    }
    cargarUsuarios();
});