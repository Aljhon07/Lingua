export const convertRgbToRgba = (rgb, alpha) => {
  return rgb.replace("rgb", "rgba").replace(")", `, ${alpha})`)
}
