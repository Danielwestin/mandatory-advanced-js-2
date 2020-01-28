import React from 'react';
import './App.css';
import {Redirect} from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios'
import Popup from './Popup'


class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      movie: {
        title: '',
        description: '',
        director: '',
        rating: null,
      },
      redirect: false,
      sendError: false,
      stupidPeopleError: false,
    }
  }

  closePopup = () => {
    this.setState({sendError: false,
    redirect: true,})
  }

  componentDidMount = () =>{
        this.initState();
    }



  updateMovie = () => {
    axios.put(`http://3.120.96.16:3001/movies/${this.props.match.params.id}`, this.state.movie)
      .then(() => {
        this.setState({redirect: true})
      })
      .catch(error => {
        this.setState({sendError: true})
      })
  }

  updateState = (e) => {
    this.setState({
      movie: {...this.state.movie, [e.target.id.split("-")[0]]: e.target.value}
    })
  }

  initState = () => {
    if (this.props.location.state !== undefined){
      this.setState({
        movie: {
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
              title: response.data.title,
              description:  response.data.description,
              director: response.data.director,
              rating: response.data.rating,
            }
          })
      })
      .catch (error => {
        this.setState({stupidPeopleError: true,})
      })
    }
  }




  render(){
    let editMovie;
    if (!this.state.stupidPeopleError){
      editMovie =
      <>
      <form onSubmit={this.updateMovie}>

        <div className="form">
          <input
           type="text"
           id="title-input"
           minLength="1"
           maxLength="40"
           placeholder="Title"
           value={this.state.movie.title}
           onChange={this.updateState }
          />
          <label
            htmlFor="rating"
            className="label-name">
            <span className="content-name">Title</span>
          </label>
        </div>

        <br/>

        <div className="form">
          <input
            type="text"
            id="description-input"
            minLength="1"
            maxLength="300"
            placeholder="Description"
            value={this.state.movie.description}
            onChange={this.updateState}
          />
          <label
            htmlFor="rating"
            className="label-name">
            <span className="content-name">Description</span>
          </label>
        </div>

        <br/>

        <div className="form">
          <input
            type="text"
            id="director-input"
            minLength="1"
            maxLength="40"
            placeholder="Director"
            value={this.state.movie.director}
            onChange={this.updateState}
          />
          <label
            htmlFor="rating"
            className="label-name">
            <span className="content-name">Director</span>
          </label>
        </div>

        <br/>

        <div className="form">
          <input
            type="number"
            id="rating-input"
            min="0.0"
            max="5.0"
            step="0.1"
            value={this.state.movie.rating}
            onChange={this.updateState}
          />
          <label
            htmlFor="rating"
            className="label-name">
            <span className="content-name">Rating</span>
          </label>
        </div>

        <br/>

        <div className="add-button">
          <input
            type="button"
            value="Change"
            onClick={this.updateMovie}
          />
        </div>
      </form>
      </>
    } else {
      editMovie = <p className="edit-movie-no-id">No movie with this ID</p>
    }
    return (
      <>
        {
          this.state.redirect ? <Redirect to="/" /> : null
        }
        {
          this.state.sendError ? <Popup closePopup={this.closePopup}/> : null
        }

        <Helmet>
        <title> Edit </title>
        </Helmet>

        <div className="add-movie-background">

          <h1> Edit Movie </h1>

        <div className="input-movie">
          <div className="input-style">
            {editMovie}
        </div>
        </div>
        </div>
      </>
    )
  }
}
export default Edit;
