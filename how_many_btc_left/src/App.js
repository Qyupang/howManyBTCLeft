import { useEffect, useState } from 'react';
import BitCoin from './pages/BitCoin';
import Dollar from './pages/Dollar';
import Canvas from './components/Canvas';

function App() {
  const [imgClicked, setImgClicked] = useState(0);
  switch (imgClicked) {
    case 0:
      return <Canvas setImgClicked={setImgClicked} />;
    case 1:
      return <BitCoin />;
    case 2:
      return <Dollar />;
    default:
      return <Canvas setImgClicked={setImgClicked} />;
  }
}

export default App;
