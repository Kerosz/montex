// services
import db from "@/lib/firebase-admin";
// types
import type { NextApiRequest, NextApiResponse } from "next";

export default async (_req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { docs } = await db.collection("sites").get();

  const sites = docs.map((doc) => ({ doc_id: doc.id, ...doc.data() }));

  if (sites.length > 0) {
    res.status(200).json(sites);
  } else {
    res.status(404).json({ error: "Nothing was found" });
  }
};
