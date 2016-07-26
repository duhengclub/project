(function(){
	var shufUl = document.getElementsByTagName('ul')[0];
	var shufLi = shufUl.getElementsByTagName('li')

	var shufOl = document.getElementsByTagName('ol')[0];
	var shufOli = shufOl.getElementsByTagName('li');

	for (var i = 0; i < shufOli.length; i++) {
		shufOli[i].index = i;
		shufOli[i].onmouseover = function(){
			for (var i = 0; i < shufOli.length; i++) {
				shufOli[i].className = ''
				shufLi[i].style.display = 'none'

			}
			this.className = 'active'
			shufLi[this.index].style.display = 'block'
		}
	}
})()

var shuffling1 = function(){
	var shufUl = document.getElementsByTagName('ul')[1];
	var shufLi = shufUl.getElementsByTagName('li')
	var shufLiHeight = shufLi[0].offsetHeight;

	var shufOl = document.getElementsByTagName('ol')[1];
	var shufOli = shufOl.getElementsByTagName('li');

	for (var i = 0; i < shufOli.length; i++) {
		shufOli[i].index = i;
		shufOli[i].onmouseover = function(){
			for (var i = 0; i < shufOli.length; i++) {
				shufOli[i].className = ''
			}
			this.className = 'active'
			shufUl.style.top = (-this.index*shufLiHeight+"px")

		}
	}
}
shuffling1()


var shuffling2 = function(){
	var shufUl = document.getElementsByTagName('ul')[2];
	var shufLi = shufUl.getElementsByTagName('li')
	var shufLiHeight = shufLi[0].offsetHeight;
	var count = 0
	
	var shufOl = document.getElementsByTagName('ol')[2];
	var shufOli = shufOl.getElementsByTagName('li');
	
	timer = setInterval(swit,500);

	
	function swit(){
			if(count ===  shufLi.length ||count ===shufOli.length){
				count = 0;
			}		
			shufUl.style.top = (-count*shufLiHeight+"px")
			for (var i = 0; i < shufOli.length; i++) {
				shufOli[i].className = ''
			}
			
			shufOli[count].className = 'active'
			count++;
	};
	shufUl.onmouseover = function(){
		clearInterval(timer);
	}
	shufUl.onmouseout = function(){		
		timer = setInterval(swit,500);
	}

	
	

}
shuffling2();