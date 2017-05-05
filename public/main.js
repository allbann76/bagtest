window.onload = function(){

	let bags = document.querySelectorAll('.bag');
	let bgblock = document.getElementById('bgblock');
	
	console.log('load complet!');

	function sendClick(id){

		var request = new XMLHttpRequest();
		request.open('GET', '/click/'+id, true);
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

		request.onreadystatechange = function() {
		  if (this.readyState === 4) {
		    if (this.status >= 200 && this.status < 400) {
		      
		      var resp = this.responseText;
		      if(resp=='stop'){
		      	console.log(resp);
		      	bgblock.style.display = 'block';
		      }
		      console.log('send ok '+this.status+' '+resp);

		    } else {
		      console.log('err');
		    }
		  }
		};
		request.send();
	}

	bags.forEach(function(item){
		item.addEventListener('click',function(e){
			sendClick(this.id);
		});
	})

}