const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Stade = require("../models/stade").Stade;
const Owner = require("../models/owner").Owner;

router.get("/", (req, res, next) => {
  Stade.find()
    .select("name price location capacity open_time close_time _id")
    .populate("_id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        stadiums: docs.map(doc => {
          return {
            location:doc.location,
            capacity:doc.capacity,
            open_time:doc.open_time,
            close_time:doc.close_time,
            name: doc.name,
            price: doc.price,
            _id_owner:doc.owner,
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
  Owner.findById(req.body.ownerId)
  console.log(req.body);
  const stade = new Stade({
    _id: new mongoose.Types.ObjectId(),
    owner:req.body.ownerId,
    location:req.body.location,
   capacity:req.body.capacity,
    open_time:req.body.open_time,
    close_time:req.body.close_time,
    price: req.body.price,
    name: req.body.name
  });
  
  
  stade
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created stadium successfully",
        createdStadium: {
            location:result.location,
            capacity:result.capacity,
            open_time:result.open_time,
            close_time:result.close_time,
            name: result.name,
            price: result.price,
            _id: result._id,
            _id_owner:result.owner

        }
      });
    })
    .catch(err => {
      console.log(err);
      console.log("probllllllllllllllllllllleeeeeeeeemmmm");
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:stadiumId", (req, res, next) => {
  const id = req.params.stadiumId;
  Stade.findById(id)
    .select('name price location capacity open_time close_time  _id')
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

router.patch("/:stadiumId", (req, res, next) => {
  const id = req.params.stadiumId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Stade.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Stadium updated',

      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:stadiumId", (req, res, next) => {
  const id = req.params.stadiumId;
  Stade.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Stadium deleted',

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