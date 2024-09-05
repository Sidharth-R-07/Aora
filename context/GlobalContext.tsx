import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { getCurrentUser, UserModel } from "../lib/appwrite";

const GlobalContext = createContext<State | null>(null);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};



interface GlobalProviderProps {
  children: ReactNode;
}

interface State {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  user: UserModel | null;
  setUser: (value: UserModel | null) => void;
  isLoading: boolean;
  setLoading: (value: boolean) => void;
}




// Create the GlobalProvider component
const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserModel | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        if (user) {
          setIsLoggedIn(true);
          setUser(user);
        } else {
          setIsLoggedIn(false);
          setUser(null);

        }
      })
      .catch((err) => {
        console.error(err, "ERROR FETCHING USER");

      }).finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
        setLoading
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};


export default GlobalProvider;
