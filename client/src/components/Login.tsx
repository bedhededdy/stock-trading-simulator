import { useCallback, useContext, useEffect, useId, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "@contexts/UserContext";
import HTTPContext from "@contexts/HTTPContext";
import LabeledInput from "@components/common/LabeledInput";

// FIXME: THIS DOES NOT GET THE BASICACCOUNTDATA THAT WE NEED
const Login: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const { http } = useContext(HTTPContext);

  const signupId = useId();

  const [isSignup, setIsSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const signupRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (user)
      navigate(user.selectedPage);
  }, [user]);

  const loginOnClick = useCallback(() => {
    if (isSignup) {
      http.post("/api/signup", {
        username: usernameRef.current!.value,
        password: passwordRef.current!.value
      }).then(res => {
        if (res.status === 200)
          setUser({...res.data, selectedPage: "/dashboard"});
        else
          setErrorMessage("Error! Could not create account!");
      })
    } else {
      http.get(`/api/login?username=${usernameRef.current!.value}&password=${passwordRef.current!.value}`).then(res => {
        if (res.status === 200)
          setUser({...res.data, selectedPage: "/dashboard"});
        else
          setErrorMessage("Error! Could not find account!");
      });
    }
  }, [isSignup]);

  const signupOnChange = () => {
    setIsSignup(signupRef.current!.checked);
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold">{isSignup ? "Sign Up" : "Login"}</h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={e => e.preventDefault()}>
            <LabeledInput ref={usernameRef} label="Username" required />
            <LabeledInput ref={passwordRef} type="password" label="Password" required />
            {isSignup && <LabeledInput ref={confirmPasswordRef} type="password" label="Confirm password" placeholder="Password" required />}
            <div className="flex justify-between mt-6 min-w-full">
              <span className="form-control flex-1 px-1">
                <button className="btn btn-primary min-h-full" onClick={loginOnClick}>{isSignup ? "Sign Up" : "Login"}</button>
              </span>
              <span className="form-control items-center px-1">
                <label className="label pt-0" htmlFor={signupId}>
                  <span className="label-text">Sign Up?</span>
                </label>
                <input id={signupId} ref={signupRef} type="checkbox" className="toggle toggle-primary" onChange={signupOnChange} />
              </span>
            </div>
            { errorMessage &&
              <div role="alert" className="alert alert-error mt-4 p-">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{errorMessage}</span>
              </div>
            }
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
