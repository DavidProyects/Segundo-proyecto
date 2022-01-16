var piezas = document.getElementsByClassName('movil');


for(var i=0;i<piezas.length;i++){
	piezas[i].setAttribute("x", Math.floor((Math.random() * 10) + 1));
	piezas[i].setAttribute("y", Math.floor((Math.random() * 409) + 1));
	piezas[i].setAttribute("onmousedown","selectelement(evt)");
}
var elementSelect = 0;
var currentX = 0;
var currentY = 0;
var currentPosX = 0;
var currentPosY = 0;

function selectelement(evt) {
	elementSelect = reorder(evt);
	currentX = evt.clientX;        
	currentY = evt.clientY;
	currentPosX = parseFloat(elementSelect.getAttribute("x"));     
	currentPosY = parseFloat(elementSelect.getAttribute("y"));
	elementSelect.setAttribute("onmousemove","moveelement(evt)");
}

function moveelement(evt){
	var dx = evt.clientX - currentX;
	var dy = evt.clientY - currentY;
	currentPosX = currentPosX + dx;
	currentPosY = currentPosY + dy;
	elementSelect.setAttribute("x",currentPosX);
	elementSelect.setAttribute("y",currentPosY);
	currentX = evt.clientX;        
	currentY = evt.clientY;
	elementSelect.setAttribute("onmouseout","deselectelement(evt)");
	elementSelect.setAttribute("onmouseup","deselectelement(evt)");
	magnet();
}

function deselectelement(evt){
	testing();
	if(elementSelect != 0){			
		elementSelect.removeAttribute("onmousemove");
		elementSelect.removeAttribute("onmouseout");
		elementSelect.removeAttribute("onmouseup");
		elementSelect = 0;
	}
}

var entorno = document.getElementById('entorno');

function reorder(evt){
	var padre = evt.target.parentNode;
	var clone = padre.cloneNode(true);
	var id = padre.getAttribute("id");
	entorno.removeChild(document.getElementById(id));
	entorno.appendChild(clone);
	return entorno.lastChild.firstChild;
}

var origX = [200,400,600,200,400,600,200,400,600];   
var origY = [133,133,133,266,266,266,400,400,400];

function magnet(){
	for(var i=0;i<piezas.length;i++){
		if (Math.abs(currentPosX-origX[i])<30 && Math.abs(currentPosY-origY[i])<30) {
			elementSelect.setAttribute("x",origX[i]);
			elementSelect.setAttribute("y",origY[i]);
		}
	}
}
			
var win = document.getElementById("win");

function testing() {
	var bien_ubicada = 0;
	var padres = document.getElementsByClassName('padre');
	for(var i=0;i<piezas.length;i++){
		var posx = parseFloat(padres[i].firstChild.getAttribute("x"));    
		var posy = parseFloat(padres[i].firstChild.getAttribute("y"));
		ide = padres[i].getAttribute("id");
		if(origX[ide] == posx && origY[ide] == posy){
			bien_ubicada = bien_ubicada + 1;
		}
	}
	if(bien_ubicada == 9){
		win.play();
        window.alert("¡Bien hecho, Lo Lograste!");
	}
}

