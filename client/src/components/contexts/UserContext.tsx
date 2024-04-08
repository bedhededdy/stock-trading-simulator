import { createContext } from "react";
import UserView from "@views/UserView";

class UserContextInstance {
  public user: UserView | null = null;
  public setUser: (user: UserView) => void = (_usr) => {};
}

const UserContext = createContext<UserContextInstance>(new UserContextInstance());
export default UserContext;
