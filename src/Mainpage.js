import React from 'react';
import './App.css';
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Helmet } from 'react-helmet';
import MaterialIcon from 'material-icons-react';
import Popup from './Popup';



class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      filter: "",
      deleteError: false,
      loadError: false,
    }
  }

  closePopup = () => {
    this.setState({deleteError: false,})
    this.getMovies();
  }

  componentDidMount = () => {
    this.getMovies();
  }

  filter = (e) => {
    e.preventDefault();
    this.setState({filter: e.target.value.toLowerCase()})
  }

  getMovies = () => {
    axios.get("http://3.120.96.16:3001/movies")
    .then(response => {
      this.setState({movies: response.data})
    })
    .catch(error => {
      this.setState({loadError: true,})
    })
  }


  render(){
    return (
      <>

      {
        this.state.deleteError ? <Popup closePopup={this.closePopup}/> : null
      }


        <Helmet>
          <title> Main </title>
        </Helmet>

          <div className="table-movies">
            <h1> Mainpage </h1>

          <div className="search-div">
          <form>
            <MaterialIcon color="#FFFFFF" icon="search"/>
            <input
              className="search-bar"
              placeholder="Search"
              type="text"
              onChange={this.filter}
            />
          </form>
          </div>

          <div className="table">
        <table>

          <thead>
            <tr>
              <th> Sumbitted by: </th>
              <th> Title:</th>
              <th> Director:</th>
              <th> Rating:</th>
            </tr>
          </thead>

          <tbody>
          {
          this.state.movies
          .filter(movie => {
            if (movie.title.toLowerCase().includes(this.state.filter)
             ||
                movie.director.toLowerCase().includes(this.state.filter)){
              return movie;
            }
          })
          .map(movie =>
            <tr key={movie.id}>
              <td className="libre"><div className="nacho"> </div></td>
              <td>
                <Link to={{
                  pathname:`/detailspage/${movie.id}`,
                  state: {
                    id: movie.id,
                    title: movie.title,
                    description: movie.description,
                    director: movie.director,
                    rating: movie.rating,
                  }}}>{movie.title}
                </Link>
              </td>

              <td>{movie.director}</td>
              <td>{movie.rating}</td>

              <td>
                <button>
                  <Link to={{
                    pathname:`/editpage/${movie.id}`,
                    state: {
                      title: movie.title,
                      description: movie.description,
                      director: movie.director,
                      rating: movie.rating,
                    }
                  }}>
                    <MaterialIcon color="#FFFFFF" icon="edit"/>
                  </Link>
                </button>
              </td>

              <td>
                <button
                  onClick={() => {axios.delete(`http://3.120.96.16:3001/movies/${movie.id}`)
                    .then(() => {
                      this.getMovies();
                    })
                    .catch(() => {
                      console.log("movie is already gone");
                      this.getMovies();
                    })
                  }}>
                  <MaterialIcon color="#FFFFFF" icon="delete_forever"/>
                </button>
              </td>
            </tr>
            )
          }
          </tbody>
        </table>

        {
          this.state.loadError ? <div className="load-error">
          <p>Something went Wrong</p>
          </div> : null
        }

        </div>
        </div>

      </>
      )
    }
  }
  export default Main;
