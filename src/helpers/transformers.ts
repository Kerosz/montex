// types
import type { AuthUser, RawUser } from "@/types";

/**
 * Function used to transform the raw authentificated user into a more usable user data
 */
export function transformRawUser(rawUser: RawUser): AuthUser {
  return {
    uid: rawUser.uid,
    username: rawUser.displayName as string,
    email: rawUser.email as string,
    photo_url: rawUser.photoURL as string,
    auth_provider: rawUser.providerData[0]?.providerId,
    membership_plan: "hobby",
    created_at: Date.now(),
    updated_at: Date.now(),
  };
}
