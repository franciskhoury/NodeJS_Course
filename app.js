// node imports
const path = require('path');

// third party pkg imports
const express = require('express');
const bodyParser = require('body-parser');
// Declared variable not required for "built-in" templating engines like EJS or PUG.
//const hBars = require('express-handlebars'); 

// project imports
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

//put the exported express function in a variable, which is a valid request handler
const app = express();

app.set('view engine','ejs');
app.set('views','views');

app.get('/favicon.ico', (req,res) => res.sendStatus(204));

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
