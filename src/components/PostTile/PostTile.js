import React, { Component } from 'react';
import './PostTile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux'
import * as action from '../../store/action'

class postTile extends Component {
    getWriteCategories = () => {
        const rolesList = this.props.currentUser.roles.split(',');
        let categoriesList = []
        this.props.roles.forEach(role => {
            if (rolesList.indexOf(role.url.split('/')[4]) >= 0)
                categoriesList = categoriesList.concat(role.writeCategories.split(','))
        });
        categoriesList = categoriesList.filter(onlyUnique);
        return categoriesList
    }

    tryOpenPost = () => {
        if (this.getWriteCategories().indexOf(this.props.post.category.split('/')[4]) >= 0)
            this.props.openPost(this.props.post)
    }

    render() {
        return (
            <div className='PostTile' onClick={this.tryOpenPost}>
                <a href={this.props.post.permalink_url}><FontAwesomeIcon icon={faLink} size="lg" className='LinkIcon' /></a>
                <p>{this.props.post.updated_time}</p>
                <p className="Content">{this.props.post.message.length > 50 ? this.props.post.message.substring(0, 50) : this.props.post.message}</p>
                <p>{this.props.post.seen ? "Seen" : "New"}</p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        roles: state.roles
    }
}

const mapDispatchToProps = dispatch => {
    return {
        openPost: (post) => dispatch(action.openPost(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(postTile);

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
