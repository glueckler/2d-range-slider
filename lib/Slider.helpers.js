export const valuePerPixel = (barWidthInPixels, minValue, maxValue) => {
  return (maxValue - minValue) / barWidthInPixels;
};
export const nextUnboundedHighAndLow = (initLow, initHigh, deltaX, deltaY, valuePerPixel) => {
  let nextLow, nextHigh;
  nextLow = Math.floor(initLow + (deltaX - deltaY) * valuePerPixel);
  nextHigh = Math.floor(initHigh + (deltaX + deltaY) * valuePerPixel); // if the values cross over and the min is now larger than the max
  // use the middle value between them

  if (nextLow > nextHigh) {
    const midpoint = Math.floor(nextHigh + Math.abs(nextHigh - nextLow) / 2);
    nextLow = nextHigh = midpoint;
  }

  return [nextLow, nextHigh];
};
export const nextBoundedHighAndLow = (nextUnboundedLow, nextUnboundedHigh, minValue, maxValue) => {
  let nextLow = nextUnboundedLow;
  let nextHigh = nextUnboundedHigh;
  if (nextUnboundedLow < minValue) nextLow = minValue;
  if (nextUnboundedHigh < minValue) nextHigh = minValue;
  if (nextUnboundedLow > maxValue) nextLow = maxValue;
  if (nextUnboundedHigh > maxValue) nextHigh = maxValue;
  return [nextLow, nextHigh];
};
export const getNextHighAndLow = (barWidthInPixels, minValue, maxValue, initLow, initHigh, deltaX, deltaY) => {
  const [unboundedLow, unboundedHigh] = nextUnboundedHighAndLow(initLow, initHigh, deltaX, deltaY, valuePerPixel(barWidthInPixels, minValue, maxValue));
  return nextBoundedHighAndLow(unboundedLow, unboundedHigh, minValue, maxValue);
};
export const barWidth = (totalWidth, minValue, maxValue, lowValue, highValue) => {
  const vpp = valuePerPixel(totalWidth, minValue, maxValue);
  const width = (highValue - lowValue) / vpp;
  const widthAdjusted = 0.08 * Math.pow(width, 2) + 0.86 * width + 0.06;
  return Math.round(widthAdjusted);
};
export const midpointPixel = (totalWidth, minValue, maxValue, lowValue, highValue) => {
  const midpointValue = (highValue - lowValue) / 2 + lowValue;
  return midpointValue / valuePerPixel(totalWidth, minValue, maxValue);
};
export const getPixelsFromRight = (maxValue, highValue, valuePerPixel) => {
  return (maxValue - highValue) / valuePerPixel;
};
export const getPixelsFromLeft = (minValue, lowValue, valuePerPixel) => {
  return (lowValue - minValue) / valuePerPixel;
};
export const getPixelsFromLeftAndRight = (barWidth, minValue, maxValue, lowValue, highValue) => {
  const vpp = valuePerPixel(barWidth, minValue, maxValue);
  const pixelsFromRight = getPixelsFromRight(maxValue, highValue, vpp);
  const pixelsFromLeft = getPixelsFromLeft(minValue, lowValue, vpp);
  return [pixelsFromLeft, pixelsFromRight];
};
export const getCenterPixel = (barWidth, minValue, maxValue, lowValue, highValue) => {
  const vpp = valuePerPixel(barWidth, minValue, maxValue);
  return (lowValue + (highValue - lowValue) / 2 - minValue) / vpp;
};