import { ReactNode } from "react";

// MdiEmailOutline
export default function EmailIcon(props: HTMLOrSVGElement): ReactNode {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 5l-8-5zm0 12H4V8l8 5l8-5z"
      ></path>
    </svg>
  );
}