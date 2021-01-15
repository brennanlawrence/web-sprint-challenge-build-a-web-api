const Projects = require("./projects-model");

function checkId(req, res, next) {
  const { id } = req.params;
  Projects.get(id)
    .then((project) => {
      if (!project) {
        res
          .status(404)
          .json({ message: `Project with id: ${id}, does not exist` });
      } else {
        req.project = project;
        req.id = id;
        next();
      }
    })
    .catch((err) => {
      next(err);
    });
}

function checkPayload(req, res, next) {
  const newProject = req.body;

  if (!newProject.name || !newProject.description) {
    res.status(400).json({
      message: "Oops, a new project requires a name and description",
    });
  } else {
    req.project = newProject;
    next();
  }
}

module.exports = {
  checkId,
  checkPayload,
};
