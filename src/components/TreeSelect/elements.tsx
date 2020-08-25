import React, { DetailedHTMLProps, SVGAttributes } from "react";
import * as styles from "./styles.module.scss";

const CrossIcon = (props: DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 17 17" {...props} xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L16 16" stroke="currentColor" strokeLinecap="round" />
    <path d="M16 1L1 16" stroke="currentColor" strokeLinecap="round" />
  </svg>
);

export const Tag = ({ name, onClick }: { name: string; onClick?: () => void }) => (
  <div className={styles.tag} onClick={onClick} title={name}>
    <div>{name}</div>
    {!!onClick && (
      <div className={styles.tagIcon}>
        <CrossIcon />
      </div>
    )}
  </div>
);

export const ArrowIcon = (
  props: DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement>
) => (
  <svg
    height="1em"
    width="1em"
    viewBox="0 0 11 11"
    {...props}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeWidth="1.5" stroke="currentColor" d="m 1,3.3 4.5,4 4.5,-4" />
  </svg>
);

export const TriangleIcon = (
  props: DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement>
) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 20 20"
    fill="none"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.5547 8H13.7177C13.8276 8.00006 13.9351 8.0327 14.0264 8.0938C14.1178 8.15489 14.189 8.2417 14.2311 8.34326C14.2731 8.44482 14.2842 8.55657 14.2627 8.66438C14.2413 8.7722 14.1884 8.87125 14.1107 8.94901L10.5307 12.532C10.4261 12.6363 10.2844 12.6949 10.1367 12.6949C9.98899 12.6949 9.8473 12.6363 9.7427 12.532L6.1627 8.94901C6.08506 8.87131 6.03218 8.77235 6.01072 8.66463C5.98926 8.55691 6.00018 8.44525 6.04211 8.34373C6.08405 8.24222 6.15511 8.15538 6.24634 8.09421C6.33756 8.03303 6.44486 8.00026 6.5547 8Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.5"
    />
  </svg>
);

export const CheckboxIcon = ({
  selected,
}: { selected?: boolean } & DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
    <rect
      fill="none"
      strokeWidth="0.5"
      stroke="currentColor"
      rx="1.75"
      height="9.5"
      width="9.5"
      y="0.25"
      x="0.25"
    />
    {selected && (
      <rect
        x="2"
        y="2"
        width="6"
        height="6"
        rx="1.5"
        fill="currentColor"
        stroke="currentColor"
        id="rect2-8"
      />
    )}
  </svg>
);
