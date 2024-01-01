const Note = require("./../models/noteModel");

exports.getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find().populate("author");
    res.status(200).json({
      status: "success",
      results: notes.length,
      data: {
        notes,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

exports.getNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id).populate("author");
    res.status(200).json({
      status: "success",
      data: {
        note,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: "Can't find note",
    });
  }
};

exports.createNote = async (req, res, next) => {
  try {
    const newNote = await Note.create({
      title: req.body.title,
      content: req.body.content,
      author: req.user._id, // Use the ID of the authenticated user
    });

    res.status(201).json({
      status: "success",
      data: {
        data: newNote,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.updateNote = async (req, res, next) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedNote) {
      return res.status(404).json({
        status: "error",
        message: "Note not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        data: updatedNote,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

exports.deleteNote = async (req, res, next) => {
  const note = await Note.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: "null",
  });
};
