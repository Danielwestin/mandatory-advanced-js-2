import React from 'react';
import './App.css';
import {Route, BrowserRouter as Router, Link} from 'react-router-dom'
import Addpage from './Addpage';
import Editpage from './Editpage';
import Detailspage from './Detailspage';
import Mainpage from './Mainpage';
import Header from './Header'


class App extends React.Component {
  constructor(props) {
    super(props);
  }


  render(){
    return (
      <>
      <Router>
        <Header />
          <Route exact path="/" component={Mainpage}/>
          <Route path="/addpage" component={Addpage}/>
          <Route path="/editpage/:id" component={Editpage}/>
          <Route path="/detailspage/:id" component={Detailspage}/>
      </Router>
      </>
    )
  }
}
export default App;
