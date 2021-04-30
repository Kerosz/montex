import type { SvgIcon } from "@/types";

export default function Github(props: SvgIcon) {
  return (
    <svg
      height="20"
      viewBox="0 0 20 20"
      width="20"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
      role="presentation"
      aria-label="github"
      {...props}
    >
      <path
        d="M20 3.924a8.212 8.212 0 01-2.357.646 4.111 4.111 0 001.804-2.27c-.792.47-1.67.812-2.605.996A4.103 4.103 0 009.85 7.038a11.645 11.645 0 01-8.458-4.287 4.118 4.118 0 00-.555 2.066 4.1 4.1 0 001.825 3.415 4.074 4.074 0 01-1.858-.513v.052a4.105 4.105 0 003.29 4.022 4.01 4.01 0 01-1.852.072 4.106 4.106 0 003.833 2.85A8.268 8.268 0 010 16.411a11.602 11.602 0 006.29 1.846c7.547 0 11.674-6.253 11.674-11.675 0-.18-.004-.355-.01-.53.8-.58 1.496-1.3 2.046-2.125"
        fill="#fff"
        fill-rule="evenodd"
      ></path>
    </svg>
  );
}
