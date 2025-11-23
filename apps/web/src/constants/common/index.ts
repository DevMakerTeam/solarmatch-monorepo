import { BasicOption, RichOption } from "@repo/ui/select";
import {
  SOLAR_INSTALLATION_TYPES as SOLAR_INSTALLATION_TYPE_CONSTANTS,
  SOLAR_INSTALLATION_TYPE_LABELS,
  SOLAR_INSTALLATION_TYPE_DESCRIPTIONS,
  type SolarInstallationType,
  SOLAR_STRUCTURE_TYPE_LABELS,
} from "@repo/types";

export const SOLAR_INSTALLATION_TYPES: RichOption[] = (
  Object.values(SOLAR_INSTALLATION_TYPE_CONSTANTS) as SolarInstallationType[]
).map(value => ({
  value,
  title: SOLAR_INSTALLATION_TYPE_LABELS[value],
  description: SOLAR_INSTALLATION_TYPE_DESCRIPTIONS[value],
}));

export const SOLAR_STRUCTURE_TYPES: BasicOption[] = Object.entries(
  SOLAR_STRUCTURE_TYPE_LABELS
).map(([value, label]) => ({
  value,
  label,
}));
