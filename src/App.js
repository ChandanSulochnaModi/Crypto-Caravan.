import './App.css';
import Coinpage from './Pages/Coinpage';
import Homepage from './Pages/Homepage';
import Alert from './components/Alert';
import Header from './components/Header';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';

function App() {
  return (
       <Router>
        <div className='App'style={{backgroundColor: "#14161a",
          color: "white",
          minHeight: "100vh",}}>
          <Header />
          <Routes>
          <Route path='/' Component={Homepage} exact />
          <Route path='/coins/:id' Component={Coinpage} exact />
          </Routes>
        </div>
        <Alert />
       </Router>
  );
}

export default App;
