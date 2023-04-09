import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  WheelEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { HorizontalTrack } from "./HorizontalTrack";
import { VerticalTrack } from "./VerticalTrack";
import cn from "./style.module.scss";

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  children: ReactNode;
};

export const OutsideScroll = ({ children, ...props }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const trackVRef = useRef<HTMLDivElement>(null);
  const trackHRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState({ h: false, v: false });

  const handleScroll: WheelEventHandler<HTMLDivElement> = (e) => {
    const { scrollLeft, scrollTop } = e.currentTarget;

    e.currentTarget.scrollTo(
      e.shiftKey ? scrollLeft + e.deltaY : scrollLeft,
      e.shiftKey ? scrollTop : e.deltaY + scrollTop
    );
  };

  useEffect(() => {
    if (!ref.current) return;
    const { offsetHeight, offsetWidth, scrollHeight, scrollWidth } = ref.current;
    setScroll({ v: offsetHeight < scrollHeight, h: offsetWidth < scrollWidth });
  }, [children]);

  return (
    <div className={cn.wrapper}>
      <div
        {...props}
        className={`${cn.scrolled} ${props.className}`}
        ref={ref}
        onWheel={handleScroll}
      >
        {children}
      </div>

      {scroll.v && <VerticalTrack scrolled={ref.current} trackRef={trackVRef} />}

      {scroll.h && <HorizontalTrack scrolled={ref.current} trackRef={trackHRef} />}
    </div>
  );
};
