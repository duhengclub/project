// JavaScript Document
window.onload = function(){
	var oList  = document.querySelector("#wrap");//父盒子
	var aUl = oList.getElementsByTagName("ul");//ul集合
	var aInput = document.getElementsByTagName("input")//按钮
	//行数等于父盒子的高度除以第一个li的高度
	var iRows =  oList.offsetHeight/aUl[0].children[0].offsetHeight;
	//列数等于li的总个数除以行数；
	var iCols = aUl[0].children.length/iRows;
	//var oXyli = setXy(aLi,iRows, iCols);
	var aXyLi = [];//li的坐标
	var iNow = 0;//当前页面
	 aInput[0].onclick = function(){
		 if(iNow <= 0){//判断页面，页面索引
				return;
		}
		iNow--;
		aUl[iNow].style.visibility = "visible";//为了可以点到图片
		aUl[iNow].children[0].addEventListener("transitionEnd",end,false);	
		 tab(aXyLi[iNow],0,0,function(){//当前页面li的坐标
				with(this.style){//当前li的样式
					transition =".5s background,0.1s border, 0.1s  box-shadow,1s transform easy-in,1s  opacity";
					borderColor = "rgba(0,0,0,0)"	;
					boxShadow = "0 0 0 blue";
					transform = " translate(0,0) rotateX(0) rotateX(0)";
					opacity = 1;
				}	
			},50,1,1);
	};
	aInput[1].onclick = function(){
		if(iNow >= aXyLi.length-1){
				return;
		}
		 tab(aXyLi[iNow],iCols-1,iRows-1,function(){
				with(this.style){
					borderColor = "rgba(0,0,0,0.8)"	;
					boxShadow = "0 0 20px blue";
					transform = " translate(-50px,-100px) rotateX(-720deg) rotateY(-540deg)";
					opacity = 0;
				}	
				if(this.xIndex == 0 && this.yIndex == 0){
					this.addEventListener("transitionEnd",end,false);	
				}
			},50,-1,-1);
			iNow++;
	};
	for (var i = 0; i < aUl.length; i++) {//循环ul
		var aLi = aUl[i].getElementsByTagName("li");//找到li
		aUl[i].style.zIndex = aUl.length-i;//li的层级
		aXyLi.push(setXy(aLi,iRows, iCols));//将li的坐标放进数组
	}
};
function end(e){
	
	if(e.propertyName =="transform"){
		this.parentNode.style.visibility = "hidden";		
	}	
}
function tab(arr,x,y,fn,iDelay,iSpeedX,iSpeedY){//切换函数
	if(!arr[y]||!arr[y][x]){
		return;	
	}
	if(fn){
		fn.call(arr[y][x]);	
		clearTimeout(arr[y][x].timer);
		arr[y][x].timer = setTimeout(function(){
			tab(arr,x,y+iSpeedY,fn,iDelay,iSpeedX,iSpeedY);
			tab(arr,x+iSpeedX,y,fn,iDelay,iSpeedX,iSpeedY);	
		},iDelay);
	}
	
}

function setXy(objs,iRows,iCols){//取到li的坐标
	var arr = [];//创建二维数组
	for (var i = 0; i < iRows; i++) {//循环每一行的I
		var arr2 = [];
		for (var j = 0; j < iCols; j++) {//每一列的j
			objs[i*iCols+j].xIndex = j;//当前对象的x坐标为j
			objs[i*iCols+j].yIndex = i;//当前对象的Y坐标为i
			objs[i*iCols+j].style.backgroundPosition = -(j*80)+"px -"+(i*50)+"px";//当前对象的背景图位置
			 arr2.push(objs[i*iCols+j]);//二维数组
		}
		arr.push(arr2);
	}
	return arr;//返回
}

