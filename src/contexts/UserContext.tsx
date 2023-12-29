import React, { Dispatch, SetStateAction } from 'react';

interface UserContextProps {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
}

const UserContext = React.createContext<UserContextProps>({
  username: '',
  setUsername: () => {},
});

export default UserContext;
