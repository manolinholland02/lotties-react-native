import { hs } from "./scale";

const LOGO_BASE_WIDTH = 201;
const LOGO_ASPECT_RATIO = 101 / 201;

export const getLogoSize = (screenWidth: number) => {
  const logoWidth = hs(LOGO_BASE_WIDTH, screenWidth);
  const logoHeight = logoWidth * LOGO_ASPECT_RATIO;
  return { logoWidth, logoHeight };
};
