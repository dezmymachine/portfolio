import { Router } from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = Router();
const EXPERIENCES_COLLECTION = db.collection("experience");

//Endpoint for getting list of experiences

router.get("/", async (req, res) => {
  let results = await EXPERIENCES_COLLECTION.find({}).toArray();
  res.send(results).status(200);
});

//Endpoint for getting a single experience by id
router.get("/:id", async (req, res) => {
  let query = { _id: new ObjectId(req.params.id) };
  let result = await EXPERIENCES_COLLECTION.findOne(query);

  !result ? res.send("Not found").status(404) : res.send(result).status(200);
});

//Endpoint for adding a single experience
router.post("/", async (req, res) => {
  try {
    let newExperience = {
      role: req.body.role,
      years: req.body.years,
      organisation: req.body.organisation,
    };
    let result = await EXPERIENCES_COLLECTION.insertOne(newExperience);
    res.send(result).status(201);
  } catch (error) {
    console.error(error);
  }
});

//Endpoint for updating a experience by id
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        role: req.body.role,
        years: req.body.years,
        organisation: req.body.organisation,
      },
    };

    let result = await EXPERIENCES_COLLECTION.updateOne(query, updates);
    res.send(result).status(201);
  } catch (error) {
    console.error(error);
  }
});

//Endpoint for deleting a experience by id
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    let result = await EXPERIENCES_COLLECTION.deleteOne(query);
    res.send(result).status(200);
  } catch (error) {
    console.error(error);
  }
});
export default router;
