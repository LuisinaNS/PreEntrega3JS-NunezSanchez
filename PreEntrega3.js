//Básicamente me he guiado por la clase 11 del workshop y repasé conceptos de HTML y CSS, por lo que me armé algo pequeñito según el modelo del profe

//defino un arreglo vacío para poder guardar información en el local storage
let carrito = [];


//organizo las FUNCIONES al inicio
//las funciones trabajan con nodos a partir HTML (DOM)
function agregar_al_carrito(e){

    console.log("Se seleccionó:" , e.target)

    let hijo = e.target;
    let padre = hijo.parentNode;
    let abuelo = padre.parentNode;

    let nombre_producto = padre.querySelector("h5").textContent;
    let precio_producto = padre.querySelector("p").textContent;
    let img_producto = abuelo.querySelector("img").src;
   
    console.log(nombre_producto);
    console.log(precio_producto);
    console.log(img_producto);

    //aquí quise usar una clase pero no me salió, lo voy a repasar
    let producto = {
        nombre: nombre_producto,
        precio: precio_producto,
        img: img_producto,        
    };

    //transformo mi información en objeto JSON y lo guardo en mi carrito
    let producto_json = JSON.stringify( producto );
    localStorage.setItem("productos" , producto_json);

    carrito.push(producto_json)
   
    let arreglo_JSON = JSON.stringify(carrito);
    localStorage.setItem("carrito" , arreglo_JSON);

    //como no se me han ocurrido algunas ideas para realizar en poco tiempo con la información del JSON, no lo recupero, pero lo haría con el parse

    mostrar_carrito( producto );
    

}


function mostrar_carrito( producto ){

    let fila = document.createElement("tr");

    fila.innerHTML = `<td>${producto.cantidad}</td>
                      <td>${producto.nombre}</td>
                      <td>${producto.precio}</td>
                      <td><button class="btn btn-danger borrar_elemento">X</button></td>`;

    let tabla = document.getElementById("cuerpoTabla");
    tabla.append( fila );

    //capturo elemento (boton)
    let btn_borrar = document.querySelectorAll(".borrar_elemento");

    //incluyo un evento de mouse (CLICK: mousedown-up)
    for( let boton of btn_borrar){

        boton.addEventListener("click" , borrar_producto);
    }
}


function borrar_producto(e){

    let hijo = e.target;
    let padre = hijo.parentNode;
    let abuelo = padre.parentNode;

    abuelo.remove();

}


//capturo elemento (boton) a partir de una clase de CSS
let btn_compra = document.querySelectorAll(".botonCompra");
console.log(btn_compra);

//incluyo un evento de mouse (CLICK: mousedown-up) tras recorrer la información obtenida
for( let boton of btn_compra){
    boton.addEventListener("click" , agregar_al_carrito); 

}