import React from 'react';

const Post = (props) => {
  console.log(props)

  return (
    <li>
      <span>{props.post.user} - {props.post.text} - upvotes: {props.post.upvotes} </span>
      <button onClick={() => props.upvotePost(props.post)}>Upvote</button>
      <hr/>
    </li>
  )
}

export default Post
