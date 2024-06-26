import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import skills from "./routes/skills.routes.js";
import experience from "./routes/experiences.routes.js";
import project from "./routes/projects.routes.js";
import achievement from "./routes/achievements.routes.js";
import blogs from "./routes/blogs.routes.js";

const PORT = process.env.PORT || 4000;

const app = express();
//use middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//load routes
app.use("/skills", skills);
app.use("/experience", experience);
app.use("/projects", project);
app.use("/achievement", achievement);
app.use("/blogs", blogs);
//start the server
app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
