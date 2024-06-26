import { Router } from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = Router();
const PROJECTS_COLLECTION = db.collection("projects");

//Endpoint for getting list of projects

router.get("/", async (req, res) => {
  let results = await PROJECTS_COLLECTION.find({}).toArray();
  res.send(results).status(200);
});

//Endpoint for getting a single project by id
router.get("/:id", async (req, res) => {
  let query = { _id: new ObjectId(req.params.id) };
  let result = await PROJECTS_COLLECTION.findOne(query);

  !result ? res.send("Not found").status(404) : res.send(result).status(200);
});

//Endpoint for adding a single project
router.post("/", async (req, res) => {
  try {
    let newproject = {
      project: req.body.project,
      description: req.body.description,
    };
    let result = await PROJECTS_COLLECTION.insertOne(newproject);
    res.send(result).status(201);
  } catch (error) {
    console.error(error);
  }
});

//Endpoint for updating a project by id
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        project: req.body.project,
        description: req.body.description,
      },
    };

    let result = await PROJECTS_COLLECTION.updateOne(query, updates);
  } catch (error) {
    console.error(error);
  }
});

//Endpoint for deleting a project by id
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    let result = await PROJECTS_COLLECTION.deleteOne(query);
    res.send(result).status(200);
  } catch (error) {
    console.error(error);
  }
});
export default router;
