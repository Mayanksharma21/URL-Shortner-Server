import Router from "express";
import {
  handleAnalytics,
  handleGenerateNewShortUrl,
  handleRedirectUrl,
} from "../controllers/url.controller.js";

const router = Router();

router.route("/url").post(handleGenerateNewShortUrl);
router.route("/url/:shortID").get(handleRedirectUrl);
router.route("/url/analytics/:shortID").get(handleAnalytics);

export default router;
