import express from "express"

import register from "../controllers/register.controllers.js";

const router =express.Router();


router.post("/",register);

export default router;