import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "@contexts/UserContext";

const Navbar: React.FC = () => {
  // FIXME: CAN'T RETURN NULL HERE BECAUSE IT WILL BREAK RULE OF ORDER OF HOOKS
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const dashboardRef = useRef<HTMLAnchorElement>(null);
  const researchRef = useRef<HTMLAnchorElement>(null);
  const tradeRef = useRef<HTMLAnchorElement>(null);

  const setSelectedPage = (page: string) => {
    if (!user)
      return;
    setUser({ ...user, selectedPage: page });
  }

  useEffect(() => {
    // TODO: THIS IS REALLY HACKY
    //       MAYBE WE COULD GET THIS AUTOMATICALLY
    //       BY USING RADIO BUTTONS
    if (!user)
      return;

    if (user.selectedPage === "/dashboard") {
      dashboardRef.current?.classList.add("border-b-2");
      researchRef.current?.classList.remove("border-b-2");
      tradeRef.current?.classList.remove("border-b-2");
      navigate("/dashboard")
    } else if (user.selectedPage === "/research") {
      dashboardRef.current?.classList.remove("border-b-2");
      researchRef.current?.classList.add("border-b-2");
      tradeRef.current?.classList.remove("border-b-2");
      navigate("/dashboard")
    } else if (user.selectedPage === "/trade") {
      dashboardRef.current?.classList.remove("border-b-2");
      researchRef.current?.classList.remove("border-b-2");
      tradeRef.current?.classList.add("border-b-2");
      navigate("/dashboard")
    }
  }, [user])

  if (!user)
    return null;

  return (
    <div className="navbar bg-base-100 border-b-gray-700 border-b-2 sticky top-0 z-50">
      <div className="navbar-start">
        <span>
          <button className="btn btn-ghost text-xl">Trading</button>
        </span>
        <ul className="menu menu-horizontal">
          <li><a ref={dashboardRef} className="rounded-none" onClick={() => setSelectedPage("/dashboard")}>Dashboard</a></li>
          <li><a ref={researchRef} className="rounded-none" onClick={() => setSelectedPage("/research")}>Research</a></li>
          <li><a ref={tradeRef} className="rounded-none" onClick={() => setSelectedPage("/trade")}>Trade</a></li>
        </ul>
      </div>
      <div className="navbar-end">
        <button className="btn btn-secondary">Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
