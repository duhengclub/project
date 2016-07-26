// JavaScript Document
window.onload = function(){
	shCar.app.drag();
}
var shCar  = {};
shCar.app = {};
shCar.app.drag = function(){
	var aLi = document.getElementsByTagName('li');
	var oDiv = document.getElementById("shopping");
	var obj  = {};
	var iNum = 0;
	var allMonmy = null;
	for (var i = 0; i < aLi.length; i++) {
		aLi[i].ondragstart = function(ev){
			var aP = this.getElementsByTagName("p");
			ev.dataTransfer.setData("title",aP[0].innerHTML);
			ev.dataTransfer.setData("monmy",aP[1].innerHTML);
			ev.dataTransfer.setDragImage(this,0,0);
		};
	}
	oDiv.ondragover = function(ev){
		ev.preventDefault();
	};
	oDiv.ondrop = function(ev){
		ev.preventDefault();
		var sTile = ev.dataTransfer.getData("title");
		var sMonmy = ev.dataTransfer.getData("monmy");
		if(!obj[sTile]){
			var oP =document.createElement('p');
			var oSpan = document.createElement('span');
			oSpan.className = "shopping1";
			oSpan.innerHTML = 1;
			oP.appendChild(oSpan);
			var oSpan = document.createElement('span');
			oSpan.className = "shopping2";
			oSpan.innerHTML = sTile;
			oP.appendChild(oSpan);
			var oSpan = document.createElement('span');
			oSpan.className = "shopping3";
			oSpan.innerHTML = sMonmy;
			oP.appendChild(oSpan);
			oDiv.appendChild(oP);
			obj[sTile] = 1;

		}else{
			var shopping1 = document.getElementsByClassName('shopping1');
			var shopping2 = document.getElementsByClassName('shopping2');
			for (var i = 0; i < shopping2.length; i++) {
				if(shopping2[i].innerHTML ===sTile){
					shopping1[i].innerHTML =parseInt(shopping1[i].innerHTML)+1;
				}
			}

		}
		if(!allMonmy){
			allMonmy = document.createElement('div');
			allMonmy.id = "allmony";
			
		}
		iNum += parseInt(sMonmy);
		allMonmy.innerHTML = iNum+'￥';
		oDiv.appendChild(allMonmy);
		

	}
}