const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const cryptage_engine = require('../../crypt/cryptage');
const jwt = require("jsonwebtoken");


const User = require("../models/user").User;
//  route to signup
router.post("/signup", (req, res, next) => {
// we have to encrypt our password
  let req_email = req.body.email
  let req_password= req.body.password
  let crypt_pass = cryptage_engine.encrypt(req_password)
  let req_first_name = req.body.first_name
  let req_last_name  = req.body.last_name
  let req_phone_number = req.body.phone_number
  let req_birthday= req.body.birthday
  let req_location= req.body.location

  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } 
     
      
      else {
        console.log("yo")
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              first_name: req_first_name,
              last_name: req_last_name,
              phone_number: req_phone_number,
              birthday: req_birthday ,
              location: req_location,
              email: req_email,
              password:crypt_pass



            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });  
      }
    });






  });


//route for auth
router.post("/login",(req , res, next)=> {
  let req_email = req.body.email
  let req_password= req.body.password
  let crypt_pass = cryptage_engine.encrypt(req_password)
  
  User.find({email:req_email}).exec()
  .then(user => {
    console.log(user)


    if(user){
      console.log("we have a backdata");
      //we verifie the password into the DB and the password passed into form
      if ((crypt_pass === user[0].password) && (req_email === user[0].email)) {
        return res.status(200).json({
          message: "auth success"
        })
      }
      else{
        return res.status(200).json({message:"auth fail"})
      }
    }
    else{
      return res.status(200).json({message:"auth fail"})
    }
  })
  
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err,
      message:"login or pass dsnt match"
    });
    console.log(err)
  });

})
 
//route for getting all  users in the  data base
router.get("/getuser", (req, res, next) =>{
 User.find()
  .select("email first_name last_name phone_number birthday about cv_link experience location projects _id")
  .exec()
  .then(result => {
    res.status(200).json({
      count: result.length,
      users: result.map(result => {
        return{
          _id: result._id,
          email: result.email,
         // password, 
          first_name: result.first_name,
          last_name: result.last_name,
          phone_number: result.phone_number,
          birthday: result.birthday ,

          location: result.location,

      
        }
      })

    })
  })
  .catch(err => {
    res.status(500).json({
      error: err
    })
  })
})

// route  for finding  by  id  users

router.get("/getuser/:userId", (req, res, next) =>{
  User.findById(req.params.userId)
   //.select("email first_name last_name phone_number birthday about cv_link experience location projects _id")
   .exec()
   .then(users => {
   if(!users){
     return res.status(404).json({
       message: "no user found"
     })
   }
   res.status(200).json({
     user_found: users
   })
   })
   .catch(err => {
     res.status(500).json({
       error: err
     })
   })
 })


//update user's data

router.patch('/updateuser/:userId', (req , res, next)=> {
  const id = req.params.userId
  const updateOps = {}
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  
  }
  User.update({_id:id}, {$set: updateOps})
  .exec()
  .then(result => {
    res.status(200).json({
      message: "update success",
      //valeur: ops.value
    })
  })
  .catch(err => {
    console.log(err)
    res.status(400).json({
      error: err
    })
  })
})
 
//route to delete user by id
router.delete("/:userId", (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
