const mongoose = require("mongoose");
const Shcema = mongoose.Shcema;

const UserShcema = new Shcema({
    googleID: {
        type: String,
        require: true
    }
    email: {
        type: String,
        require: true
    }
    firstName: {
        type: String,
    }
    lastName: {
        type: String,
    }
    image: {
        type: String,
    }
})

// Create collection and add schema
mongoose.model("users", UserShcema)