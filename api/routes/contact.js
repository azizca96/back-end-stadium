const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Contact = require("../models/contact").Contact;
const Stade = require("../models/stade").Stade;
const User = require("../models/user").User;

router.get("/", (req, res, next) => {
  Contact.find()
    .select("date  stat match_date _id")
    //.populate("_id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        contacts: docs.map(doc => {
          return {
            date:doc.date,
            stat:doc.stat,
            match_date:doc.match_date,
            _id_stade:doc.stade,
            _id_user:doc.user,
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
  Stade.findById(req.body.stadeId)
  User.findById(req.body.userId)
  console.log(req.body);
  const contact = new Contact({
    _id: new mongoose.Types.ObjectId(),
   stade:req.body.stadeId,
    user:req.body.userId,
    date:req.body.date,
   match_date:req.body.match_date,
    stat:req.body.stat,

  });
  
  
  contact
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created contact successfully",
        createdContact: {
            date:result.date,
            match_date:result.match_date,
            stat:result.stat,
            _id: result._id,
            _id_stade:result.stade,
            _id_user:result.user

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

router.get("/:contactId", (req, res, next) => {
  const id = req.params.contactId;
  Contact.findById(id)
    .select('date  stat match_date  _id')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            contact: doc,

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

router.patch("/:contactId", (req, res, next) => {
  const id = req.params.contactId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Contact.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Contact updated',

      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:contactId", (req, res, next) => {
  const id = req.params.contactId;
  Contact.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Contact deleted',

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