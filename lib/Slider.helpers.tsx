export const valuePerPixel = (
  barWidthInPixels: number,
  minValue: number,
  maxValue: number
): number => {
  return (maxValue - minValue) / barWidthInPixels;
};

export const nextUnboundedHighAndLow = (
  initLow: number,
  initHigh: number,
  deltaX: number,
  deltaY: number,
  valuePerPixel: number
): [number, number] => {
  let nextLow, nextHigh;
  nextLow = Math.floor(initLow + (deltaX - deltaY) * valuePerPixel);
  nextHigh = Math.floor(initHigh + (deltaX + deltaY) * valuePerPixel);

  // if the values cross over and the min is now larger than the max
  // use the middle value between them
  if (nextLow > nextHigh) {
    const midpoint = Math.floor(nextHigh + Math.abs(nextHigh - nextLow) / 2);

    nextLow = nextHigh = midpoint;
  }

  return [nextLow, nextHigh];
};

export const nextBoundedHighAndLow = (
  nextUnboundedLow: number,
  nextUnboundedHigh: number,
  minValue: number,
  maxValue: number
): [number, number] => {
  let nextLow = nextUnboundedLow;
  let nextHigh = nextUnboundedHigh;
  if (nextUnboundedLow < minValue) nextLow = minValue;
  if (nextUnboundedHigh < minValue) nextHigh = minValue;
  if (nextUnboundedLow > maxValue) nextLow = maxValue;
  if (nextUnboundedHigh > maxValue) nextHigh = maxValue;
  return [nextLow, nextHigh];
};

export const getNextHighAndLow = (
  barWidthInPixels: number,
  minValue: number,
  maxValue: number,
  initLow: number,
  initHigh: number,
  deltaX: number,
  deltaY: number
): [number, number] => {
  const [unboundedLow, unboundedHigh] = nextUnboundedHighAndLow(
    initLow,
    initHigh,
    deltaX,
    deltaY,
    valuePerPixel(barWidthInPixels, minValue, maxValue)
  );
  return nextBoundedHighAndLow(unboundedLow, unboundedHigh, minValue, maxValue);
};

export const barWidth = (
  totalWidth: number,
  minValue: number,
  maxValue: number,
  lowValue: number,
  highValue: number
): number => {
  const vpp = valuePerPixel(totalWidth, minValue, maxValue);
  const width = (highValue - lowValue) / vpp;
  const widthAdjusted = 0.08 * Math.pow(width, 2) + 0.86 * width + 0.06;
  return Math.round(widthAdjusted);
};

export const midpointPixel = (
  totalWidth: number,
  minValue: number,
  maxValue: number,
  lowValue: number,
  highValue: number
): number => {
  const midpointValue = (highValue - lowValue) / 2 + lowValue;
  return midpointValue / valuePerPixel(totalWidth, minValue, maxValue);
};

export const getPixelsFromRight = (
  maxValue: number,
  highValue: number,
  valuePerPixel: number
): number => {
  return (maxValue - highValue) / valuePerPixel;
};

export const getPixelsFromLeft = (
  minValue: number,
  lowValue: number,
  valuePerPixel: number
): number => {
  return (lowValue - minValue) / valuePerPixel;
};

export const getPixelsFromLeftAndRight = (
  barWidth: number,
  minValue: number,
  maxValue: number,
  lowValue: number,
  highValue: number
): [number, number] => {
  const vpp = valuePerPixel(barWidth, minValue, maxValue);
  const pixelsFromRight = getPixelsFromRight(maxValue, highValue, vpp);
  const pixelsFromLeft = getPixelsFromLeft(minValue, lowValue, vpp);
  return [pixelsFromLeft, pixelsFromRight];
};

export const getCenterPixel = (
  barWidth: number,
  minValue: number,
  maxValue: number,
  lowValue: number,
  highValue: number
): number => {
  const vpp = valuePerPixel(barWidth, minValue, maxValue);
  return (lowValue + (highValue - lowValue) / 2 - minValue) / vpp;
};
