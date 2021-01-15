// Write your "actions" router here!
const express = require("express");
const Actions = require("./actions-model");

const { checkId, checkPayload } = require("./actions.middleware");

const router = express.Router();

router.get("/", (req, res, next) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", checkId, (req, res, next) => {
  res.status(200).json(req.action);
});

router.post("/", checkPayload, (req, res, next) => {
  Actions.insert(req.action)
    .then((newAction) => {
      res.status(201).json(newAction);
    })
    .catch((err) => {
      next(err);
    });
});

router.put("/:id", checkId, checkPayload, (req, res, next) => {
  Actions.update(req.id, req.action)
    .then((updatedAction) => {
      res.status(201).json(updatedAction);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete("/:id", checkId, (req, res, next) => {
  Actions.remove(req.id)
    .then((numDeleted) => {
      res
        .status(201)
        .json({
          message: `Action with id: ${req.id} was successfully deleted.`,
        });
    })
    .catch((err) => {
      next(err);
    });
});

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message, stack: err.stack });
});

module.exports = router;
