let notas = [
    { id: 1, titulo: 'Comprar leche', contenido: 'Ir al supermercado', realizada: false },
    { id: 2, titulo: 'Hacer ejercicio', contenido: 'Salir a correr', realizada: false },
    { id: 3, titulo: 'Estudiar JavaScript', contenido: 'Repasar conceptos', realizada: true }
  ];
  
  function mostrarNotas(notasAMostrar) {
    const contenedor = document.getElementById("contenedorNotas");
    contenedor.innerHTML = notasAMostrar.length === 0 ?
      "<p>NO HAY NOTAS PARA MOSTRAR</p>" :
      notasAMostrar.map(nota => `
        <div class="card my-2">
          <div class="card-body">
            <p class="card-text">${nota.titulo}: ${nota.contenido}</p>
            <button class="btn btn-danger mr-2" onclick="borrarNota(${nota.id})">Borrar nota</button>
            <input type="checkbox" ${nota.realizada ? 'checked' : ''} onchange="marcarRealizada(${nota.id})">
          </div>
        </div>
      `).join("");
  
    limpiarCampos();
  }
  
  function agregarNota() {
    const titulo = document.getElementById("tituloInput").value.trim();
    const contenido = document.getElementById("contenidoTextarea").value.trim();
    if (titulo && contenido) {
      notas.push({ id: notas.length + 1, titulo, contenido, realizada: false });
      mostrarNotas(notas);
    }
  }
  
  function borrarNota(id) {
    notas = notas.filter(nota => nota.id !== id);
    mostrarNotas(notas);
  }
  
  function marcarRealizada(id) {
    const nota = notas.find(nota => nota.id === id);
    nota.realizada = !nota.realizada;
    mostrarNotas(notas);
  }
  
  function limpiarCampos() {
    document.getElementById("tituloInput").value = "";
    document.getElementById("contenidoTextarea").value = "";
  }
  
  function filtrarPorRealizada(notas) {
    return notas.filter(nota => nota.realizada === true);
  }
  
  function filtrarPorTexto(notas, texto) {
    return notas.filter(nota =>
      nota.titulo.toLowerCase().includes(texto) || nota.contenido.toLowerCase().includes(texto)
    );
  }
  
  function aplicarFiltros() {
    const textoFiltro = document.getElementById("filtroTexto").value.toLowerCase().trim();
    const realizadaFiltro = document.getElementById("filtroRealizada").checked;
  
    let notasFiltradas = notas;
    notasFiltradas = filtrarPorTexto(notasFiltradas, textoFiltro);
  
    if (realizadaFiltro) {
      notasFiltradas = filtrarPorRealizada(notasFiltradas);
    }
  
    mostrarNotas(notasFiltradas);
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    mostrarNotas(notas);
  });
  