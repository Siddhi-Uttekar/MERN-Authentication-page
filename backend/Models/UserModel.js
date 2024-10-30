const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({

    email:{
        type: String,
        required: [true, "your, email address is required"],
        unique:true,
    },

    username:{
        type: String,
        required:[true, "your, username is required"],
    },

    password: {
        type: String,
        required: [true, "Your password is required"],
      },

      createdAt: {
        type: Date,
        default: new Date(),
      },
})

//prev - middleware func comes from mongoose
userSchema.pre("save", async function(next) {
    this.password = await bcrypt.hash(this.password, 12);  //here 12 is cost factor/ salt rounds

    next();
})

module.exports = mongoose.model("User", userSchema);