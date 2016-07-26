// JavaScript Document
window.onload = function(){
	var oPicList = document.getElementById("picList"); //拿到ul的元素
	var oCss = document.getElementById('css'); //页面样式
 	var aBtns = document.getElementById('btns').getElementsByTagName('li');//ol中的li
	var liW = 25; //每一个li的宽；
	var sHtml = ''; //给UL添加内容
	var sStyle = '';//给每一个li和a添加样式
	var iZindex = 0; //li中每个a的对应层级
	var aPic = []; //所有动态添加的li
	var iNow = 0; //当前页面;
	//需要li的个数；
	var iLength = oPicList.offsetWidth/liW;    
	for (var i = 0; i < iLength;i++) {  //循环每个li；
		//前一半的li和后一半的li的层级值；
		i > iLength/2? iZindex-- : iZindex++; 
		sStyle +="#picList li:nth-of-type("+(i+1)+"){z-index:"+iZindex+"}";//设置li的层级
		sStyle +="#picList li:nth-of-type("+(i+1)+") a{background-position:-"+i*liW+"px 0px}";//设置li中每个a的位置，拼出图相；
		sHtml += '<li><a href="#"></a><a href="#"></a><a href="#"></a><a href="#"></a><span></span><span></span></li>';//ul中的内容
	}
	oPicList.innerHTML = sHtml;
	oCss.innerHTML += sStyle ; 
	aPic = oPicList.getElementsByTagName('li');
	for (var i = 0; i < aBtns.length; i++) {//循环ol中的li
			aBtns[i].onclick = (function(a){ //添加点击事件，传入参数A，为即将到达的页面
				return function(){
					aBtns[iNow].className = "";//返回函数当前页面的classNmae
					for (var i = 0; i <aPic.length; i++) {//循环中每一个li
						with(aPic[i].style){//所有li的样式
							transition = 0.5*Math.abs(iNow-a)+"s "+i*50+"ms all ease-in-out";//为当前li添加过渡动画，速度为当前页面索引减去按钮索引时间。
							transform = "translateZ(-250px) rotateX(-"+a*90+"deg)";//要改变的，角度

						} 
					}
						this.className = "active";//当前btns中的li的className
						iNow = a;//此时当前页面等于当前按钮的下标；
				}

			})(i);//传参
		}	
}