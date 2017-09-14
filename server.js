    var express = require('express');
    var mongoose=require('mongoose');
    var Bear=require('./app/models/bear');
    var app= express();
    var bodyParser=require('body-parser');
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());

    var port=process.env.PORT||8080;

    var router=express.Router();
    // middleware to use for all requests

    router.use('/',function(req,res,next){
        console.log("something has happen.");
        next();
    });
    // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
    router.get('/',function(req,res){
         res.json({message:'welcome to our API'});
    });
     // on routes that end in /bears
     router.route('/bears')
     .post(function(req,res){
         var bear=new Bear();
         bear.name=req.body.name;
         bear.save(function(err){
             if(err)
                res.send(err);
            res.json({message:'Bear Created'});
         });
        })
        .get(function(req,res){
         Bear.find(function(err,bears){
             if(err)
                 res.send(err);
             res.json(bears);
         });
      });
      router.route('/bears/:bear_id')
      
          // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
          .get(function(req, res) {
              Bear.findById(req.params.bear_id, function(err, bear) {
                  if (err)
                      res.send(err);
                  res.json(bear);
              });
          })
          .put(function(req,res){
              Bear.findById(req.params.bear_id,function(err,bear){
                  if(err)
                    res.send(err);
                  bear.name=req.body.name;
                  bear.save(function(err){
                      if(err)
                         res.send(err);
                     res.json({message:'bear updated using put'});
                  });
              });
          })
          .delete(function(req,res){
              Bear.remove({_id:req.params.bear_id},function(err,bear){
                   if(err)
                    res.send(err);
                   res.json({message:'bear has been deleted'});
              });
          })
      
    app.use('/api',router);
   
    app.listen(port);
    console.log("our app is started",port);
    mongoose.connect('mongodb://localhost/node-test');
    

