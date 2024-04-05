import './App.css';
import { BrowserRouter } from 'react-router-dom'
import Main from './components/Main/Main';
import MyProvider from './contexts/MyProvider.js';

function App() {


  return (
    <MyProvider>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </MyProvider>

  );
}

export default App;
