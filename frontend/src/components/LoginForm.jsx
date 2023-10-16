import React, { useState } from 'react';

function LoginForm({ handleSubmit }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSubmit({ username, password });
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <label>
                Username:
                <input 
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                />
            </label>
            <label>
                Password:
                <input 
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}

export default LoginForm;
