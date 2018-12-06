const express = require('express');
const router =express.Router();
const Product =require('../models/product');
const mongoose =require('mongoose');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended :true}));

router.get('/',(req,res,next)=>{
    Product.find()
    .exec()
    .then(doc => {console.log(doc)
     res.status(200).json(doc)
    }
      
    )
    .catch(err => {console.log(err)
       res.status(500).json({Error:err})   
    })
    });

router.post('/',(req,res,next)=>{
    const product= new Product({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price
    });
     product.save()
     .then(result => {console.logg(result)})
     .catch(err => {console.logg(err)});
    res.status(200).json({
        message:'handiling POST for /product',
        createProduct:product
        });
});

router.get('/:id',(req,res,next)=>{
    const id = req.params.id;
    Product.findById(id)
    .exec()
    .then(doc =>{
        console.log(doc);
        res.status(200).json(doc)
    })
    .catch(
        err => {
            console.log(err);
        }
    ) 
   
})


router.patch('/:id',(req,res,next)=>{
    const id =req.params.id;
    const updateOP={};
    for(const ops of req.body){
        updateOP[ops.propNam]= ops.value;
    }
    Product.update({_id:id},{$set:updateOP})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({Error:err});
    })

});
router.delete('/:id',(req,res,next)=>{
    const id =req.params.id;
    Product.remove({_id:id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});
module.exports = router;