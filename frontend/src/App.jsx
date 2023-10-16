import { useState, useEffect, useContext } from 'react'
import { ApiTest } from './components/ApiTest'
import { socket } from './utils/socket'
import { SocketTest } from './components/SocketTest'
import { ConnectionState } from './components/ConnectionState'
import futureLogo from '/future.svg'
import './App.css'

import { AuthContext } from './AuthProvider';
import { Route, Switch, Link, useLocation } from "wouter";
import Login from './components/Login';
import Register from './components/Register';
import Gate from './components/Gate';
import Logout from './components/Logout'

function App() {
  const [count, setCount] = useState(0)

  const [isConnected, setIsConnected] = useState(socket.connected);

  const { isLoggedIn, token, logout, user } = useContext(AuthContext);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <>
      <div>
        <a href="https://github.com/sydney-sisco/webapp-template" target="_blank">
          <img src={futureLogo} className="logo" alt="future logo" />
        </a>
      </div>
      <h1>webapp-template</h1>
      <p className="read-the-docs">
        Click on the logo to learn more
      </p>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <ApiTest />
      <SocketTest />
      <ConnectionState isConnected={ isConnected } />

      <Switch>
          <Route path="/login"><Login /></Route>
          <Route path="/register"><Register /></Route>

          {!isLoggedIn ?
            <Route>
              <Gate />
            </Route>
            :
            <>
              <Route path="/auth">
                You are logged in as {user.username}
                <Logout />
              </Route>
            </>
          }
      </Switch>
    </>
  )
}

export default App
