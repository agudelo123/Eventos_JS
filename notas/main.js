let notas = [
    { id: 1, titulo: 'Comprar leche', contenido: 'Ir al supermercado', realizada: false },
    { id: 2, titulo: 'Hacer ejercicio', contenido: 'Salir a correr', realizada: false },
    { id: 3, titulo: 'Estudiar JavaScript', contenido: 'Repasar conceptos', realizada: true }
];
mostrarNotas(notas);
function mostrarNotas(notasAMostrar) {
    const contenedor = document.getElementById("contenedorNotas");
    contenedor.innerHTML = "";

    if (notasAMostrar.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "NO HAY NOTAS PARA MOSTRAR";
        contenedor.appendChild(mensaje);
    } else {
        notasAMostrar.forEach(nota => {
            const card = document.createElement("div");
            card.classList.add("card", "my-2");

            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            const cardText = document.createElement("p");
            cardText.classList.add("card-text");
            cardText.textContent = nota.titulo + ": " + nota.contenido;

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("btn", "btn-danger", "mr-2");
            deleteButton.textContent = "Borrar nota";
            deleteButton.onclick = function () {
                borrarNota(nota.id);
                limpiarCampos();
            };

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = nota.realizada;
            checkbox.onchange = function () {
                marcarRealizada(nota.id);
                aplicarFiltros();
            };

            cardBody.appendChild(cardText);
            cardBody.appendChild(deleteButton);
            cardBody.appendChild(checkbox);
            card.appendChild(cardBody);
            contenedor.appendChild(card);
        });
    }
}

function agregarNota() {
    const titulo = document.getElementById("tituloInput").value;
    const contenido = document.getElementById("contenidoTextarea").value;
    if (titulo.trim() !== "" && contenido.trim() !== "") {
        const nuevaNota = {
            id: notas.length + 1,
            titulo: titulo,
            contenido: contenido,
            realizada: false
        };
        notas.push(nuevaNota);
        mostrarNotas(notas);
        limpiarCampos();
    }
}

function borrarNota(id) {
    notas = notas.filter(nota => nota.id !== id);
    mostrarNotas(notas);
}

function limpiarCampos() {
    document.getElementById("tituloInput").value = "";
    document.getElementById("contenidoTextarea").value = "";
}

function marcarRealizada(id) {
    notas.forEach(nota => {
        if (nota.id === id) {
            nota.realizada = !nota.realizada;
        }
    });
}

function filtrarPorRealizada(notas) {
    return notas.filter(nota => nota.realizada === true);
}

function filtrarPorTexto(notas, texto) {
    if (!texto || texto.trim() === '') {
        return notas;
    }

    const textoMinusculas = texto.toLowerCase().trim();

    return notas.filter(nota => {
        const tituloMinusculas = nota.titulo.toLowerCase();
        const contenidoMinusculas = nota.contenido.toLowerCase();

        return tituloMinusculas.includes(textoMinusculas) || contenidoMinusculas.includes(textoMinusculas);
    });
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
