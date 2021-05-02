// services
import db from "@/lib/firebase-admin";
// types
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { uid } = req.query;

  const { docs } = await db.collection("sites").where("user_id", "==", uid).get();

  const userSites = docs.map((doc) => ({ doc_id: doc.id, ...doc.data() }));

  if (userSites.length > 0) {
    res.status(200).json(userSites);
  } else {
    res.status(404).json([]);
  }
};
