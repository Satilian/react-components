import React, {
  ChangeEvent,
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  SVGAttributes,
  useState,
} from "react";
import styles from "./styles.module.scss";

interface IProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  title?: string;
  error?: boolean;
}

type IconPropsType = DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement> & {
  title?: string;
  checked?: boolean;
};

export const ToggleIcon = ({ title, checked, ...props }: IconPropsType) => (
  <svg width="1em" height="1em" viewBox="0 0 24 15" {...props} xmlns="http://www.w3.org/2000/svg">
    <title>{title}</title>

    <filter id="blurMe">
      <feGaussianBlur stdDeviation="0.5" />
    </filter>

    <rect x="1" y="3" width="22" height="9" rx="4.5" fill={checked ? "currentColor" : "#ddd"} />
    <g>
      <circle r="6" cx={checked ? 17 : 7} cy="7.5" fill="grey" filter="url(#blurMe)" />
      <circle r="6" cx={checked ? 17 : 7} cy="7.5" fill="white" />
    </g>
  </svg>
);

export const Toggle = forwardRef<HTMLInputElement, IProps>(
  ({ className, style, onChange, title, checked, ...props }, ref) => {
    const [state, setState] = useState(checked || false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setState(e.currentTarget.checked);
      if (onChange) onChange(e);
    };

    return (
      <label className={styles.label}>
        <span>{title}</span>
        <input
          {...props}
          type="checkbox"
          ref={ref}
          checked={state}
          className={styles.input}
          onChange={handleChange}
        />
        <ToggleIcon
          title={title}
          style={style}
          className={`${className} ${styles.svg}`}
          checked={state}
        />
      </label>
    );
  }
);
