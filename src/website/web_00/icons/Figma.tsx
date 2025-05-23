import type { SVGProps, ReactNode } from "react";

// SkillIconsFigmaDark
export function FigmaIcon(props: SVGProps<SVGSVGElement>): ReactNode {
  return (
    <svg viewBox="0 0 256 256" {...props}>
      <g fill="none">
        <rect width={256} height={256} fill="#242938" rx={60}></rect>
        <g clipPath="url(#skillIconsFigmaDark0)">
          <path
            fill="#0acf83"
            d="M94.347 228c18.4 0 33.333-14.933 33.333-33.333v-33.334H94.347c-18.4 0-33.334 14.934-33.334 33.334S75.947 228 94.347 228"
          ></path>
          <path
            fill="#a259ff"
            d="M61.013 128c0-18.4 14.934-33.333 33.334-33.333h33.333v66.666H94.347c-18.4 0-33.334-14.933-33.334-33.333"
          ></path>
          <path
            fill="#f24e1e"
            d="M61.013 61.333C61.013 42.933 75.947 28 94.347 28h33.333v66.667H94.347c-18.4 0-33.334-14.934-33.334-33.334"
          ></path>
          <path
            fill="#ff7262"
            d="M127.68 28h33.333c18.4 0 33.334 14.933 33.334 33.333s-14.934 33.334-33.334 33.334H127.68z"
          ></path>
          <path
            fill="#1abcfe"
            d="M194.347 128c0 18.4-14.934 33.333-33.334 33.333S127.68 146.4 127.68 128s14.933-33.333 33.333-33.333S194.347 109.6 194.347 128"
          ></path>
        </g>
        <defs>
          <clipPath id="skillIconsFigmaDark0">
            <path fill="#fff" d="M61 28h133.36v200H61z"></path>
          </clipPath>
        </defs>
      </g>
    </svg>
  );
}
