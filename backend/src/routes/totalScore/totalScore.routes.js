import express from "express"
import getTotalScore from "../../controllers/totalscore/getTotalScore.js";


const router = express.Router();

router.get("/",getTotalScore);

export default router;