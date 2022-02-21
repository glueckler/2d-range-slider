import './App.css';
import Slider from './slider/Slider';

function App() {
  return (
    <div
      className="App"
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Slider minValue={60} maxValue={180} />
    </div>
  );
}

export default App;
