var express = require('express');
var fs = require('fs');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');

function getRand(min,max){
	return Math.floor(Math.random()*(max-min)+min);
}

let users = {};
 



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());



app.get('/',(req,res,next)=>{

	 

	if(!req.cookies.sid){

		let ids = getRand(10000,99999);

		users[ids] = [0,0,0,0,0,0,0,0,0];

		res.cookie('sid',ids,{ maxAge: 10*1000*1, httpOnly: true });
		res.render('end',{'test':'olololoo123',urls:{0:'/imgs/1.jpg',1:'/imgs/2.jpg',2:'/imgs/3.jpg',3:'/imgs/4.jpg',4:'/imgs/5.jpg',5:'/imgs/6.jpg',6:'/imgs/7.jpg',7:'/imgs/8.jpg',8:'/imgs/9.jpg'}})

	}else{
		if(users[req.cookies.sid] && users[req.cookies.sid].reduce((prev,curr)=>{return prev+curr;})<5){
			
				console.log(users[req.cookies.sid]);
				res.render('end',{'test':'olololoo123',urls:{0:'/imgs/1.jpg',1:'/imgs/2.jpg',2:'/imgs/3.jpg',3:'/imgs/4.jpg',4:'/imgs/5.jpg',5:'/imgs/6.jpg',6:'/imgs/7.jpg',7:'/imgs/8.jpg',8:'/imgs/9.jpg'}})
			
		}else{
			//res.clearCookie('sid');
			res.end('stop');
		}
	}
	
})

app.get('/click/:id',(req,res,next)=>{
		//
		if(users[req.cookies.sid] && users[req.cookies.sid][req.params.id]<1){

			if(users[req.cookies.sid].reduce((prev,curr)=>{return prev+curr;})<5){
				users[req.cookies.sid][req.params.id]++;
			}else{
				res.end('stop');
			}
		}
		console.log(users);
		console.log(users[req.cookies.sid].reduce((prev,curr)=>{return prev+curr;}))
		res.end();

})

app.get('/stat/',(req,res,next)=>{
	res.send(users);
})

app.listen(3333,(err)=>{
	if(err){console.log(err)}console.log('start!');
})