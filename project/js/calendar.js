// JavaScript Document
window.onload = function(){
	calendar.change();
}
var calendar = {};
calendar.change = function(){
	var aInput = document.getElementsByTagName("input");
	var oDiv = document.getElementById("div1");
	var aTd = oDiv.getElementsByTagName("td");
	var oNowTime = document.getElementById("nowTime");
	var oNextTime = document.getElementById("nextTime");
	var aNowSpan = oNowTime.getElementsByTagName("span");
	var aNextSpan = oNextTime.getElementsByTagName("span");
	var obtn = true;
	
	aInput[2].onclick = function(){
		var oDate = new Date()
		if(obtn){
			 oDiv.style.display = "block";
			 if(oDate.getMonth()+1 ===12){
				 showDate(oNowTime,oDate.getFullYear(),oDate.getMonth()+1,true);
			  showDate(oNextTime,oDate.getFullYear(),oDate.getMonth()+1,1);
			}else{
				showDate(oNowTime,oDate.getFullYear(),oDate.getMonth()+1,true);
			  showDate(oNextTime,oDate.getFullYear(),oDate.getMonth()+2);
			}
			 showColor(oDate.getDate());
			 showBtn();
			 
		}else{
			 oDiv.style.display = "none";
		}
		 obtn = !obtn;
	}
	function showDate(obj,year,month,bBtn){
		 var oDate = new Date();
		 var dayNum = 0;
		if(!obj.bBtn){
			obj.oTitle = document.createElement("div");
			obj.oTitle.className = "title";
			obj.appendChild(obj.oTitle);
			
			var oTable = document.createElement("table");
			var oThead =  document.createElement("thead");
			var oTr = document.createElement("tr");
			var arr = ['周一','周二','周三','周四','周五','周六','周日']
			for (var i = 0; i < 7; i++) {
				var oTh = document.createElement("th");
				oTh.innerHTML = arr[i];
				if(i === 5||i===6){
					oTh.className = 'red';	
				}
				oTr.appendChild(oTh);
			}
			oThead.appendChild(oTr);
			oTable.appendChild(oThead);
			
			var oTbody = document.createElement("tbody");
			for (var i = 0; i < 6; i++) {
				var oTr = 	document.createElement("tr");
				for (var j = 0; j < 7; j++) {
					var oTd = 	document.createElement("td");
					oTr.appendChild(oTd);
				}
				oTbody.appendChild(oTr);
			}
			oTable.appendChild(oTbody);
			obj.appendChild(oTable);
			obj.bBtn = true;
				
		}	
		obj.oTitle.innerHTML = (bBtn?'<div class="l"><span>'+(month-1)+'</span>月</div>' : '<div class="r"><span>'+(month+1)+'</span>月</div>')+'<div class="c"><span>'+year+'</span>年<span>'+month+'</span>月</div></div>';
			var aTd = obj.getElementsByTagName("td");
			for(var i =0;i<aTd.length;i++){
				aTd[i].	innerHTML = "";
			}
			if(month ===1||month ===3||month ===5||month ===7||month ===8||month ===12){
					dayNum = 31;
			}else if(month ===4||month ===6||month ===9||month ===11){
					dayNum = 30;
			}
			else if(month ===2&&isLeapYear(year)){
				dayNum = 29;
			}else{
				dayNum = 28;	
			}
			oDate.setFullYear(year);
			oDate.setMonth(month-1);
			oDate.setDate(1);
			
			switch(oDate.getDay()){
				case 0 :
					for(var i = 0;i<dayNum;i++){
						aTd[i+6].innerHTML =i+1;
					}
				break;
				case 1 :
					for(var i = 0;i<dayNum;i++){
						aTd[i].innerHTML =i+1;
					}
				break;	
				case 2 :
					for(var i = 0;i<dayNum;i++){
						aTd[i+1].innerHTML =i+1;
					}
				break;
				case 3 :
					for(var i = 0;i<dayNum;i++){
						aTd[i+2].innerHTML =i+1;
					}
				break;
				case 4 :
					for(var i = 0;i<dayNum;i++){
						aTd[i+3].innerHTML =i+1;
					}
				break;
				case 5 :
					for(var i = 0;i<dayNum;i++){
						aTd[i+4].innerHTML =i+1;
					}
				break;
				case 6 :
					for(var i = 0;i<dayNum;i++){
						aTd[i+5].innerHTML =i+1;
					}
				break;
				
			}
			if(month ===1&&bBtn){
				obj.oTitle.getElementsByTagName("span")[0].innerHTML = 12;
			}else if(month ===12&&!bBtn){
				obj.oTitle.getElementsByTagName("span")[0].innerHTML = 1;
			}
	}
	function isLeapYear(year){
		if(year%4==0 && year%100!=0){
			return true;
		}else{
			if(year%400){
				return true	;
			}else{
				return false;
			}	
			
		}
	}
	function showColor(date){
		var result = []; 
		var oDate = new Date();
		var re = new RegExp(''+date+'(<p>)*');
		var bBtn = true;
		var index = 0;
		for (var i = 0; i < aTd.length; i++) {
			if(aTd[i].innerHTML!=""){
				result.push(aTd[i]);

			}
		}
		if(aNowSpan[1].innerHTML ==oDate.getFullYear()&&aNowSpan[2].innerHTML ==oDate.getMonth()+1){
			for (var i = 0; i < result.length; i++) {
				if(re.test(result[i].innerHTML)&&bBtn){
					result[i].className = 'red';
					index = i;
					bBtn = false;
				}
			}
			for(len =index+8;index+1<len;index++){
				result[index+1].className = 'blue';
			}
		}else{
			for (var i = 0; i < result.length; i++) {
				result[i].className = '';
			}
		}
	}
	function showBtn(){
		var leftMonth = parseInt(aNowSpan[0].innerHTML);
		var leftYear= parseInt(aNowSpan[1].innerHTML);
		var rightMonth = parseInt(aNextSpan[0].innerHTML);
		var rightYear = parseInt(aNextSpan[1].innerHTML);
		aNowSpan[0].parentNode.onclick = function(){
			if(leftMonth===12){
				showDate(oNowTime,leftYear-1,leftMonth,true);
			showDate(oNextTime,leftYear,leftMonth,1);
			}else{
				showDate(oNowTime,leftYear,leftMonth,true);
				showDate(oNextTime,leftYear,leftMonth+1);
			}
			showBtn();
			showColor(new Date().getDate());	
		};
		aNextSpan[0].parentNode.onclick = function(){
			if( rightMonth===1){
				showDate(oNowTime,rightYear,12,true);
			showDate(oNextTime,rightYear+1,rightMonth);
			}else{
				showDate(oNowTime,rightYear,rightMonth-1,true);
				showDate(oNextTime,rightYear,rightMonth);
			}	
			showBtn();
			showColor(new Date().getDate());	
		};	
	}
};
