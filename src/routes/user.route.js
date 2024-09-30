import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);


router.route("/h").get((req, res) => {
    res.status(200).json({
        message: "H1"
    })
})

export default router;