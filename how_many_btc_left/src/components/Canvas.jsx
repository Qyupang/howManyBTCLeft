import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';
import App from '../App';

let StyledCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
`;

let ImageCanvas = styled.canvas`
  position: absolute;
  top: 300px;
  left: 500px;
`;

const Canvas = () => {
  const [imgClicked, setImgClicked] = useState(false);
  const canvasRef = useRef(null); // useRef 사용
  const canvasRefImg = useRef(null);
  const contextRef = useRef(null); // 캔버스의 드로잉 컨텍스트를 참조

  const [ctx, setCtx] = useState(); // 캔버스의 드로잉 컨텍스트
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
    const imgCanvas = canvasRefImg.current;

    let cw = windowSize.width;
    let ch = windowSize.height;

    // 화면에 출력될 문자 리스트
    let charArr = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      'А',
      'В',
      'Г',
      'Д',
      'Є',
      'Ѕ',
      'З',
      'И',
      'Ѳ',
      'І',
      'К',
      'Л',
      'М',
      'Н',
      'Ѯ',
      'Ѻ',
      'П',
      'Ч',
      'Р',
      'С',
      'Т',
      'Ѵ',
      'Ф',
      'Х',
      'Ѱ',
      'Ѿ',
      'Ц',
    ];

    // 한번에 생성되는 흘러내리는 문자열 개수
    let maxCharCount = 100;
    let fallingCharArr = [];
    let fontSize = 15;
    let maxColumns = cw / fontSize;
    let frames = 0;

    canvas.width = cw;
    canvas.height = ch;

    const context = canvas.getContext('2d');
    const contextImg = imgCanvas.getContext('2d');
    let image = new Image();
    image.src = 'img/redPill.png';

    class FallingChar {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }

      draw(context) {
        this.value =
          charArr[
            Math.floor(Math.random() * (charArr.length - 1))
          ].toUpperCase();
        this.speed = (Math.random() * fontSize * -1) / 4 + (fontSize * 3) / 4;

        // 글작 색상
        context.fillStyle = 'rgba(0,255,0)';
        // 폰트 설정
        context.font = fontSize + 'px san-serif';
        // 텍스트 그리기
        context.fillText(this.value, this.x, this.y);
        this.y += this.speed;

        if (this.y > ch) {
          this.y = (Math.random() * ch) / 2 - 50;
          this.x = Math.floor(Math.random() * maxColumns) * fontSize;
          this.speed = (-Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;
        }
      }
    }

    let update = () => {
      if (fallingCharArr.length < maxCharCount) {
        let fallingChar = new FallingChar(
          Math.floor(Math.random() * maxColumns) * fontSize,
          (Math.random() * ch) / 2 - 50
        );
        fallingCharArr.push(fallingChar);
      }
      // 배경색
      context.fillStyle = 'rgba(0,0,0,0.05)';
      context.fillRect(0, 0, cw, ch);
      for (let i = 0; i < fallingCharArr.length && frames % 2 === 0; i++) {
        fallingCharArr[i].draw(context);
      }
      requestAnimationFrame(update);
      frames++;
    };

    update();

    image.onload = function () {
      contextImg.drawImage(image, 0, 0, 300, 150);
    };

    contextRef.current = context;

    setCtx(contextRef.current);
    return () => {
      // cleanup
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    const canvas = canvasRef.current;

    let cw = windowSize.width;
    let ch = windowSize.height;

    // 화면에 출력될 문자 리스트
    let charArr = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      'А',
      'В',
      'Г',
      'Д',
      'Є',
      'Ѕ',
      'З',
      'И',
      'Ѳ',
      'І',
      'К',
      'Л',
      'М',
      'Н',
      'Ѯ',
      'Ѻ',
      'П',
      'Ч',
      'Р',
      'С',
      'Т',
      'Ѵ',
      'Ф',
      'Х',
      'Ѱ',
      'Ѿ',
      'Ц',
    ];

    // 한번에 생성되는 흘러내리는 문자열 개수
    let maxCharCount = 100;
    let fallingCharArr = [];
    let fontSize = 15;
    let maxColumns = cw / fontSize;
    let frames = 0;

    canvas.width = cw;
    canvas.height = ch;

    const context = canvas.getContext('2d');
    class FallingChar {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }

      draw(context) {
        this.value =
          charArr[
            Math.floor(Math.random() * (charArr.length - 1))
          ].toUpperCase();
        this.speed = (Math.random() * fontSize * -1) / 4 + (fontSize * 3) / 4;

        // 글작 색상
        context.fillStyle = 'rgba(0,255,0)';
        // 폰트 설정
        context.font = fontSize + 'px san-serif';
        // 텍스트 그리기
        context.fillText(this.value, this.x, this.y);
        this.y += this.speed;

        if (this.y > ch) {
          this.y = (Math.random() * ch) / 2 - 50;
          this.x = Math.floor(Math.random() * maxColumns) * fontSize;
          this.speed = (-Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;
        }
      }
    }

    let update = () => {
      if (fallingCharArr.length < maxCharCount) {
        let fallingChar = new FallingChar(
          Math.floor(Math.random() * maxColumns) * fontSize,
          (Math.random() * ch) / 2 - 50
        );
        fallingCharArr.push(fallingChar);
      }
      // 배경색
      context.fillStyle = 'rgba(0,0,0,0.05)';
      context.fillRect(0, 0, cw, ch);
      for (let i = 0; i < fallingCharArr.length && frames % 2 === 0; i++) {
        fallingCharArr[i].draw(context);
      }
      requestAnimationFrame(update);
      frames++;
    };

    update();

    contextRef.current = context;

    setCtx(contextRef.current);
  }, [windowSize]);

  return imgClicked ? (
    <App />
  ) : (
    <div style={{ position: 'relative' }}>
      <StyledCanvas id="canvasTop" ref={canvasRef} />
      <ImageCanvas
        ref={canvasRefImg}
        style={{ top: windowSize.height / 2.2, left: windowSize.width / 2.8 }}
        onClick={() => setImgClicked(true)}
      />
    </div>
  );
};

export default Canvas;
