// packages
import firebase from "@/lib/firebase";
import { v4 as uuid } from "uuid";
// helpers
import { transformRawSite } from "@/helpers/transformers";
// types
import type { AuthUser, RawSiteData } from "@/types";

const _DB = firebase.firestore();

export async function getUserByUsername(
  username: string
): Promise<AuthUser | undefined> {
  const { docs } = await _DB
    .collection("users")
    .where("username", "==", username)
    .limit(1)
    .get();

  const [user] = docs.map((doc) => doc.data());

  return user as AuthUser;
}

export async function getUserByUserId(
  uid: string
): Promise<AuthUser | undefined> {
  // We can run this query because the uid is exactly the same with the docId for the 'users' collection according to the initial firestore design
  const doc = await _DB.collection("users").doc(uid).get();

  if (!doc.exists) return undefined;

  const user = doc.data();

  return user as AuthUser;
}

export async function createUser(uid: string, data: AuthUser): Promise<void> {
  return _DB.collection("users").doc(uid).set(data);
}

export async function createNewSite(
  rawData: RawSiteData,
  userId: string
): Promise<void> {
  const id = uuid();
  const newSite = transformRawSite(rawData, id, userId);

  return _DB.collection("sites").doc(id).set(newSite);
}
