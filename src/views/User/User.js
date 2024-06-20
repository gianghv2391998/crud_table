import * as React from 'react';
import { ThemeContext } from '../../ThemeProvider';
import '../../styles/Profile.css';

function User() {
    const {user} = React.useContext(ThemeContext)
    console.log(user)
    return (
        <div>
            User
        </div> 
    );
}

export default User;
