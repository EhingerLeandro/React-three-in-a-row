import './App.css';
import Game from './components/GameContainer/GameContainer'

function App() {
  return (
    <div className="App">
      
      <h3 className="title">
        Tic Tac Toe Game
      </h3>
      <div className="widerContainer">
        <Game/>
      </div>
    </div>
  );
}

export default App;
