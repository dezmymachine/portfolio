import { Router } from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";
import multer from "multer";

const router = Router();
const BLOGS_COLLECTION = db.collection("blogs");
const imageUpload = multer({ dest: "uploads/images" });

//Endpoint for getting list of blogs

router.get("/", async (req, res) => {
  let results = await BLOGS_COLLECTION.find({}).toArray();
  res.send(results).status(200);
});

//Endpoint for getting a single blog by id
router.get("/:id", async (req, res) => {
  let query = { _id: new ObjectId(req.params.id) };
  let result = await BLOGS_COLLECTION.findOne(query);

  !result ? res.send("Not found").status(404) : res.send(result).status(200);
});

//Endpoint for adding a single blog
router.post("/", async (req, res) => {
  try {
    let newblog = {
      title: req.body.title,
      blogcontent: req.body.blogcontent,
      date: req.body.date,
      image: req.file.image,
    };
    let result = await BLOGS_COLLECTION.insertOne(newblog);
    res.send(result).status(201);
  } catch (error) {
    console.error(error);
  }
});

//Endpoint for updating a blog by id
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        title: req.body.blog,
        blogcontent: req.body.blogcontent,
        date: req.body.date,
        image: req.body.path,
      },
    };

    let result = await BLOGS_COLLECTION.updateOne(query, updates);
    res.send(result).status(201);
  } catch (error) {
    console.error(error);
  }
});

//Endpoint for deleting a blog by id
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    let result = await BLOGS_COLLECTION.deleteOne(query);
    res.send(result).status(200);
  } catch (error) {
    console.error(error);
  }
});
export default router;
