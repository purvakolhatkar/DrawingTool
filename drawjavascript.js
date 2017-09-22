var canvas,context,paint=false;
var clickColor=new Array();
var curColor='black';
var lastColor='black';
var size=3;
var clickSize=new Array();
var arc=false;
function init(){
	var canvasDiv=document.getElementById('canvasDiv');
	canvas=document.getElementById('myCanvas');
	var arcX=-1,arcY=-1,air=false;
	var clickX=new Array();
	var clickY=new Array();
	var clickDrag=new Array();
	//console.log(canvasDiv.style.height);
	canvas.setAttribute('width', canvasDiv.offsetWidth-5);
	canvas.setAttribute('height', window.innerHeight - 150);
	context=canvas.getContext("2d");
	
	function addClick(x,y,dragging){
		clickX.push(x);
		clickY.push(y);
		clickDrag.push(dragging);
		clickColor.push(curColor);
		clickSize.push(size);
	};
	
	function coolarc()
	{
		context.strokeStyle=curColor;
		context.lineJoin="round";
		context.lineWidth=size;	
		context.moveTo(arcX,arcY);
		context.lineTo(clickX[clickX.length-1],clickY[clickY.length-1]);
		context.closePath();
		context.strokeStyle = clickColor[clickColor.length-1];
		context.stroke();
	
	}
	
	function airbrush()
	{
		context.strokeStyle=curColor;
		context.lineJoin="round";
		context.lineWidth=size;
		context.moveTo(clickX[clickX.length-1]-1,clickY[clickY.length-1]);
		context.lineTo(clickX[clickX.length-1],clickY[clickY.length-1]);
		clickX.push(clickX[clickX.length-1]+3);
		clickY.push(clickY[clickY.length-1]-3);
		clickColor.push(curColor);
		context.moveTo(clickX[clickX.length-1]-1,clickY[clickY.length-1]);
		context.lineTo(clickX[clickX.length-1],clickY[clickY.length-1]);
		clickX.push(clickX[clickX.length-2]-3);
		clickY.push(clickY[clickY.length-2]-3);
		clickColor.push(curColor);
		context.moveTo(clickX[clickX.length-1]-1,clickY[clickY.length-1]);
		context.lineTo(clickX[clickX.length-1],clickY[clickY.length-1]);
		clickX.push(clickX[clickX.length-3]+3);
		clickY.push(clickY[clickY.length-3]+3);
		clickColor.push(curColor);
		context.moveTo(clickX[clickX.length-1]-1,clickY[clickY.length-1]);
		context.lineTo(clickX[clickX.length-1],clickY[clickY.length-1]);
		clickX.push(clickX[clickX.length-4]-3);
		clickY.push(clickY[clickY.length-4]+3);
		clickColor.push(curColor);
		context.moveTo(clickX[clickX.length-1]-1,clickY[clickY.length-1]);
		context.lineTo(clickX[clickX.length-1],clickY[clickY.length-1]);
		context.closePath();
		context.strokeStyle = clickColor[clickColor.length-1];
		context.stroke();
	}
	
	function redraw(){
		
		context.strokeStyle=curColor;
		context.lineJoin="round";
		//context.lineWidth=size;
		var x=canvas.pageX - this.offsetLeft;
		var y=canvas.pageY - this.offsetTop;
		/**for(var i=0;i<clickX.length;i++){
			context.beginPath();
			if(clickDrag[i] && i)
			{
				context.moveTo(clickX[i-1],clickY[i-1]);
			}
			else
			{
				context.moveTo(clickX[i]-1,clickY[i]);
			}
			context.lineTo(clickX[i],clickY[i]);
			context.closePath();
			context.strokeStyle = clickColor[i];
			context.stroke();
		}**/
			
			if(clickDrag[clickDrag.length-1])
			{
				context.moveTo(clickX[clickX.length-2],clickY[clickY.length-2]);
			}
			else
			{
				context.moveTo(clickX[clickX.length-1]-1,clickY[clickY.length-1]);
			}
		
		context.lineTo(clickX[clickX.length-1],clickY[clickY.length-1]);
		context.closePath();
		context.strokeStyle = clickColor[clickColor.length-1];
		context.lineWidth=clickSize[clickSize.length-1];
		context.stroke();
	}
		
	function onColorClick(color)
	{
		context.closePath();
		context.beginPath(); 	// start a new path to begin drawing in new color
		//Select the new color
		context.strokeStyle=color;
		//Highlight selected color
		var borderColor='white';
		if(color=='ffffff' || color=='ffff00'){
			borderColor='black';
		}
		
		$('#'+curColor).css("border","0px dashed white");
		$('#'+color).css("border","1px dashed"+borderColor);
		
		//Store color to unhighlight it next time around.
		if(color=='#ffffff' && curColor!='#ffffff')
			lastColor=curColor;
		curColor=color;
	}
	
	function onClear()
	{
		context.closePath();
		context.beginPath();
		//context.strokeStyle='white';
		//context.fillStyle = context.strokeStyle;
		//context.fillRect(0, 0, canvas.width, canvas.height);
		context.clearRect(0,0,context.canvas.width,context.canvas.height); 
		clickX=new Array();
		clickY=new Array();
		clickDrag=new Array();
		clickColor=new Array();
	}
	
	function onFill() 
	{
		// Start a new path to begin drawing in a new color.
		context.closePath();
		context.beginPath();
		//canvas.setAttribute('background',curColor);
		console.log(context.strokeStyle);
		if(context.strokeStyle=='#ffffff')
			context.strokeStyle=lastColor;
		context.fillStyle = context.strokeStyle;
		console.log(lastColor+context.fillStyle);
		context.fillRect(0, 0, canvas.width, canvas.height);
		for(var i=0;i<canvas.width;i++)
		{
			for(var j=0;j<canvas.height;j++)
			{
				clickX.push(i);
				clickY.push(j);
				clickDrag.push(true);
				clickColor.push(curColor);
			}
		}
		context.closePath();
	}
	$('#eraser').get(0).addEventListener('click', function(e) {arc=false; air=false; onColorClick('white'); }, false);
	$('#coolArc').get(0).addEventListener('click', function(e) {arc=true; }, false);
	$('#confetti').get(0).addEventListener('click', function(e) {air=true; }, false);
	$('#normal').get(0).addEventListener('click', function(e) {arc=false; air=false;}, false);
	$('#fill').get(0).addEventListener('click', function(e) { onFill(e.target.id); }, false);
	$('#clearAll').get(0).addEventListener('click', function(e) { onClear(e.target.id); }, false);
	$('#radius3').get(0).addEventListener('click', function(e) {if(size>1) size=size-1; else size=1;}, false);
	$('#radius5').get(0).addEventListener('click', function(e) { if(size<11) size=size+1; else size=11; }, false);
	$('#red').get(0).addEventListener('click', function(e) { onColorClick(e.target.id); }, false);
	$('#pink').get(0).addEventListener('click', function(e) { onColorClick(e.target.id); }, false);
	$('#fuchsia').get(0).addEventListener('click', function(e) { onColorClick(e.target.id); }, false);
	$('#orange').get(0).addEventListener('click', function(e) { onColorClick(e.target.id); }, false);
	$('#yellow').get(0).addEventListener('click', function(e) { onColorClick(e.target.id); }, false);
	$('#lime').get(0).addEventListener('click', function(e) { onColorClick(e.target.id); }, false);
	$('#green').get(0).addEventListener('click', function(e) { onColorClick(e.target.id); }, false);
	$('#blue').get(0).addEventListener('click', function(e) { onColorClick(e.target.id); }, false);
	$('#purple').get(0).addEventListener('click', function(e) { onColorClick(e.target.id); }, false);
	$('#indigo').get(0).addEventListener('click', function(e) { onColorClick(e.target.id); }, false);
	$('#black').get(0).addEventListener('click', function(e) { onColorClick(e.target.id); }, false);
	$('#grey').get(0).addEventListener('click', function(e) { onColorClick(e.target.id); }, false);
	$('#crimson').get(0).addEventListener('click', function(e) { onColorClick(e.target.id); }, false);
	$('#cornflowerBlue').get(0).addEventListener('click', function(e) { onColorClick(e.target.id); }, false);
	//$('#canvas').onmousedown=(function(e){
	canvas.addEventListener("mousedown",function(e){	
		var x=e.pageX - this.offsetLeft;
		var y=e.pageY - this.offsetTop;
		paint =true;					//draw only when paint is true
		addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
		if(arc) 
		{	
			if(arcX==-1)
			{
				arcX=x;
				arcY=y;
			}
			coolarc();
		}
		else if(air)
		{
			airbrush();
		}
		else
		{	
				arcX=-1;
				arcY=-1;
			redraw();
		}
	});
	
	//$('#canvas').mousemove(function(e){
		canvas.addEventListener("mousemove",function(e){	
		if(paint)
		{
			addClick(e.pageX - this.offsetLeft,e.pageY - this.offsetTop,true);
			if(arc) 
		{	
			if(arcX==-1)
			{
				arcX=x;
				arcY=y;
			}
			coolarc();
		}
		else if(air)
		{
			airbrush();
		}
		else
		{	
				arcX=-1;
				arcY=-1;
			redraw();
		}
		}
	});
	
	//$('#canvas').mouseup(function(e){
	canvas.addEventListener("mouseup",function(e){	
		paint=false;
		arcX=-1;
	});
	
	//$('#canvas').mouseleave(function(e){
	canvas.addEventListener("mouseleave",function(e){	
		paint=false;
		arcX=-1;
	});
	
	
}