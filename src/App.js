import './App.css';
import './xbot.css'
import Chatbot from './xbot'

function App() {
  return (
    
    <div className="App">
      <div className="divi"><h1>x-Bot</h1></div>
       <header className="App-header">
        <div>
          <Chatbot />
        </div>      
        <div className="div-table">
              <table className="cmd-table">
                <thead>
                  <tr>
                    <th>Num</th>
                    <th>Type</th>
                    <th>Commandes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Salutation</td>
                    <td>bonjour | salut</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>Demander les nouvelles</td>
                    <td>ça va ? | comment allez-vous ?</td>
                  </tr>
                  <tr>
                    <td>3.</td>
                    <td>Demander le nom</td>
                    <td>quel est votre nom ? | comment vous vous appelez ?</td>
                    </tr>
                    <tr>
                    <td>4.</td>
                    <td>Demander leur rôle</td>
                    <td>quel est votre rôle ? | comment pouvez vous m'aidez</td>
                  </tr>
                  <tr>
                    <td>5.</td>
                    <td>Fin de conversation</td>
                    <td>au revoir | goodbye</td>
                  </tr>
                </tbody>
              </table>
        </div>  
       </header>
    </div>
  );
}

export default App;

