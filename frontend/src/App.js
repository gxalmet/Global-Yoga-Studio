import {   BrowserRouter} from 'react-router-dom';
import Router from './components/router/Router';
import MainNav from './components/mainnav/MainNav';


function App() {
 
    return (     
      <BrowserRouter>
         <div className="grid-container">
          <MainNav></MainNav>
          <main className="main">
              <div className="content">
                <Router></Router>
              </div>
          </main>
          <footer className="footer">All right reserved 2020.</footer>
        </div>
      </BrowserRouter>
    );
}

export default App;