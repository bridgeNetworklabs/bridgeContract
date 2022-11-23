import {
  formatBytes32String,

} from "ethers/lib/utils";

export const getIncentiveIdentifier = (incentive: string): string =>
  formatBytes32String(incentive);
