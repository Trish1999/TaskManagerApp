const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  text: {
    type: String,
  },
  isChecked: {
    type:Boolean 
  }
});

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        priority: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        dueDate: {
            type: Date,
            required: false,
        },
        checklistItems: {
            type: [listSchema],
            required: false,
        },
        assignedTo: {
          type: String,
          requied:false,
        },
        refUserId: {
            type: mongoose.ObjectId,
        },
    },
    { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

module.exports = mongoose.model("Task", taskSchema);