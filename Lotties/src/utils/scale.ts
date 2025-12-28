import { Dimensions } from "react-native";

const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;


// Horizontal scale relative to the 393px Figma width.
export const hs = (size: number, screenWidth = Dimensions.get("window").width) =>
  (screenWidth / BASE_WIDTH) * size;

// Vertical scale relative to the 852px Figma height.
export const vs = (size: number, screenHeight = Dimensions.get("window").height) =>
  (screenHeight / BASE_HEIGHT) * size;

// Moderate scale: blends the base size with scaled size for less aggressive resizing.
export const ms = (size: number, factor = 0.5, screenWidth?: number) => {
  const scaled = hs(size, screenWidth);
  return size + (scaled - size) * factor;
};
