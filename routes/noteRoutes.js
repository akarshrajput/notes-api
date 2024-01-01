const express = require("express");
const noteController = require("./../controllers/noteController");
const authController = require("./../controllers/authController");
const router = express.Router();

router
  .route("/")
  .get(noteController.getAllNotes)
  .post(authController.protect, noteController.createNote);
router
  .route("/:id")
  .get(noteController.getNote)
  .patch(authController.protect, noteController.updateNote)
  .delete(authController.protect, noteController.deleteNote);

module.exports = router;
