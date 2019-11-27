import React, { Component } from "react";
import styled from "styled-components";
import Movie from "../Movie";
import { connect } from "react-redux";
import * as actions from '../../actions';
import _ from "lodash";

class DiscoverList extends Component {
  render () {
    const movies = _.map(this.props.movies, (m) => {
      return <Movie path={'watch-list/'} id={m.id} key={m.id} title={m.title} img={m.poster_path} />
    });

    return (
      <MovieGrid>
        {movies}
      </MovieGrid>
    );
  }
}

function mapStateToProps (state) {
  console.log(state)
  return { movies: state.watch_list }
};

export default connect(
  mapStateToProps,
  actions
)(DiscoverList);

const MovieGrid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 2em;
  margin: 0 auto;
`;
