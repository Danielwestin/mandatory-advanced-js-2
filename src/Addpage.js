import React from 'react';
import './App.css';
import {Redirect} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios'


class Add extends React.Component {
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
      postError: false,
    }

  }

updateState = (e) => {
  this.setState({movie: {...this.state.movie,[e.target.id.split("-")[0]]: e.target.value}});
}

sendMovie = () => {
  axios.post("http://3.120.96.16:3001/movies", this.state.movie)
    .then(() => {
      this.setState({redirect: true})
    })
    .catch(() => {
      this.setState({postError: true})
    })
}


  render(){
    return (
      <>
        {
          this.state.redirect ? <Redirect to="/" /> : null
        }

      <Helmet>
      <title> Add </title>
      </Helmet>

        <div className="add-movie-background">

          <h1> Add a Movie </h1>

        <div className="input-movie">
          <div className="input-style">

              <form onSubmit={this.sendMovie}>
              <div className="form">
                <input
                 type="text"
                 id="title-input"
                 value={this.state.movie.title}
                 onChange={this.updateState}
                 required
                 name="title"
                 autoComplete="off"
                 minLength="1"
                 maxLength="40"
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
              value={this.state.movie.description}
              onChange={this.updateState}
              required
              name="description"
              autoComplete="off"
              minLength="1"
              maxLength="300"
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
              value={this.state.movie.director}
              onChange={this.updateState}
              required
              name="director"
              autoComplete="off"
              minLength="1"
              maxLength="40"
            />
            <label
              htmlFor="rating"
              className="label-name">
              <span className="content-name">Director</span>
            </label>
          </div>

          <br/>

          <div className="form number-form">
            <input
              type="number"
              id="rating-input"
              min="0.1"
              max="5.0"
              step="0.1"
              value={this.state.movie.rating}
              onChange={this.updateState}
              required
              name="rating"
              autoComplete="off"
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
              value="Add"
              onClick={this.sendMovie}
            />
          </div>

        </form>
        {
          this.state.postError ? <p className="wrong-input"> Wrong input </p> : null
        }
        </div>

        </div>

        </div>

      </>
    )
  }
}
export default Add;
