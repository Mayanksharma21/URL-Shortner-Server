import { nanoid } from "nanoid";
import { URL } from "../models/url.model.js";

async function handleGenerateNewShortUrl(req, res) {
  try {
    const body = req.body;

    if (!body.url) {
      return res
        .status(400)
        .json({ success: false, message: "URL is required" });
    }

    const shortID = nanoid(8);
    await URL.create({
      shortId: shortID,
      redirectUrl: body.url,
      visitHistory: [],
    });

    return res.status(201).json({ success: true, shortId: shortID });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
}

async function handleRedirectUrl(req, res) {
  try {
    const shortID = req.params.shortID;

    if (!shortID) {
      return res
        .status(400)
        .json({ success: false, message: "Short ID is required" });
    }

    const urlData = await URL.findOneAndUpdate(
      {
        shortId: shortID,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );

    if (!urlData) {
      return res.status(404).json({ success: false, message: "URL not found" });
    }

    res.redirect(urlData.redirectUrl);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return; // Return to prevent further execution of the function. This is a best practice to avoid unnecessary errors.
  }
}

async function handleAnalytics(req, res) {
  try {
    const shortID = req.params.shortID;

    if (!shortID) {
      return res
        .status(400)
        .json({ success: false, message: "Short ID is required" });
    }

    const urlData = await URL.findOne({ shortId: shortID });

    if (!urlData) {
      return res.status(404).json({ success: false, message: "URL not found" });
    }

    res.status(200).json({
      success: true,
      totalClicks: urlData.visitHistory.length,
      analytics: urlData.visitHistory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
}

export { handleGenerateNewShortUrl, handleRedirectUrl, handleAnalytics };
