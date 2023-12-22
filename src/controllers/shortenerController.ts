import { Request, Response } from "express";
import validUrl from "valid-url";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";
const prisma = new PrismaClient();

interface ShortenUrlRequest {
  url: string;
}
const CLIENT_URL = process.env.CLIENT_URL;

export const shortenUrl = async (req: Request, res: Response) => {
  const { url } = req.body as ShortenUrlRequest;

  if (!validUrl.isHttpsUri(url)) {
    return res.status(400).json({ error: "Invalid URL format" });
  }

  const shortIdentifier = nanoid(7);
  const shortUrl = `${CLIENT_URL}/url/${shortIdentifier}`;

  const createdUrl = await prisma.url.create({
    data: {
      originalUrl: url,
      shortUrl,
    },
  });
  res.status(200).json({ shortUrl: createdUrl.shortUrl });
};

export const getOriginal = async (req: Request, res: Response) => {
  const { shortIdentifier } = req.params;
  try {
    const url = await prisma.url.findFirst({
      where: {
        shortUrl: `${CLIENT_URL}/url/${shortIdentifier}`,
      },
    });
    if (!url) {
      return res.status(404).json({ message: "Short url not found" });
    }
    res.status(200).json({ originalUrl: url.originalUrl });
    // res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
