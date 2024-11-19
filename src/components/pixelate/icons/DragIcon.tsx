import type { ReactNode, SVGProps } from "react";

// AkarIconsDragVertical
export default function DragIcon(props: SVGProps<SVGSVGElement>): ReactNode {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <g strokeWidth={2}>
        <circle cx={8} cy={4} r={1} transform="rotate(90 8 4)"></circle>
        <circle cx={16} cy={4} r={1} transform="rotate(90 16 4)"></circle>
        <circle cx={8} cy={12} r={1} transform="rotate(90 8 12)"></circle>
        <circle cx={16} cy={12} r={1} transform="rotate(90 16 12)"></circle>
        <circle cx={8} cy={20} r={1} transform="rotate(90 8 20)"></circle>
        <circle cx={16} cy={20} r={1} transform="rotate(90 16 20)"></circle>
      </g>
    </svg>
  );
}
