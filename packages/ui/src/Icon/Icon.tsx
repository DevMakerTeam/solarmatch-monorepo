import { cn } from "@repo/utils";
import * as Icons from "./svgs";

import { IconProps } from "./types";

export default function Icon({ iconName, className, ...props }: IconProps) {
  const Component = Icons[iconName];

  return <Component className={cn(className)} {...props} />;
}
