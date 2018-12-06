const express = require('express');
const app =express();
const productRoutes =require('./api/routes/product');
const orderRoutes =require('./api/routes/orders');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose =require('mongoose');

app.use('/product',productRoutes);
app.use('/order',orderRoutes);


mongoose.connect('mongodb://localhost/ShopAPI')
  .then(() => console.log('conected to mongodb...'))
  .catch( err => console.error('coul not conect mongodb..', err)); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended :true}));
app.use(morgan('dev'));

app.use((req,res,next)=>{
    const error=new Error('page not found');
    error.status=404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
});

module.exports =app;