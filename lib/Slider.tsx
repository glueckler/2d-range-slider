import React, { useRef, useState } from 'react';
import useEvent from '@react-hook/event';
import {
  getCenterPixel,
  getNextHighAndLow,
  getPixelsFromLeftAndRight,
} from './Slider.helpers';
import { useContainerDimensions } from './useContainerDimensions';
import './slider.css';

// function usePrevious<T>(value: T): T {
//   const ref = useRef<T>(value);
//   useEffect(() => {
//     ref.current = value;
//   }, [value]);
//   return ref.current;
// }

const Slider: React.FC<ISliderProps> = ({ minValue = 60, maxValue = 180 }) => {
  const greyBarRef = useRef<HTMLDivElement | null>(null);
  const { width: greyBarWidth } = useContainerDimensions(greyBarRef);
  const ballRef = useRef<HTMLDivElement | null>(null);
  const { width: ballWidth } = useContainerDimensions(ballRef);

  const [currentLow, setCurrentLow] = useState<number>(70);
  const [currentHigh, setCurrentHigh] = useState<number>(80);
  const [initialLow, setInitialLow] = useState(currentLow);
  const [initialHigh, setInitialHigh] = useState(currentHigh);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [initialMouseClickX, setInitialMouseClickX] = useState<number | null>(
    null
  );
  const [initialMouseClickY, setInitialMouseClickY] = useState<number | null>(
    null
  );

  const [pixelsFromLeft, pixelsFromRight] = getPixelsFromLeftAndRight(
    greyBarWidth,
    minValue,
    maxValue,
    currentLow,
    currentHigh
  );

  const centerPixel = getCenterPixel(
    greyBarWidth,
    minValue,
    maxValue,
    currentLow,
    currentHigh
  );

  const setNextHighAndLow = (pageX: number, pageY: number): null => {
    if (!initialMouseClickX || !initialMouseClickY) return null;
    const [nextLow, nextHigh] = getNextHighAndLow(
      greyBarWidth,
      minValue,
      maxValue,
      initialLow,
      initialHigh,
      pageX - initialMouseClickX,
      initialMouseClickY - pageY
    );

    setCurrentHigh(nextHigh);
    setCurrentLow(nextLow);
    return null;
  };

  useEvent(document, 'mousemove', (e) => {
    const { pageX, pageY } = e;
    if (isClicked) {
      setNextHighAndLow(pageX, pageY);
    }
  });

  const handleMouseClick = (e: React.MouseEvent) => {
    const { pageX, pageY } = e;
    setInitialMouseClickX(pageX);
    setInitialMouseClickY(pageY);
    setInitialHigh(currentHigh);
    setInitialLow(currentLow);
    setIsClicked(true);
  };

  useEvent(document, 'mouseup', () => {
    if (isClicked) {
      setIsClicked(false);
    }
  });

  return (
    <>
      <div onMouseDown={handleMouseClick} className="slider-container">
        <div className="high-low-values">
          <span>{currentLow}</span>
          <span>{currentHigh}</span>
        </div>
        <div className="slider-bars">
          <div className="slider-greybar bar" ref={greyBarRef}></div>
          <div
            className="slider-bluebar bar"
            style={{ left: pixelsFromLeft, right: pixelsFromRight }}
          ></div>
          <div
            ref={ballRef}
            className="slider-ball"
            style={{ left: centerPixel - ballWidth / 2 }}
          ></div>
        </div>
      </div>
    </>
  );
};

interface ISliderProps {
  minValue: number;
  maxValue: number;
}

export default Slider;
