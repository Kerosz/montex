// services
import { isDefined } from "@/helpers/assertions";
import db from "@/lib/firebase-admin";
// types
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const siteId = req.query.siteId as string;

  if (isDefined(siteId)) {
    const doc = await db.collection("sites").doc(siteId).get();

    if (doc.exists) {
      const site = doc.data();

      res.status(200).json(site);
    } else {
      res.status(404).json({});
    }
  } else {
    res.status(500).json("error");
  }
};
