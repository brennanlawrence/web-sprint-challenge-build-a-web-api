const Actions = require("./actions-model");
const Projects = require("../projects/projects-model");

function checkId(req, res, next) {
  const { id } = req.params;
  Actions.get(id)
    .then((action) => {
      if (!action) {
        res
          .status(404)
          .json({ message: `Action with id: ${id}, does not exist` });
      } else {
        req.action = action;
        req.id = id;
        next();
      }
    })
    .catch((err) => {
      next(err);
    });
}

function checkPayload(req, res, next) {
  const newAction = req.body;

  if (!newAction.project_id || !newAction.description || !newAction.notes) {
    res.status(400).json({
      message:
        "Oops, a new action requires a project_id, description, and notes.",
    });
  } else if (newAction.description.length > 128) {
    res.status(400).json({
      message:
        "Oops, a new action requires a description that has fewer than 128 characters.",
    });
  } else {
    Projects.get(newAction.project_id)
      .then((project) => {
        if (!project) {
          res.status(400).json({
            message: `Oops, project with project_id: ${newAction.project_id}, does not exist.`,
          });
        } else {
          req.action = newAction;
          next();
        }
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = {
  checkId,
  checkPayload,
};
