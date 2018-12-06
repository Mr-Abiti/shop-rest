const express = require('express');
const router =express.Router();
const mongoose =require('mongoose');
const Order = require('../models/order');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended :true}));

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'order is fetched '
    });
});

router.post('/',(req,res,next)=>{
   const order=new Order({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name,
        product:req.body.product
    });
    order.save()
    .then(result => console.log(result))
    .catch( err => console.log(err))
    res.status(201).json({
        message:'order is created',
        order:order
    });
});

router.get('/:id',(req,res,next)=>{
    res.status(200).json({
        message:'order in detail',
        id:req.params.id

    });
});

router.delete('/:id',(req,res,next)=>{
    res.status(200).json({
        message:'order is deleted ',
        id:req.params.id
    });
});
module.exports =router;