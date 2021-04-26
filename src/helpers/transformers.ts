// types
import type { AuthUser, RawUser } from "@/types";

/**
 * Function used to transform the raw authentificated user into a more usable user data
 */
export function transformRawUser(rawUser: RawUser): AuthUser {
  return {
    uid: rawUser.uid,
    username: rawUser.displayName,
    email: rawUser.email,
    photo_url: rawUser.photoURL,
    auth_provider: rawUser.providerData[0]?.providerId,
  };
}
