const express =
  require("express");

const router =
  express.Router();

const storyController =
  require(
    "../controllers/storyController"
  );

const {

  protect,

} = require(
  "../middleware/authMiddleware"
);

const upload =
  require(
    "../middleware/upload"
  );



// ======================================================
// CREATE STORY
// ======================================================

router.post(

  "/create",

  protect,

  upload.fields([

    {

      name: "image",

      maxCount: 1,

    },

    {

      name: "thumbnail",

      maxCount: 1,

    },

  ]),

  storyController.createStory

);



// ======================================================
// EXPORT
// ======================================================

module.exports =
  router;