// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model");

const { checkId, checkPayload } = require("./projects-middleware");

const router = express.Router();

//PROJECTS

router.get("/", (req, res, next) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", checkId, (req, res, next) => {
  res.status(200).json(req.project);
});

router.post("/", checkPayload, (req, res, next) => {
  Projects.insert(req.project)
    .then((newProject) => {
      res.status(201).json(newProject);
    })
    .catch((err) => {
      next(err);
    });
});

router.put("/:id", checkId, checkPayload, (req, res, next) => {
  Projects.update(req.id, req.project)
    .then((updatedProject) => {
      res.status(201).json(updatedProject);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete("/:id", checkId, (req, res, next) => {
  Projects.remove(req.id)
    .then((numDeleted) => {
      res.status(201).json({
        message: `Action with id: ${req.id} was successfully deleted.`,
      });
    })
    .catch((err) => {
      next(err);
    });
});

//ACTIONS ASSOCIATED WITH PROJECTS

router.get("/:id/actions", checkId, (req, res, next) => {
  res.status(200).json(req.project.actions);
});

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message, stack: err.stack });
});

module.exports = router;
