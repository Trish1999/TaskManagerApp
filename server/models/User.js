const mongoose = require("mongoose")

const regEmailSchema = new mongoose.Schema({
  regEmail: {
    type: String,
  }
});

const taskSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    taskId: {
        type: mongoose.ObjectId,
    }
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    registeredEmail: {
        type: [regEmailSchema],
        required: false,
    },
    assignedTasks: {
        type: [taskSchema],
        required: false,
    }
},
    {
        timestamps: {
            createdAt: "createdAt", updatedAt: "updatedAt"
        }
    }
);
module.exports=mongoose.model("User",userSchema)