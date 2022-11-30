import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';

let Canvas = styled.canvas`
  background-color: black;
  position: absolute;
  top: 0;
  left: 0;
`;

const Loading = () => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = debounce(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, 1000);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    const canvas = canvasRef.current;

    let cw = windowSize.width;
    let ch = windowSize.height;

    const sin = Math.sin;
    const cos = Math.cos;
    const PI = Math.PI;
    const fov = 150;

    class Dot {
      constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
      }
    }

    let context;
    let tempx, tempy, tempz;
    let dots = [];
    let dotsLength = (cw + ch) / 1;

    function setSize() {
      canvas.width = cw;
      canvas.height = ch;
      initDots();
      context.fillStyle = 'silver';
      if (cw < 800) {
        context.globalAlpha = 0.3;
      } else {
        context.globalAlpha = 0.8;
      }
    }

    function initDots() {
      dots = [];
      dotsLength = (cw + ch) / 1;
      let x, y, z;
      for (let i = 0; i < dotsLength; i++) {
        x = Math.random() * cw - cw / 2;
        y = Math.random() * ch - ch / 2;
        z = Math.random() * cw - cw / 2;
        dots.push(new Dot(x, y, z));
      }
    }

    function drawDots(dot) {
      let scale, x2d, y2d;
      scale = fov / (fov + dot.z);
      x2d = dot.x * scale + cw / 2;
      y2d = dot.y * scale + ch / 2;
      context.fillRect(x2d, y2d, scale * 4, scale * 3);
    }

    function render() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      let dot;
      for (let i = 0; i < dots.length; i++) {
        dot = dots[i];
        dot.z -= 4;
        if (dot.z < -fov) {
          dot.z += (cw + ch) / 2;
        }
        drawDots(dot);
      }
      requestAnimationFrame(render);
    }

    function init() {
      context = canvas.getContext('2d');
      setSize();
      render();
    }

    // addEventListener('resize', setSize);
    init();
  }, []);

  return <Canvas ref={canvasRef} />;
};

export default Loading;
