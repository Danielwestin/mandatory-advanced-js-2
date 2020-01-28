import React from 'react';
import './App.css';
import {Route, BrowserRouter as Router} from 'react-router-dom'
import {HelmetProvider} from 'react-helmet-async'
import Addpage from './Addpage';
import Editpage from './Editpage';
import Detailspage from './Detailspage';
import Mainpage from './Mainpage';
import Header from './Header'



class App extends React.Component {
  render(){
    return (
      <>
      <HelmetProvider>
        <Router>
          <Header />
            <Route exact path="/" component={Mainpage}/>
            <Route path="/addpage" component={Addpage}/>
            <Route path="/editpage/:id" component={Editpage}/>
            <Route path="/detailspage/:id" component={Detailspage}/>
        </Router>
      </HelmetProvider>
      </>
    )
  }
}
export default App;
