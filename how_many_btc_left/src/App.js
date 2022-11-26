import { useEffect, useState } from 'react';
import BitCoin from './pages/BitCoin';
import Canvas from './components/Canvas';

function App() {
  const [imgClicked, setImgClicked] = useState(false);
  return imgClicked ? <BitCoin /> : <Canvas setImgClicked={setImgClicked} />;
}

export default App;
