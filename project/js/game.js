window.onload = function(){
	var oBtn = document.getElementById('paly-btn');
	oBtn.onclick = function(){
		this.style.display = 'none';
		Game.init('play');
		
	};
};

var Game = { 
	oEnemy:{ //敌人数据
		e1:{style :'enemy1',blood : 1 ,score :10 ,speed :5 },
		e2:{style :'enemy2',blood : 2 ,score :50 ,speed :7},
		e3:{style :'enemy3',blood : 3 ,score :100 ,speed :10 }
	},

	gk : [
		{
			eMap : [ //第一关数据
				
				'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
				'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
				'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
				'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
				'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
				'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
				
			],
			colNum: 10 , //一行的个数
			iSpeedX: 10 , //X轴的速度
			iSpeedY: 10 , //Y轴的速度
			times: 2000   //下落的时间
		},
		{
			eMap : [ //第二关数据
				
				'e3','e3','e3','e3','e3','e3','e3','e3','e3','e3',
				'e3','e3','e3','e3','e3','e3','e3','e3','e3','e3',
				'e3','e3','e3','e3','e3','e3','e3','e3','e3','e3',
				'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
				'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
				'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
				
			],
			colNum: 10 , 
			iSpeedX: 10, 
			iSpeedY: 10,
			times: 2000 
		}

	],
	air:{ //飞机的数据
		style:'airl',
		buttstyle:'bullet'
	},



	init :function(id){  //初始化
		this.oParent = document.getElementById(id);
		this.createSscore();
		this.createEnemy(0);
		this.createAir();

	},
	createSscore:function(){ //创建积分
		var os = document.createElement('div');
		os.id = 'score';
		os.innerHTML = '积分: '+'<span>0</span>';
		this.oParent.appendChild(os);
		this.osSum = os.getElementsByTagName('span')[0];
	},
	createEnemy : function(iNow){ //敌人的创建
		if(this.oUl){
			clearInterval(this.oUl.timer);
			this.oParent.removeChild(this.oUl);

		}
		document.title ='第'+(iNow+1)+'关';

		var gk = this.gk[iNow];
		var arr = [];
		var oUl = document.createElement('ul'); //创建UL
		oUl.id = 'bee';   //ul ID
		oUl.style.width = gk.colNum * 40 + 'px'; //ul的宽等于一行的个数乘以每个li的宽
		this.oParent.appendChild(oUl); //将ul添加到play中
		oUl.style.left = (this.oParent.offsetWidth - oUl.offsetWidth)/2+'px';
		this.oUl = oUl; 
		//ul居中设置，为父盒子的宽减去ul的宽除以2      
		for (var i = 0; i <gk.eMap.length; i++) { //循环关卡
			var oLi = document.createElement('li'); //创建li元素
			oLi.className  = this.oEnemy[ gk.eMap[i] ].style; //li的属性值
			oLi.blood  = this.oEnemy[ gk.eMap[i] ].blood;
			oLi.speed  = this.oEnemy[ gk.eMap[i] ].speed;
			oLi.score  = this.oEnemy[ gk.eMap[i] ].score;
			oUl.appendChild(oLi); //将li添加到ul中
		}
		this.aLi = oUl.getElementsByTagName('li');

		for (var i = 0; i < this.aLi.length; i++) {
			arr.push([ this.aLi[i].offsetLeft, this.aLi[i].offsetTop ]);
		}
		for (var i = 0; i < this.aLi.length; i++) {
			this.aLi[i].style.position = 'absolute';
			this.aLi[i].style.left = arr[i][0]+'px';
			this.aLi[i].style.top = arr[i][1]+'px';
		}
		
		this.runEnemy(gk);

	},
	runEnemy:function(gk){ //让敌人移动
	
			var This = this;
			var L = 0;
			var R = this.oParent.offsetWidth - this.oUl.offsetWidth;
		this.oUl.timer = setInterval(function(){
			
			if(This.oUl.offsetLeft > R){
				gk.iSpeedX *= -1;
				This.oUl .style.top = This.oUl.offsetTop +gk.iSpeedY+ 'px';
			}else if(This.oUl.offsetLeft < L){
				gk.iSpeedX *=-1;
				This.oUl .style.top = 	This.oUl.offsetTop +gk.iSpeedY+ 'px';
			}
			This.oUl .style.left = This.oUl.offsetLeft +gk.iSpeedX+'px'	;
			
		},200);
		setInterval(function(){
			This.oneMove();
		},gk.times);
		
	},
	oneMove:function(){ //单兵作战
		var nowLi = this.aLi[Math.floor(Math.random()*this.aLi.length)];
		var This = this;
		nowLi.timer = setInterval(function(){
			var a = (This.oA.offsetLeft + This.oA.offsetWidth/2) - (nowLi.offsetLeft +nowLi.parentNode.offsetLeft+ This.oA.offsetWidth/2);
			var b  = (This.oA.offsetTop + This.oA.offsetHeight/2) - (nowLi.offsetTop +nowLi.parentNode.offsetTop+ This.oA.offsetHeight/2);
			var c = Math.sqrt(a*a + b*b);
			var isX  = nowLi.speed *a/c;
			var isY = nowLi.speed *b/c;
			nowLi.style.left = nowLi.offsetLeft +isX +'px';
			nowLi.style.top = nowLi.offsetTop +isY +'px';
			if(This.pz(This.oA,nowLi)){
				alert('游戏结束');
				window.location.reload();
			}

		},30)

	},
	createAir:function(){ //创建飞机
		var oA = document.createElement('div')
		this.oA = oA;
		oA.className = this.air.style;
		this.oParent.appendChild(oA);
		oA.style.left = (this.oParent.offsetWidth - oA.offsetWidth)/2 +'px';
		oA.style.top =(this.oParent.offsetHeight - oA.offsetHeight)+'px';
		this.binAir()

	},

	binAir:function(){ //操作飞机
		var timer  = null; //判断定时器
		var iNum = 0;//判断键值
		var This = this;//改变this指向
		document.onkeydown = function(ev){ //添加键盘按下事件
			if(!timer){  
				timer =  setInterval(show,30);//定时器
			}
			var ev  = ev ||window.event;//按下的目标键
			if (ev.keyCode === 37) {//判断键值的情况
				iNum = 1;

			}
			else if (ev.keyCode === 39) {
				iNum = -1;
			}
			else if (ev.keyCode === 38) {
				iNum = 2;
			}
			else if (ev.keyCode === 40) {
				iNum = -2;
			}

		};
		document.onkeyup = function(ev){ //键盘抬起事件
			var ev  = ev ||window.event;
			clearInterval(timer); //键盘抬起的时候清除定时器；
			timer = null; //重新复制给timer
			iNum = 0; //重新复制
			if (ev.keyCode === 32) {//判断键值
				This.createBullet();//调用函数

			};
		};
		function show(){ //定时函数
			var L = 0;
			var R = This.oParent.offsetWidth - This.oA.offsetWidth;
			var T = (This.oParent.offsetHeight - This.oA.offsetHeight)/2;
			if (iNum == 1 && This.oA.offsetLeft > L) {
				This.oA.style.left = This.oA.offsetLeft -10 +'px';
			}
			else if (iNum == -1 && This.oA.offsetLeft < R) {
				This.oA.style.left = This.oA.offsetLeft +10 +'px';
			}
			else if (iNum == 2 && This.oA.offsetTop > T ) {
				This.oA.style.top = This.oA.offsetTop -10 +'px';
			}
			else if (iNum == -2 ) {
				This.oA.style.top = This.oA.offsetTop +10 +'px';
			}
		};


	},
	createBullet: function(){ //子弹
		var oB = document.createElement('div');
		oB.className = this.air.buttstyle;
		this.oParent.appendChild(oB);
		oB.style.left = this.oA.offsetLeft + (this.oA.offsetWidth/2)-8+'px';
		oB.style.top = this.oA.offsetTop - 18+'px';
		this.runBullet(oB);


	},
	runBullet:function(oB){ //子弹运动
		var This = this
		oB.timer =  setInterval(function(){
			if(oB.offsetTop < -10){
				clearInterval(oB.timer);
				This.oParent.removeChild(oB);
			}
			else{
				oB.style.top =oB.offsetTop-10+'px' 
			}
			for (var i = 0; i < This.aLi.length; i++) {
				if (This.pz(oB,This.aLi[i])) {
					if (This.aLi[i].blood === 1) {
						clearInterval(This.aLi[i].timer);
						This.osSum.innerHTML = parseInt(This.osSum.innerHTML)+This.aLi[i].score;
						This.oUl.removeChild(This.aLi[i]);						
					}
					else{
						This.aLi[i].blood--;
					}
					clearInterval(oB.timer);
					This.oParent.removeChild(oB);

				}
			}
			if(!This.aLi.length){
				This.createEnemy(1)
			}
		},30)


	},
	pz:function(obj1,obj2){ //碰撞检测
		var L1 = obj1.offsetLeft;
		var R1 = obj1.offsetLeft + obj1.offsetWidth;
		var T1 = obj1.offsetTop;
		var B1 = obj1.offsetTop + obj1.offsetHeight;

		var L2 = obj2.offsetLeft + obj2.parentNode.offsetLeft;
		var R2 = obj2.offsetLeft + obj2.offsetWidth + obj2.parentNode.offsetLeft;
		var T2= obj2.offsetTop + obj2.parentNode.offsetTop;
		var B2 = obj2.offsetTop + obj2.offsetHeight + obj2.parentNode.offsetTop;
		if (R1<L2 || R2<L1 ||B1<T2||B2<T1) {
			return false;

		}
		else{
			return true;

		}
	}



}