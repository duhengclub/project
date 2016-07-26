window.onload = function(){
	mv.app.toTip();
	mv.app.toBanner();
	mv.app.tosel();
	mv.app.toRun();
	mv.app.drog();
}
var mv = {};//命名空间
mv.tools = {};//复用工具

mv.tools.getClassName(element,cls){
	var aEle =element.getElementsByTagName("*");
	var arr = [];
	for (var i = 0; i < aEle.length; i++) {
		if(aEle[i].className == cls){
			arr.push(aEle[i]);
		}  
	}
	return arr;
}

mv.tools.getStyle=function(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr]
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}

mv.ui = {};//复用组件；

mv.ui.textChage = function(obj,src){
	obj.onfocus = function(){
		if(this.value ==src){
			this.value = "";
		}
	}
	obj.onblur = function(){
		if(this.value ==""){
			this.value =src;
		}
	}
}

mv.ui.fadeIn = function(obj){//淡入
	var iCur = mv.tools.getStyle(obj,"opacity");
	var value = 0;
	clearInterval(obj.timer)
	if(iCur==1){
		return false;
	}
	obj.timer = setInterval(function(){
		var iSpeed =  5
		if(value ==100){
			clearInterval(obj.timer)
		}else{
			value +=iSpeed;
			obj.style.opacity = value/100
		}
	},30);
}

mv.ui.fadeOut = function(obj){//淡出
	var iCur = mv.tools.getStyle(obj,"opacity");
	if(iCur==0){
		return false;
	}
	var value = 100;
	clearInterval(obj.timer)
	obj.timer = setInterval(function(){
		var iSpeed =  -5
		if(value ==0){
			clearInterval(obj.timer)
		}else{
			value +=iSpeed;
			obj.style.opacity = value/100
		}
	},30);
}
}
mv.ui.moveLeft = function(obj,old,now){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var iSpeed = (now - old)/10;
		iSpeed = iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
		if(now == old){
			clearInterval(obj.timer);
		}else{
			old +=iSpeed;
			obj.style.left = old+"px";
		}

	},30);
}

mv.ui.drog = function(obj){
	var disx = 0;
	var disy = 0;
	obj.onmousedown = function(ev){
		var ev   = ev ||window.event;
		disx = ev.clientX - obj.offsetleft;
		disy = ev.clientY - obj.offsetTop; 
		document.onmousemove = function(ev){
			var ev  = ev ||window.event;
			var L = mv.ui.change(ev.clientX - disx ,document.documentElement.clientWidth-obj.offsetWidth,0);
			var T = mv.ui.change(ev.clientY - disy ,document.documentElement.clientHeight-obj.offsetHeight,0);
			obj.style.left = L +"px";
			obj.style.top = T +"px";
		}
		document.onmouseup = function(ev){
			document.onmousemove  = null;
			document.onmouseup = null
		}


	}


}
mv.ui.change = function(iNum,iMax,imin){
	if(iNum>iMax){
		return iMax
	}else if(iNum<imin){
		return imin
	}else{
		return iNum
	}
}


mv.ui.scale = function(obj1,obj2){
	var disx = 0;
	var disy  = 0;
	var disw = 0;
	var dish = 0;
	obj1.onmousedown = function(ev){
		var ev  = ev ||window.event;
		disx = ev.clientX;
		disy = ev.clientY;
		disw = obj1.offsetWidth;
		dish = obj1.offsetHeight;
		document.onmousemove = function(ev){
			var ev  = ev ||window.event;
			var w = mv.ui.change(ev.clientX - disx+disw,500,100);
			var h = mv.ui.change(ev.clientY - disy+dish,500,100);
			obj2.style.width = w+"px"
			obj2.style.height = h+"px"
		}
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
		}
	}
}

