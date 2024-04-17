const { Register } = require("../models/registerSchema");
const addUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUsername = await Register.findOne({ username });
        const existingEmail = await Register.findOne({ email });

        if (existingUsername) {
            return res.status(400).json({ error: "Username already exists"});
        }
        if (existingEmail) {
            return res.status(400).json({ error: "Email already exists. Use another email"});
        }

        const newUser = new Register({
            username,
            email,
            password
        });

        await newUser.save(); 
        // res.send("New user added Sucessfully",newUser);
        res.status(201).json(
            { message: 'New user added Sucessfully', user: newUser }
        );
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error"});
    }
};

const getUser = async (req, res) => {
    try {
        const users = await Register.find();
        res.status(200).json({
            users
        })
    }
    catch (error) {
        console.error("Fetching Data Error",error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

module.exports = {addUser,getUser};