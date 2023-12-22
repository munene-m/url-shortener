import express from "express";
import { getOriginal, shortenUrl } from "../controllers/shortenerController";
const router = express.Router();

router.route("/shorten").post(shortenUrl);
router.route("/:shortIdentifier").get(getOriginal);

export default router;
