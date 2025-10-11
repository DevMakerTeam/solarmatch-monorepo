import { SVGProps } from "react";
import * as Icons from "../svgs";

export interface IconProps extends SVGProps<SVGSVGElement> {
  iconName: keyof typeof Icons;
}
