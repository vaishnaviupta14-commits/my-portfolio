const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Message = require("./models/Message");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/portfolioDB")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.post("/api/message", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                error: "All fields are required"
            });
        }

        const newMessage = new Message({
            name,
            email,
            message
        });

        await newMessage.save();

        res.status(201).json({
            success: true,
            message: "Message saved successfully"
        });

    } catch (error) {
        console.error(error); 
        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
