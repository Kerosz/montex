// types
import type { AuthUser, RawSiteData, RawUser, SiteData } from "@/types";

/**
 * Function used to transform the raw authentificated user into a more usable user data
 */
export function transformRawUser(rawUser: RawUser): AuthUser {
  return {
    uid: rawUser.uid,
    username: (rawUser.displayName as string) || "name",
    email: rawUser.email as string,
    photo_url: (rawUser.photoURL as string) || "/photo",
    auth_provider: rawUser.providerData[0]?.providerId,
    jwt_token: rawUser.za,
    membership_plan: "hobby",
    created_at: Date.now(),
    updated_at: Date.now(),
  };
}

// TODO: Needs type improvements
export function transformRawSite(rawSite: RawSiteData, id: string | null = null, userId: string) {
  const urlRegex = new RegExp("http(s)?(:)?(//)?", "g");
  const isUrl = urlRegex.test(rawSite.site_url);

  if (!isUrl) {
    rawSite.site_url = "https://" + rawSite.site_url;
  }

  const siteData: Partial<SiteData> = {
    user_id: userId,
    name: rawSite.name.toLowerCase().trim(),
    url: rawSite.site_url.trim(),
    description: rawSite.description.trim(),
    comment_policy: "",
    nsfw_content: false,
    branding: true,
    created_at: Date.now(),
    updated_at: Date.now(),
  };

  if (id) {
    siteData.id = id;
    siteData.doc_id = id;
  }

  return siteData;
}
