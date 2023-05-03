import './styles/App.css'
import './styles/xbot.css'
import Chatbot from './xbot'
// import imgAnim from './animations/particles.js'

function App() {
  return (
    
    <div className="App">
      <div className="divi"><h1>x-Bot</h1></div>
       <header className="App-header">
        <div>
          <Chatbot />
        </div> 
        <p>Vas-y !<br/>
        Je suis votre assistant.
        </p>
       </header>
    </div>
  );
}

export default App;

