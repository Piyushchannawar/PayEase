import express from 'express';
import zod from 'zod';
import User from '../modal/db.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const router = express.Router();

const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}

router.post("/signup", async (req, res) => {
  try {
    const parseResult = signupBody.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: parseResult.error.errors,
      });
    }

    const { username, firstName, lastName, password } = parseResult.data;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already taken",
      });
    }

    const user = await User.create({ username, password, firstName, lastName });
    const userId = user._id;

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({
      message: "User created successfully",
      token,
    });
  } catch (error) {
    console.error("Error in signup route:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});



const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})


router.post("/signin",async(req,res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})






export default router;
