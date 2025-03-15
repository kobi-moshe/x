import React, { PropsWithChildren } from "react";
import { useSpring, animated } from "react-spring";

export const PulseAnimation: React.FC<PropsWithChildren> = ({ children }) => {
  const props = useSpring({
    from: { transform: "scale(1)" },
    to: { transform: "scale(1.05)" },
    config: { duration: 1000 },
    loop: { reverse: true },
  });

  return <animated.div style={{ ...props }}>{children}</animated.div>;
};
