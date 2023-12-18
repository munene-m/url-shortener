import express from "express";
import {
  redirectToOriginal,
  shortenUrl,
} from "../controllers/shortenerController";
const router = express.Router();

router.route("/shorten").post(shortenUrl);
router.route("/:shortIdentifier").get(redirectToOriginal);

export default router;
