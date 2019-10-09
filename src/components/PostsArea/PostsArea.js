import React from 'react';
import PostTile from '../PostTile/PostTile'

const postsArea = (props) => {
    return (
        <div>
            {props.posts.map(post => <PostTile key={post.link} post={post} openPost={props.openPost}/>)}
        </div>
    );
}

export default postsArea