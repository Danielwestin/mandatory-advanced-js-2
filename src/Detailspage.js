import React from 'react';
import './App.css';
import {Route, BrowserRouter as Router, Link} from 'react-router-dom'
import { Helmet } from 'react-helmet';
import axios from 'axios';
import MaterialIcon, {colorPalette} from 'material-icons-react';


class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      movie: {
        title: '',
        description: '',
        director: '',
        rating: 0,
      },
      error: false
  }
}

componentDidMount = () => {
  this.initState();
}

  initState = () => {
    if (this.props.location.state !== undefined){
      this.setState({
        movie: {
          id: this.props.location.state.id,
          title: this.props.location.state.title,
          description: this.props.location.state.description,
          director: this.props.location.state.director,
          rating: this.props.location.state.rating,
        }
      })
    } else {
      axios.get(`http://3.120.96.16:3001/movies/${this.props.match.params.id}`)
        .then( response => {
          this.setState({
            movie: {
              id: response.data.id,
              title: response.data.title,
              description:  response.data.description,
              director: response.data.director,
              rating: response.data.rating,
            }
          })
      })
      .catch(()  => {
        this.setState({error: true,})
      })
    }
  }


  render() {
    let details;
    if (!this.state.error) {
      details = <>
        <button>
          <Link to={{
            pathname:`/editpage/${this.state.movie.id}`,
            state: {
              title: this.state.movie.title,
              description: this.state.movie.description,
              director: this.state.movie.director,
              rating: this.state.movie.rating,
            }
          }}>
            <MaterialIcon color="#FFFFFF" icon="edit"/>
          </Link>
        </button>
         <ul>
            <li> Title: {this.state.movie.title} </li>
            <li> Description: {this.state.movie.description} </li>
            <li> Director: {this.state.movie.director} </li>
            <li> Rating: {this.state.movie.rating} </li>
          </ul>
        </>;
    } else {
      details = <p className="edit-movie-no-id">No movie with this ID</p>;
    }

    return (
      <>
        <Helmet>
          <title> Details </title>
        </Helmet>

        <div className="details">
          <h1>Details</h1>
          <div className="details-list">
            {details}
          </div>
        </div>

      </>
    )
  }
}
export default Details;
