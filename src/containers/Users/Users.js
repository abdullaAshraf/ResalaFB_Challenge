import React, { Component } from 'react';
import './Users.css'
import UserTile from '../../components/UserTile/UserTile'
import Shortid from 'short-id'

class Users extends Component {
    state = {
        users: [{username:'Abdulla Ashraf' , connectivity:true ,email:'abdulla@gmail.com'},{username:'Ahmed Akef' , connectivity:false ,email:'akef@gmail.com'}]
    }
    render(props){
        return (
            <div className='Users'>
                {this.state.users.map(user => <UserTile key={Shortid.generate()} {...user}/>)}
            </div>
        );
    }
}

export default Users;