const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Owner = require("../models/owner").Owner;

router.get("/", (req, res, next) => {
  Owner.find()
    .select("name last_name phone location")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        owners: docs.map(doc => {
          return {
            name:doc.name,
            last_name:doc.last_name,
            phone:doc.phone,
            location:doc.location,
            _id: doc._id,

          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
 
  console.log(req.body);
  const owner = new Owner({
    _id: new mongoose.Types.ObjectId(),
    name:req.body.name,
   last_name:req.body.last_name,
    phone:req.body.phone,
    location:req.body.location,

  });
  
  
  owner
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created owner successfully",
        createdOwner: {
            name:result.name,
            last_name:result.last_name,
            phone:result.phone,
            location:result.location,
            _id: result._id

        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:ownerId", (req, res, next) => {
  const id = req.params.ownerId;
  Owner.findById(id)
    .select('name last_name phone location _id')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            stade: doc,

        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:ownerId", (req, res, next) => {
  const id = req.params.ownerId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Owner.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'owner updated',

      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:ownerId", (req, res, next) => {
  const id = req.params.ownerId;
  Owner.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'owner deleted',

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