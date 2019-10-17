import React from 'react'
import Post from './post';

const PostsList = (props) => {
  const postItems = props.posts.map((post, index) => {
    return (
      <Post key={index} post={post} upvotePost={props.upvotePost} />
    )
  })

  return (
    <ul className='list-group'>
      {postItems}
    </ul>
  )
}

export default PostsList