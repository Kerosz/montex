// types
import type { AuthUser, RawRouteData, RouteData, RawSiteData, RawUser, SiteData } from "@/types";

/**
 * Function used to transform the raw authenticated user into a more usable user data
 *
 * @param rawUser Raw data for the user that is to be transformed
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

/**
 * Function used to transform raw form data for adding a new `site` to the accepted DB requirements.
 *
 * @param rawSite Raw data that is to be transformed
 * @param id ID to be used for the site
 * @param userId ID of the user that has been added the site
 */
export function transformRawSite(
  rawSite: RawSiteData,
  id: string | null,
  userId: string
): SiteData {
  const urlRegex = new RegExp("http(s)?(:)?(//)?", "g");
  const isUrl = urlRegex.test(rawSite.site_url);

  if (!isUrl) {
    rawSite.site_url = "https://" + rawSite.site_url;
  }

  // It will only not have an ID passed in when the function is used to generate temp data used for SWR mutation.
  if (!id) {
    id = "f33a6b44-f122-4528-9278-e146ba3f2832";
  }

  return {
    id,
    doc_id: id,
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
}

/**
 * Function used to transform raw form data for adding a new `route` to the accepted DB requirements.
 *
 * @param rawRoute Raw data that is to be transformed
 * @param id ID to be used for the route
 * @param siteId ID of the site that the route belongs to
 */
export function rawRouteTransform(
  rawRoute: RawRouteData,
  id: string | null,
  siteId: string
): RouteData {
  // It will only not have an ID passed in when the function is used to generate temp data used for SWR mutation.
  if (!id) {
    id = "b67c5796-9ff8-4809-a6e3-d0a683892669";
  }

  return {
    id,
    doc_id: id,
    site_id: siteId,
    ...rawRoute,
    created_at: Date.now(),
    updated_at: Date.now(),
  };
}
