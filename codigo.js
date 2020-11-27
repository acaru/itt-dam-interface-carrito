var formaPago;
var cajaNombre;
var cajaPrecio;
var nombre;
var precio = /^\d+([,.]\d+)?$/; //Expresión regular para validar el precio como númerico
var cajaPrecioTotal;
var sumatorio = 0;
var unidades;
var cajaArticulos;
var avisoPrecio;
var botonImprimir;
var botonAnyadir;
var importe;


//Dejo algunos console.log por comprobaciones que he hecho

//Función que valida el nombre del artículo
function comprobarNombre(){
	if(cajaNombre.value == ""){
		avisoNombre.textContent = " falta artículo";
		avisoNombre.style.color = "red";
		cajaNombre.focus();
	}else{
		return true;
	}
}

//Función que valida el precio
function comprobarPrecio(){
	//console.log("pasa comprobar precio1");
	if(cajaPrecio.value == ""){
		//console.log("pasa comprobar precio2");
		avisoPrecio.textContent = " falta precio";
		avisoPrecio.style.color = "red";
		cajaPrecio.focus();
	}else if(precio.test(cajaPrecio.value)){
		//console.log("pasa comprobar precio3");
		return true;
	}else{
		//console.log("pasa comprobar precio4");
		avisoPrecio.textContent = " tipo de dato incorrecto"
	}
}

//Función que añade artículos a la lista
function anyadirArticulos(){
	if((comprobarNombre() == true) && (comprobarPrecio() == true)){
		if(cajaArticulos.value == ""){
			cajaArticulos.value = cajaNombre.value;
		}else{
			cajaArticulos.value += ", " + cajaNombre.value;
		}
		calcularPrecio();
		resetAnyadirArticulo();
	}	
}

//Función que calcula el precio total de los artículos
function calcularPrecio(){
		sumatorio += (cajaPrecio.value * unidades.value);
		cajaPrecioTotal.value = sumatorio;
		//console.log("carrito: " + sumatorio);	
}

//Función que chequea si está activado el checkbox de las condiciones de compra
function comprobarAceptar(){
	if(document.formulario.condiciones.checked == true){
		botonImprimir.disabled=false;
	}else{
		botonImprimir.disabled=true;
	}
}

//Función que habilita o deshabilita las capas Tarjeta o Efectivo
function cargarPago(){
	if(formaPago.value=="seleccione"){
		capaTarjeta.style.display="none";
		capaEfectivo.style.display="none";
	}else if(formaPago.value=="tarjeta"){
		capaTarjeta.style.display="block";
		capaEfectivo.style.display="none";
	}else{
		capaTarjeta.style.display="none";
		capaEfectivo.style.display="block";
		importe.value = cajaPrecioTotal.value;
	}
}

//Función para el botón imprimir que imprime por pantalla el resultado del carrito o bien,
//si no hay ninguna seleccionada te avisa
function imprimir(){
	if(formaPago.value == "seleccione"){
		alert("Seleccione una forma de pago");
	}else{
		alert("Los artículos de mi carrito son: " + cajaArticulos.value + "\n" +
		"y el precio total es: " + cajaPrecioTotal.value + " € " + "\n" +
		"Forma de pago: " + formaPago.value);
		
		/*Pruebo con string literal, qué funciona pero creo que por la codificación me pone algún carácter raro

		alert(`Los artículos de mi carrito son: ${cajaArticulos.value}
		y el precio total es: ${cajaPrecioTotal.value} € 
		Forma de pago: ${formaPago.value}`);

		*/
	}
}

//Función que resetea la caja de artículos
function resetAnyadirArticulo(){
	cajaNombre.value = "";
	cajaPrecio.value = "";
	unidades.value = "1";
	avisoNombre.textContent = "";
	avisoPrecio.textContent = "";
}

//Función que restablece el formulario y resetea el sumatorio
function restablecer(){
	console.log("pasa reset formulario");
	document.formulario.reset();
	sumatorio = 0;
	cajaNombre.focus();
	capaTarjeta.style.display="none";
	capaEfectivo.style.display="none";
	botonImprimir.disabled=true;
}

//Función que inicializa las variables
function inicializar(){
	formaPago=document.formulario.formaPago;
	cajaNombre=document.formulario.cajaNombre;
	cajaPrecio=document.formulario.cajaPrecio;
	cajaNombre.focus();
	unidades=document.formulario.unidades;
	cajaArticulos=document.formulario.cajaArticulos;
	cajaPrecioTotal=document.formulario.cajaPrecioTotal;
	avisoNombre=document.getElementById("errorNombre");
	avisoPrecio=document.getElementById("errorPrecio");

	capaTarjeta.style.display="none";
	capaEfectivo.style.display="none";

	botonAnyadir=document.formulario.boton_anyadir;
	botonImprimir=document.formulario.boton_imprimir;
	botonImprimir.disabled=true;
	importe=document.formulario.importe;
}

//Función que recoge todos los eventos listener
function configurarEventos(){
	botonAnyadir.addEventListener("click", anyadirArticulos);
	document.formulario.condiciones.addEventListener("click", comprobarAceptar);
	document.formulario.formaPago.addEventListener("change", cargarPago);
	botonImprimir.addEventListener("click", imprimir);
	document.formulario.boton_restablecer.addEventListener("click", restablecer);
}

//Función que llama a ciertas funciones una vez cargada la página web
window.onload=function(){
	inicializar();
	configurarEventos();
}