// services
import { isDefined } from "@/helpers/assertions";
import db from "@/lib/firebase-admin";
// types
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const siteId = req.query.siteId as string;

  const { docs } = await db.collection("routes").where("site_id", "==", siteId).get();

  const routes = docs.map((doc) => ({ ...doc.data(), doc_id: doc.id }));

  if (routes) {
    res.status(200).json(routes);
  } else {
    res.status(404).json([]);
  }
};
