const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname +'/views/partials')
app.set('view engine','hbs')

app.use((req,res,next) => {
	var now = new Date().toString();

	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) =>{
		if (err){
			console.log('Unable to append to server', log + '\n')
		}
	})




	next();

});



// app.use((req,res,next) => {

// res.render('maintenance.hbs');

// next()


// });

app.use(express.static(__dirname +'/public'));



hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
	return text.toUpperCase();
});

app.get('/',(req,res) =>{
	//res.send('<h1>Hello Express!</h1>');

	res.render('home.hbs',{
		pageTitle: 'HomePage',
		currentYear: new Date().getFullYear(),
		welcomeMessage: 'Welcome to the homepage'
	});
});


app.get('/projects',(req,res) =>{
	//res.send('<h1>Hello Express!</h1>');
	res.render('projects.hbs',{
		currentYear: new Date().getFullYear(),
		projectMessage: 'Portfolio page here'
	});
});




app.get('/about',(req,res) => {
	res.render('about.hbs',{
		pageTitle: 'About Page',
		currentYear: new Date().getFullYear()
	});
});






app.get('/bad', (req,res) =>{

	res.send({
		errormessage: 'Unable to handle request'
	})
})


app.listen(port, () =>{
	console.log(`Server is up on port ${port}`);
});

