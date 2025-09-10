import { cn } from "@repo/utils";
import * as Icons from "./svgs";

import type { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  iconName: keyof typeof Icons;
}

export default function Icon({ iconName, className, ...props }: IconProps) {
  const Component = Icons[iconName];

  return <Component className={cn("fill-current", className)} {...props} />;
}
