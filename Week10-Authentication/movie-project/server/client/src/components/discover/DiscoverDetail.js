import React, { Component } from "react";
import MovieDetails from "../MovieDetails";
import * as actions from '../../actions';
import { connect } from "react-redux";

class DiscoverDetail extends Component {
  render() {    
    return (
      <MovieDetails 
        type={'movie'}
        movie={this.props.movie} 
        authenticated={this.props.authenticated} 
        addMovieToWatchList={this.props.addMovieToWatchList}
      />
    );
  }
}

function mapStateToProps({ movies, auth }, ownProps) {
  return {
    movie: movies[ownProps.match.params.id],
    authenticated: auth.authenticated,
  }
}

export default connect(
  mapStateToProps,
  actions
)(DiscoverDetail)