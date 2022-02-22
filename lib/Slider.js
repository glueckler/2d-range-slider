import React, { useRef, useState } from 'react';
import useEvent from '@react-hook/event';
import { getCenterPixel, getNextHighAndLow, getPixelsFromLeftAndRight } from './Slider.helpers';
import { useContainerDimensions } from './useContainerDimensions';
import './slider.css'; // function usePrevious<T>(value: T): T {
//   const ref = useRef<T>(value);
//   useEffect(() => {
//     ref.current = value;
//   }, [value]);
//   return ref.current;
// }

const Slider = ({
  minValue = 60,
  maxValue = 180
}) => {
  const greyBarRef = useRef(null);
  const {
    width: greyBarWidth
  } = useContainerDimensions(greyBarRef);
  const ballRef = useRef(null);
  const {
    width: ballWidth
  } = useContainerDimensions(ballRef);
  const [currentLow, setCurrentLow] = useState(70);
  const [currentHigh, setCurrentHigh] = useState(80);
  const [initialLow, setInitialLow] = useState(currentLow);
  const [initialHigh, setInitialHigh] = useState(currentHigh);
  const [isClicked, setIsClicked] = useState(false);
  const [initialMouseClickX, setInitialMouseClickX] = useState(null);
  const [initialMouseClickY, setInitialMouseClickY] = useState(null);
  const [pixelsFromLeft, pixelsFromRight] = getPixelsFromLeftAndRight(greyBarWidth, minValue, maxValue, currentLow, currentHigh);
  const centerPixel = getCenterPixel(greyBarWidth, minValue, maxValue, currentLow, currentHigh);

  const setNextHighAndLow = (pageX, pageY) => {
    if (!initialMouseClickX || !initialMouseClickY) return null;
    const [nextLow, nextHigh] = getNextHighAndLow(greyBarWidth, minValue, maxValue, initialLow, initialHigh, pageX - initialMouseClickX, initialMouseClickY - pageY);
    setCurrentHigh(nextHigh);
    setCurrentLow(nextLow);
    return null;
  };

  useEvent(document, 'mousemove', e => {
    const {
      pageX,
      pageY
    } = e;

    if (isClicked) {
      setNextHighAndLow(pageX, pageY);
    }
  });

  const handleMouseClick = e => {
    const {
      pageX,
      pageY
    } = e;
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
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    onMouseDown: handleMouseClick,
    className: "slider-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "high-low-values"
  }, /*#__PURE__*/React.createElement("span", null, currentLow), /*#__PURE__*/React.createElement("span", null, currentHigh)), /*#__PURE__*/React.createElement("div", {
    className: "slider-bars"
  }, /*#__PURE__*/React.createElement("div", {
    className: "slider-greybar bar",
    ref: greyBarRef
  }), /*#__PURE__*/React.createElement("div", {
    className: "slider-bluebar bar",
    style: {
      left: pixelsFromLeft,
      right: pixelsFromRight
    }
  }), /*#__PURE__*/React.createElement("div", {
    ref: ballRef,
    className: "slider-ball",
    style: {
      left: centerPixel - ballWidth / 2
    }
  }))));
};

export default Slider;