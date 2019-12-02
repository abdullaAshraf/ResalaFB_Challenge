import React from 'react';
import PostTile from '../PostTile/PostTile'

const postsArea = (props) => {
    return (
        <div>
            {props.posts.map(post => <PostTile key={post.url} post={post}/>)}
        </div>
    );
}

export default postsArea