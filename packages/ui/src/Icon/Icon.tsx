import * as Icons from "./svgs";

import type { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  iconName: keyof typeof Icons;
}

export default function Icon({ iconName, ...props }: IconProps) {
  const Component = Icons[iconName];

  return <Component {...props} />;
}
