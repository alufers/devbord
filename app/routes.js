const routes = (module.exports = require("next-routes")());

routes.add("index", "/", "index");
routes.add("board", "/board/:id", "board");
