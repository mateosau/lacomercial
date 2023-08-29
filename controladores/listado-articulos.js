import { obtenerarticulos } from '../modelos/articulos';

const url = './api/datos.php?tabla=articulos';

// alerta
const alerta = document.querySelector('#alerta');


// Formulario
const formulario = document.querySelector('#formulario');
const formularioModal = new bootstrap.Modal(document.querySelector("#formularioModal"));
const btnNuevo = document.querySelector('#btnNuevo');

// Input
const inputCodigo = document.querySelector('#codigo');
const inputNombre = document.querySelector('#nombre');
const inputDescripcion = document.querySelector('#descripcion');
const inputPrecio = document.querySelector('#precio');
const inputImagen = document.querySelector('#imagen');

//imagen del formulario
const frmImagen = document.querySelector("#frmimagen");

// variables
let accion = '';
let id;


document.addEventListener('DOMContentLoaded', () => {
    mostrarArticulos();
});

async function mostrarArticulos() {
    const articulos = await obtenerarticulos();
    console.log(articulos);
    const listado = document.querySelector("#listado"); // = getElementById("listado")
    listado.innerHTML = '';
    for (let articulo of articulos) {
        listado.innerHTML += `
            <div class="col">
                <div class="card" style="width:18rem;">
                    <img src="imagenes/productos/${articulo.imagen ?? 'nodisponible.png'}" alt=${articulo.nombre} class="card-img-top" />
                    <div class="card-body">
                        <h5 class="card-title">
                            <span name="spancodigo">${articulo.codigo}</span> - <span name="spannombre">${articulo.nombre}</span>
                        </h5>
                        <p class="card-text">
                            ${articulo.descripcion}.
                        </p>
                        <h5>$ <span name="spanprecio">${articulo.precio}</span></h5>
                        <input type="number" name="inputcantidad" class="form-control" value="0" min="0" max="30" onchange="calcularPedido()">
                    </div>
                    <div class"card-footer d-flex justify-content-center">
                    <a class="btnEditar btn btn-primary">Editar</a>
                    <a class="btnBorrar btn btn-danger">Eliminar</a>
                    <input type="hidden" class="idArticulo" value="${articulo.id}">
                    <input type="hidden" class="imagenArticulo" value="${articulo.imagen ?? 'nodisponible.png'}">
                    </div>
                </div>
            </div>
`;

    }
}

/**
 * Ejecutamos el evento sumit al formulario
 */
formulario.addEventListener('submit', function (e) {
    e.preventDefault();      // Prevenimos la accion por defecto
    const datos = new FormData(formulario);  // Guardamos los datos del formulario
    switch (accion) {
        case "insertar":
            fetch(url + '&accion=insertar', {
                method: 'POST',
                body: datos
            })
                .then(res => res.json())
                .then(data => {
                    insertarAlerta(data, 'success');
                    mostrarArticulos();
                })
            break;
        case "actualizar":
            fetch(`${url}&accion=insertar&id=${id}`, {
                method: 'POST',
                body: datos
            })
                .then(res => res.json())
                .then(data => {
                    insertarAlerta(data, 'success');
                    mostrarArticulos();
                })
            break;
    }
})

/**
 *  Ejecuta el evento clic del boton nuevo
 */
btnNuevo.addEventListener('click', () => {
    //limpiamos los inputs
    inputCodigo.value = null;
    inputNombre.value = null;
    inputDescripcion.value = null;
    inputPrecio.value = null;
    inputImagen.value = null;
    frmImagen.src = './imagenes/productos/nodisponible.png';

    //mostramos el formulario
    formularioModal.show()

    accion = 'insertar'
})
/**
 * Define el mensaje de alerta
 * @param mensaje el mensaje a mostrar
 * @param tipo el tipo de aleta
 */
const insertarAlerta = (mensaje, tipo) => {
    const envoltorio = document.createElement('div');
    envoltorio.innerHTML = `
    <div class="alert alert-${tipo} alert-dismissible" role="alert">
       <div>${mensaje}</div>
       <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;
    alerta.append(envoltorio);
}

/**
 * determina en que elemento se realiza un evento
 * @parametos elemento el elemento al que se realiza el evento
 * @parametro evento el evento realizado
 * @parametro selector el selector seleccionado
 * @parametro manejador metodo que ejecutamos el evento 
 */
const on = (elemento, evento, selector, manejador) => {
    elemento.addEventListener(evento, e => {
        if (e.target.closest(selector)) {
            manejador(e);
        }
    })
}

/**
 * Ejecuta el clic de btnEditar
 */
on(document, 'click', '.btnEditar', e => {
    const cardFooter = e.target.parentNode; // Elemento padre del boton
    // Obtener los datos del articulo seleccionado
    id = cardFooter.querySelector('.idArticulo').value;
    const codigo = cardFooter.parentNode.querySelector('span[name=spancodigo]').innerHTML;
    const nombre = cardFooter.parentNode.querySelector('span[name=spannombre]').innerHTML;
    const precio = cardFooter.parentNode.querySelector('span[name=spanprecio]').innerHTML;
    const descripcion = cardFooter.parentNode.querySelector('.card-text').innerHTML;
    const imagen = cardFooter.parentNode.querySelector('.imagenArticulo').value;

    //asignamos los valores a los input
    inputCodigo.value = codigo;
    inputNombre.value = nombre;
    inputPrecio.value = precio;
    inputDescripcion.value = descripcion;
    frmImagen.src = `./imagenes/productos/${imagen}`;

    //mostramos el formulario
    formularioModal.show();

    accion = 'actualizar';

});

/**
 * Evento click del boton borrar
 */
on(document, 'click', '.btnBorrar', e=> {
    const cardFooter = e.target.parentNode;
    id = cardFooter.querySelector('.idArticulo').value;
    const nombre = cardFooter.parentNode.querySelector("span[name=spannombre]").innerHTML;
    let aceptar = confirm(`¿Realmente desea eliminar a ${nombre}?`)
    if(aceptar){
        console.log(`${nombre} Eliminado`);
        fetch(`${url}&accion=eliminar&id=${id}`)
         .then(res => res.json())
         .then(data =>{
            insertarAlerta(data, 'danger');
            mostrarArticulos();
         });
    }

});