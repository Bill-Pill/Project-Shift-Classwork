import React, { Component } from "react";
import MovieDetails from "../MovieDetails";
import * as actions from '../../actions';
import { connect } from "react-redux";

class WatchListDetail extends Component {
  render() {
    return (
      <MovieDetails
        type={'watchList'}
        movie={this.props.movie}
        authenticated={this.props.authenticated}
        addMovieToWatchList={this.props.addMovieToWatchList}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {  
  console.log(state)
  
  return {
    movie: state.watch_list[ownProps.match.params.id],
    authenticated: state.auth.authenticated,
  }
}

export default connect(
  mapStateToProps,
  actions
)(WatchListDetail)
