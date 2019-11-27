import React, { Component } from "react";
import styled from "styled-components";
import Movie from "../Movie";
import { connect } from "react-redux";
import * as actions from '../../actions';
import _ from "lodash";
import InfiniteScroll from 'react-infinite-scroller';

class DiscoverList extends Component {  
  constructor () {
    super()
    
    this.loadItems = this.loadItems.bind(this)
    
    this.state = {
      hasMoreItems: true
    }
  }

  componentDidMount () {
    this.props.fetchMovies()
  }

  loadItems (page) {
    if (page < this.props.totalPages || this.props.totalPages === 0) {
      this.props.fetchMovies(page)
    } else {
      this.setState({ hasMoreItems: false })
    }
  }

  render() {
    const movies = _.map(this.props.movies, (m) => {
      return <Movie path={''} id={m.id} key={m.id} title={m.title} img={m.poster_path} />
    });

    return (
      <InfiniteScroll
        loadMore={this.loadItems}
        pageStart={0}
        hasMore={this.state.hasMoreItems}>
        <MovieGrid>
          {movies}
        </MovieGrid>
      </InfiniteScroll>
    );
  }
}

function mapStateToProps (state) {
  return { movies: state.movies, totalPages: state.total_pages }
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