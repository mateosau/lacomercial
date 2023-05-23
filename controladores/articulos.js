const articulos = [{
  codigo: 101,
  nombre: "iphone SE",
  descripcion: {
    procesador: "A13 Bionic",
    alamacenamiento: "128 GB",
    camaras: "7 Mpx / 12 Mpx",
    pantalla: "4,7 Retina",
  },
  precio: 74999,
  imagen: "iphone-SE-Black.jpg"
},

{
  codigo: 102,
  nombre: "Motorola G100",
  descripcion: {
    procesador: " Octa-Core (3,2 GHz)",
    alamacenamiento: "128 GB",
    camaras: "13 Mpx / 64 Mpx",
    pantalla: "6,7 FHD+",
  },
  precio: 50000,
  imagen: "Motorola-Moto-G100.jpg"
},

{
  codigo: 103,
  nombre: "iPhone 11 Pro",
  descripcion: {
    procesador: "A13 Bionic",
    alamacenamiento: "256 GB",
    camaras: "12 Mpx / 12 Mpx",
    pantalla: "5,8 Super Retina XDR",
  },
  precio: 232901,
  imagen: "Iphone-11-Pro.jpg"
},

{
  codigo: 104,
  nombre: "Samsung Galaxy A72",
  descripcion: {
    procesador: "Octa-Core (2,3 GHz)",
    alamacenamiento: "128 GB",
    camaras: "32 Mpx / 64 Mpx",
    pantalla: " 6,7 FHD+",
  },
  precio: 66999,
  imagen: "Samsung-Galaxy-A72.jpg"
},
]

const listado = document.querySelector("#listado"); // = getElementById("listado")
for (let articulo of articulos)

  [listado.innerHTML += `
            <div class="col">
                <div class="card" style="width:18rem;">
                    <img src="imagenes/productos/${articulo.imagen}" alt=${articulo.nombre} class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">
                            <span name="spancodigo">${articulo.codigo}}</span> - <span name="spannombre">${articulo.nombre}</span>
                        </h5>
                        <p class="card-text">
                            Procesador: ${articulo.descripcion.procesador} <br>
                            Almacenamiento: ${articulo.descripcion.alamacenamiento} <br>
                            Cámaras: ${articulo.descripcion.camaras} <br>
                            Pantalla: ${articulo.descripcion.pantalla}.
                        </p>
                        <h5>$ <span name="spanprecio">${articulo.precio}</span></h5>
                        <input type="number" name="inputcantidad" class="form-control" value="0" min="0" max="30" onchange="calcularPedido()">
                    </div>
                </div>
            </div>
`]

function calcularPedido() {
  const codigos = document.getElementsByName("spancodigo");
  const nombres = document.getElementsByName("spannombre");
  const precios = document.getElementsByName("spanprecio");
  const cantidades = document.getElementsByName("inputcantidad");
  const detalle = document.getElementById("detalle");

  let cantidad;
  let precio;
  let totales = [];
  let totalPedido = 0;

  detalle.innerHTML = "";

  for (let i = 0; i < codigos.length; i++) {
    cantidad = cantidades[i].value;
    precio = parseFloat(precios[i].innerHTML);
    if (cantidad > 0) {
      totales[i] = cantidad * precio;
      totalPedido += totales[i];
      detalle.innerHTML +=
        `
       <tr>
        <td>${codigos[i].innerHTML}</td>
        <td>${nombres[i].innerHTML}</td>
        <td>${cantidades[i].innerHTML}</td>
        <td>${precios[i].innerHTML}</td> 
        <td>${totales[i]}</td>
       </tr> 
      `;
      document.getElementById("totalpedido").innerHTML = totalPedido
    }
  }
}