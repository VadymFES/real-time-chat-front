import React, { Dispatch, SetStateAction } from 'react';

interface UserContextProps {
  username: string;
  userId: string;

  setUsername: Dispatch<SetStateAction<string>>;
  setUserId: Dispatch<SetStateAction<string>>;
}

const UserContext = React.createContext<UserContextProps>({
  username: '',
  setUsername: () => { },
  setUserId: () => { },
  userId: ''
});

export default UserContext;
