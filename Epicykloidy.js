function RValidate()
{
	var radius = parseFloat(document.form.R.value);
	if (isNaN(radius)){
		document.getElementById("RError").innerHTML = "X";
			document.getElementById("RError").classList.remove('OK');
	}
	else if(radius < 0){
		document.getElementById("RError").innerHTML = "X";
		document.getElementById("RError").classList.remove('OK');
	}
	else{
		document.getElementById("RError").innerHTML = "OK";
		document.getElementById("RError").classList.add('OK');
	}

}

function rValidate()
{
	var radius = parseFloat(document.form.r.value);
	var R = parseFloat(document.form.R.value);
	if (isNaN(radius)){
		document.getElementById("rError").innerHTML = "X";
		document.getElementById("rError").classList.remove('OK');
	}
	else if(radius < 0 && radius < -R){
		document.getElementById("rError").innerHTML = "X";
		document.getElementById("rError").classList.remove('OK');
	}

	else{
		document.getElementById("rError").innerHTML = "OK";
		document.getElementById("rError").classList.add('OK');
	}

}

function offValidate()
{
	var off = parseFloat(document.form.off.value);
	var radius = parseFloat(document.form.r.value);
	if (isNaN(off)){
		document.getElementById("offError").innerHTML = "X";
		document.getElementById("offError").classList.remove('OK');
	}
	else if(radius >= 0 && off < 0 && off < -radius){
		document.getElementById("offError").innerHTML = "X";
		document.getElementById("offError").classList.remove('OK');
	}
	else if(radius < 0 && off < 0 && off < radius){
		document.getElementById("offError").innerHTML = "X";
		document.getElementById("offError").classList.remove('OK');
	}
	else{
		document.getElementById("offError").innerHTML = "OK";
		document.getElementById("offError").classList.add('OK');
	}

}

function canDraw()
{
	RValidate();
	rValidate();
	offValidate()
	if(document.getElementById("RError").innerHTML == "OK" &&
		document.getElementById("rError").innerHTML == "OK" &&
		document.getElementById("offError").innerHTML == "OK")
	{
		return true;
	}
	return false;

}




var fi = 0;
var myVar = 0;
var cx = 310;
var cy = 310;
var R = 0;
var r = 0;
var off = 0;
function draw1() {
	var canvas = document.getElementById("Canvas1");
	var ctx  = canvas.getContext('2d');
	ctx.clearRect(0, 0, cx*2, cy*2);
	ctx.beginPath();
	ctx.strokeStyle = "black";
	ctx.moveTo(cx, cy);
	ctx.lineTo(cx + R, cy);
 	ctx.stroke();
 	ctx.beginPath();
 	ctx.strokeStyle = "blue";
 	ctx.arc(cx, cy, R, 0, 2*Math.PI, false);
 	ctx.stroke();

 	ctx.beginPath();
 	ctx.strokeStyle = "black";
 	ctx.moveTo(cx+(R+r)*Math.cos(fi*Math.PI/180.0), cy+(R+r)*Math.sin(fi*Math.PI/180.0));
 	ctx.lineTo(cx+(R+r)*Math.cos(fi*Math.PI/180.0)-(r+off)*Math.cos(((R+r)/r)*fi*Math.PI/180.0), cy+(R+r)*Math.sin(fi*Math.PI/180.0)-(r+off)*Math.sin(((R+r)/r)*fi*Math.PI/180.0));
 	ctx.stroke();
 	ctx.beginPath();
 	ctx.strokeStyle = "blue";
 	ctx.arc(cx+(R+r)*Math.cos(fi*Math.PI/180.0), cy+(R+r)*Math.sin(fi*Math.PI/180.0), Math.abs(r), 0, 2*Math.PI, false);
 	ctx.stroke();
 	
}
function draw2() {
	
	var canvas = document.getElementById("Canvas2");
	var ctx  = canvas.getContext('2d');
	
 	ctx.beginPath();
 	ctx.strokeStyle = "black";
 	ctx.lineTo(cx+(R+r)*Math.cos(fi*Math.PI/180.0)-(r+off)*Math.cos(((R+r)/r)*fi*Math.PI/180.0), cy+(R+r)*Math.sin(fi*Math.PI/180.0)-(r+off)*Math.sin(((R+r)/r)*fi*Math.PI/180.0));
 	fi += 0.5;
 	ctx.lineTo(cx+(R+r)*Math.cos(fi*Math.PI/180.0)-(r+off)*Math.cos(((R+r)/r)*fi*Math.PI/180.0), cy+(R+r)*Math.sin(fi*Math.PI/180.0)-(r+off)*Math.sin(((R+r)/r)*fi*Math.PI/180.0));
 	ctx.stroke();
 	
 	
}
var running = false;
function drawAll(){
	draw1();
	draw2();
}
function pause() {
    clearInterval(myVar);
    running = false;
}
function resume(){
	draw();
}
function draw() {
	if(canDraw()){
		if(running){
			clearInterval(myVar);
			fi = 0;
			var canvas = document.getElementById("Canvas2");
			var ctx  = canvas.getContext('2d');
			ctx.clearRect(0, 0, cx*2, cy*2);
			
		}
		else{
			running = true;
		}
		var TR = parseFloat(document.form.R.value);
		var Tr = parseFloat(document.form.r.value);
		var Toff = parseFloat(document.form.off.value);
		var tR;
		var tr;
		var tof;
		if(Tr > 0){
			tR = TR / (TR + Tr*2 + Toff) * 300;
			tr = Tr / (TR + Tr*2 + Toff) * 300;
			toff = Toff / (TR + Tr*2 + Toff) * 300;
		}
		else if(Toff > 0){
			tR = TR / (TR+Toff) * 300;
			tr = Tr / (TR+Toff) * 300;
			toff = -Toff / (TR+Toff) * 300;
		}
		else {
			tR = TR / (TR) * 300;
			tr = Tr / (TR) * 300;
			toff = -Toff / (TR) * 300;
		}
		if(tR != R || tr != r || toff != off){	
			R = tR; r = tr; off = toff;
			clearInterval(myVar);
			fi = 0;
			var canvas = document.getElementById("Canvas2");
			var ctx  = canvas.getContext('2d');
			ctx.clearRect(0, 0, cx*2, cy*2);
		}
		myVar = setInterval(drawAll, 1);	
	}
    
}

function display(name)
{
	var contents = document.getElementsByName("CONTENT");
	for(var i=0; i<contents.length; i++){
		contents[i].classList.add('nodisplay');
	}
	document.getElementById(name).classList.remove('nodisplay');
}




