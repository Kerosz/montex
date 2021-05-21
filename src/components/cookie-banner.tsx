// packages
import cn from "classnames";
import Cookie from "js-cookie";
import { useState } from "react";
// components
import Container from "@components/ui/container";
import Link from "@components/ui/link";
import Button from "@components/ui/button";
import Switch from "@components/ui/switch";

/**
 * Getting the default state for the banner from the cookies
 * If cookie returns a value we want to negate it in order to not show the banner
 */
const COOKIE_KEY = "__cpk_consent";
const DEFAULT_SHOW_STATE = !Cookie.get(COOKIE_KEY);

export default function CookieBanner() {
  const [showState, setShow] = useState(DEFAULT_SHOW_STATE);

  // Toggle switch states
  const [necessaryState] = useState<boolean>(true);
  const [analyticsState, setAnalytics] = useState<boolean>(true);
  const [marketingState, setMarketing] = useState<boolean>(false);

  const handleCookieConsent = (type?: "all") => {
    const consentSettings = {
      necessary: type === "all" ? true : necessaryState,
      analytics: type === "all" ? true : analyticsState,
      marketing: type === "all" ? true : marketingState,
    };

    Cookie.set(COOKIE_KEY, JSON.stringify(consentSettings), { expires: 365, secure: true });

    setShow(false);

    // Need to reload the page to get the new cookie settings
    window.location.reload();
  };

  const rootClass = cn(
    "left-0 bottom-0 w-full bg-white-normal py-9 shadow-xl border-t border-gray-300",
    {
      fixed: showState,
      hidden: !showState,
    }
  );

  return (
    <div className={rootClass}>
      <Container className="flex flex-col md:flex-row">
        <div className="pr-4 text-gray-700 flex-grow">
          <p className="pb-5">
            This website stores data such as cookies to enable necessary site functionality,
            including optional analytics and targeting. You may change your settings at any time or
            accept the default settings.{" "}
            <Link href="/legal/privacy-policy" className="text-secondary hover:underline" external>
              Privacy and Data Policy
            </Link>
          </p>

          <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
            <Switch label="Necessary" isChecked={necessaryState} setChecked={() => null} />
            <Switch label="Analytics" isChecked={analyticsState} setChecked={setAnalytics} />
            <Switch label="Marketing" isChecked={marketingState} setChecked={setMarketing} />
          </div>
        </div>

        <div className="flex md:justify-center min-w-[200px] md:max-w-[320px] w-full lg:space-x-6 space-x-4 mt-12 md:mt-0">
          <Button
            className="h-[fit-content]"
            variant="outlined"
            size="normal"
            onClick={() => handleCookieConsent()}
          >
            Save
          </Button>
          <Button
            className="h-[fit-content]"
            variant="primary"
            size="normal"
            onClick={() => handleCookieConsent("all")}
          >
            Accept All
          </Button>
        </div>
      </Container>
    </div>
  );
}
