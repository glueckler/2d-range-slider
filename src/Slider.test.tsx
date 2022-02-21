import React from 'react';

import {
  valuePerPixel,
  nextUnboundedHighAndLow,
  nextBoundedHighAndLow,
  getNextHighAndLow,
  getPixelsFromRight,
  getPixelsFromLeft,
  getCenterPixel,
} from './slider/Slider.helpers';

describe('Slider.helpers', () => {
  describe(valuePerPixel.name, () => {
    it('Should give the correct value represented by each pixel', () => {
      const barWidth = 150;
      const minValue = 50;
      const maxValue = 200;
      expect(valuePerPixel(barWidth, 50, 200)).toEqual(1);
    });
  });
  describe(nextUnboundedHighAndLow.name, () => {
    describe('with 1 to 1 values per pixel', () => {
      const initLow = 50;
      const initHigh = 100;
      const valuePerPixel = 1;
      it('Is accurate when only the DeltaX has changed', () => {
        const deltaX = 20;
        const deltaY = 0;
        expect(
          nextUnboundedHighAndLow(
            initLow,
            initHigh,
            deltaX,
            deltaY,
            valuePerPixel
          )
        ).toEqual([70, 120]);
      });
      it('Is accurate when only the DeltaY has changed', () => {
        const deltaX = 0;
        const deltaY = 10;
        expect(
          nextUnboundedHighAndLow(
            initLow,
            initHigh,
            deltaX,
            deltaY,
            valuePerPixel
          )
        ).toEqual([40, 110]);
      });
      it('Corrects min and max values if they get inverted', () => {
        const deltaX = 0;
        const deltaY = -75;
        expect(
          nextUnboundedHighAndLow(
            initLow,
            initHigh,
            deltaX,
            deltaY,
            valuePerPixel
          )
        ).toEqual([75, 75]);
      });
    });
    describe('WITHOUT 1 to 1 values per pixel', () => {
      const initLow = 50;
      const initHigh = 100;
      const valuePerPixel = 1.5;
      it('Is accurate when only the DeltaX has changed', () => {
        const deltaX = 20;
        const deltaY = 0;
        expect(
          nextUnboundedHighAndLow(
            initLow,
            initHigh,
            deltaX,
            deltaY,
            valuePerPixel
          )
        ).toEqual([80, 130]);
      });
      it('Is accurate when only the DeltaY has changed', () => {
        const deltaX = 0;
        const deltaY = 10;
        expect(
          nextUnboundedHighAndLow(
            initLow,
            initHigh,
            deltaX,
            deltaY,
            valuePerPixel
          )
        ).toEqual([35, 115]);
      });
      it('Corrects min and max values if they get inverted', () => {
        const deltaX = 0;
        const deltaY = -75;
        expect(
          nextUnboundedHighAndLow(
            initLow,
            initHigh,
            deltaX,
            deltaY,
            valuePerPixel
          )
        ).toEqual([74, 74]);
      });
    });
  });
  describe(nextBoundedHighAndLow.name, () => {
    it('Corrects values that are out of bounds', () => {
      expect(nextBoundedHighAndLow(30, 150, 10, 100)).toEqual([30, 100]);
      expect(nextBoundedHighAndLow(120, 150, 10, 100)).toEqual([100, 100]);
      expect(nextBoundedHighAndLow(-20, 150, 10, 100)).toEqual([10, 100]);
      expect(nextBoundedHighAndLow(-20, 5, 10, 100)).toEqual([10, 10]);
    });
  });
  describe(getNextHighAndLow.name, () => {
    describe('works with human readable values', () => {
      const barWidthInPixels = 150;
      const minValue = 0;
      const maxValue = 150;
      const initLow = 20;
      const initHigh = 50;
      const deltaX = 10;
      const deltaY = 5;
      expect(
        getNextHighAndLow(
          barWidthInPixels,
          minValue,
          maxValue,
          initLow,
          initHigh,
          deltaX,
          deltaY
        )
      ).toEqual([25, 65]);
    });
  });

  describe(getPixelsFromRight.name, () => {
    it('works with simple numbers', () => {
      const maxValue = 150;
      const highValue = 100;
      const valuePerPix = 1;
      expect(getPixelsFromRight(maxValue, highValue, valuePerPix)).toEqual(50);
    });
  });

  describe(getPixelsFromLeft.name, () => {
    it('works with simple numbers', () => {
      const minValue = 50;
      const lowValue = 100;
      const valuePerPix = 1;
      expect(getPixelsFromLeft(minValue, lowValue, valuePerPix)).toEqual(50);
    });
  });

  describe(getCenterPixel.name, () => {
    it('works with simple numbers', () => {
      const minValue = 50;
      const maxValue = 250;
      const lowValue = 100;
      const highValue = 200;
      const barWidth = 200;
      expect(
        getCenterPixel(barWidth, minValue, maxValue, lowValue, highValue)
      ).toEqual(100);
    });
  });
});
