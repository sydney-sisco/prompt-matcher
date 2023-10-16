import React, {useContext} from 'react';
import { AuthContext } from '../AuthProvider';

function Logout() {
  const { logout } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" variant="contained">Logout</button>
    </form>
  );
}

export default Logout;
