// types
import type { AuthUser, RawSiteData, RawUser, SiteData } from "@/types";

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

// TODO: Needs type improvements
export function transformRawSite(
  rawSite: RawSiteData,
  id: string | null = null,
  userId: string
) {
  const siteData: Partial<Omit<SiteData, "doc_id">> = {
    user_id: userId,
    name: rawSite.name.toLowerCase(),
    url: rawSite.new_website,
    description: rawSite.description,
    created_at: Date.now(),
    updated_at: Date.now(),
  };

  if (id) {
    siteData.id = id;
  }

  return siteData;
}