mv.app = {};//页面功能
mv.app.toTip = function(){
	var oText1 = document.getElementById('text1');
	var oText2 = document.getElementById('text2');
	mv.ui.textChage (oText1,"seach");
	mv.ui.textChage (oText2,"seach");
}
mv.app.toBanner=function(){
	var oDiv = document.getElementById("ad");
	var aLi = oDiv.getElementsByTagName('li');
	var prev = mv.tools.getClassName(oDiv,"prev")[0];
	var next = mv.tools.getClassName(oDiv,"next")[0];
	var prev1 = mv.tools.getClassName(oDiv,"prev1")[0];
	var next1 = mv.tools.getClassName(oDiv,"next1")[0];
	var iNow = 0
	var timer= setInterval(auto,3000);
	function auto(){
		if(iNow ==aLi.length-1){
			iNow = 0
		}else{
			iNow++;
		}

		for (var i = 0; i < aLi.length; i++) {
			mv.ui.fadeOut (aLi[i])；
		}
		mv.ui.fadeIn(aLi[iNow]);
		
	}
	function autoPrev(){
		if(iNow ==0){
			iNow = aLi.length-1
		}else{
			iNow--;
		}

		for (var i = 0; i < aLi.length; i++) {
			mv.ui.fadeOut (aLi[i])；
		}
		mv.ui.fadeIn(aLi[iNow]);
		
	}
	prev.onmouseover =prev1.onmouseover  = function(){
		prev1.style.display = "block"; 
		clearInterval(timer);
	}
	prev.onmouseout= prev1.onmouseout = function(){
		prev1.style.display = "none";
		timer= setInterval(auto,3000);
	}
	next.onmouseover=next1.onmouseover = function(){
		next1.style.display = "block";
		clearInterval(timer);
	}
	next.onmouseout =next1.onmouseout = function(){
		next1.style.display = "none";
		timer= setInterval(auto,3000);
	}
	prev1.onclick = function(){
		 autoPrev();
	};
	next1.onclick = function(){
		auto();
	};

}

mv.app.tosel = function(){
	var osel = document.getElementById("ose")
	var aDd = osel.getElementsByTagName("dd");
	var oUl = osel.getElementsByTagName("ul");
	var aH2 = osel.getElementsByTagName("h2");
	for (var i = 0; i < aDd.length; i++) {
		aDd[i].index = i;
		aDd[i].onclick = function(ev){
			var ev  = ev ||window.event;
			var This = this;
			for (var i = 0; i < oUl.length; i++) {
				oUl[i].style.display = "none";
			}
			oUl[this.index].style.display="block"; 
			document.onclick=function(){
				oUl[This.index].style.display = "none";

			}
			ev.preventDefault();

		}
	}
	for (var i = 0; i < oUl.length; i++) {
		oUl[i].index = i
		(function(ul){
			var aLi = oUl.getElementsByTagName('li');
			for (var i = 0; i < aLi.length; i++) {
				aLi[i].onmouseover = function(){
					this.className = "active"
				}
				aLi[i].onmouseout = function(){
					this.className = "";
				}
				aLi[i].onclick = function(){
					aH2[this.parentNode.index].innerHTML = this.innerHTML;
					ev.preventDefault();
					this.parentNode.style.display = "none";
				}
			}
		})(oUl[i])
	};
	mv.app.toRun = function(){
		var oRu = document.getElementById("i");
		var oUl = oRu.getElementsByTagName("ul")[0];
		var aLi = oUl.getElementsByTagName("li");
		var prev = mv.tools.getClassName(oRu,"prev")[0];
		var next = mv.tools.getClassName(oRu,"next")[0];
		var iNow =0;

		oUl.innerHTML += oUl.innerHTML;
		oUl.style.width = aLi.length*aLi[0].offsetWidth+"px";
		prev.onclick = function(){
			if(iNow == 0){
				iNow = aLi.length/2;
				oUl.style.left = -(oUl.offsetWidth/2)+"px";
			}
			mv.ui.moveLeft(oUl,-iNow*ali[0].offsetWidth,-(iNow-1)*aLi[0].offsetWidth);
			iNow--;

		};
		next.onclick = function(){
			if(iNow == aLi.length/2){
				iNow = 0;
				oUl.style.left = 0;
			}
			mv.ui.moveLeft(oUl,-iNow*ali[0].offsetWidth,-(iNow+1)*aLi[0].offsetWidth);
			iNow++;
		};
	}

}
mv.app.drog = function(){
	var aLi = document.getElementById("li");
	mv.ui.drog(aLi);
}
mv.app.quickSort=function(){//快速排序;
	if(arr.length <=1){
		return arr
	}
	var num = Math.floor(arr.length/2);
	var numVal = arr.splice(num,1);
	var L = [];
	var R = [];
	for (var i = 0; i < arr.length; i++) {
		if(arr[i]<numVal){
			L.push(arr[i])
		}else{
			R.push(arr[i]);
		}

	}
		return mv.app.quickSort(L).concat([numVal,mv.app.quickSort(R)]);

}
mv.app.quickSort([5,12,6,7,9,0])