import { Router } from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = Router();
const ACHIEVEMENT_COLLECTION = db.collection("achievement");

//Endpoint for getting list of achievements

router.get("/", async (req, res) => {
  let results = await ACHIEVEMENT_COLLECTION.find({}).toArray();
  res.send(results).status(200);
});

//Endpoint for getting a single achievement by id
router.get("/:id", async (req, res) => {
  let query = { _id: new ObjectId(req.params.id) };
  let result = await ACHIEVEMENT_COLLECTION.findOne(query);

  !result ? res.send("Not found").status(404) : res.send(result).status(200);
});

//Endpoint for adding a single achievement
router.post("/", async (req, res) => {
  try {
    let newAchievement = {
      achievement: req.body.achievement,
      description: req.body.description,
    };
    let result = await ACHIEVEMENT_COLLECTION.insertOne(newAchievement);
    res.send(result).status(201);
  } catch (error) {
    console.error(error);
  }
});

//Endpoint for updating a achievement by id
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        achievement: req.body.achievement,
        description: req.body.description,
      },
    };

    let result = await ACHIEVEMENT_COLLECTION.updateOne(query, updates);
    res.send(result).status(201);
  } catch (error) {
    console.error(error);
  }
});

//Endpoint for deleting a achievement by id
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    let result = await ACHIEVEMENT_COLLECTION.deleteOne(query);
    res.send(result).status(200);
  } catch (error) {
    console.error(error);
  }
});
export default router;
