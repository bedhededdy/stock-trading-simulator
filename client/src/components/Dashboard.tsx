import { useContext, useCallback, useEffect, useRef } from "react";

import UserContext from "@contexts/UserContext";
import HTTPContext from "@contexts/HTTPContext";

import LabeledInput from "./common/LabeledInput";

const Dashboard: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const { http } = useContext(HTTPContext);

  const addAccountModalRef = useRef<HTMLDialogElement>(null);
  const accountNameRef = useRef<HTMLInputElement>(null);
  const balanceRef = useRef<HTMLInputElement>(null);

  const addAccountOnClick = useCallback(async () => {
    // if (!user)
    //   return;

    // const res = await http.post("/api/addAccount", {
    //   username: user.name,
    //   accountName: accountNameRef.current!.value,
    //   balance: balanceRef.current!.value
    // });

    // if (res.status !== 200) {
    //   console.error("Failed to add account");
    //   return;
    // }

    // const updatedUser = { ...user, accounts: [...user.accounts, { name: accountNameRef.current!.value, balance: balanceRef.current!.value }] };
    // setUser(updatedUser);

    // accountNameRef.current!.value = "";
    // balanceRef.current!.value = "";

    // addAccountModalRef.current!.close();
  }, [user])

  const clearFieldsAndClose = (src: string) => {
    if (src === "account") {
      accountNameRef.current!.value = "";
      balanceRef.current!.value = "";
    }
    addAccountModalRef.current!.close();
  }

  // TODO: GET THE WATCHED TICKERS


  // FIXME: SHOULD PROBABLY DO THIS AT LOGIN, NOT HERE
  useEffect(() => {
    (async () => {
      if (!user)
        return;

      const res = await http.get(`/api/getAccounts?username=${user.name}`);
      if (res.status !== 200) {
        console.error("Failed to get accounts");
        return;
      }

      const accounts = res.data.accounts || [];

      setUser({ ...user, accounts: accounts });
    })();
  }, [])

  if (!user)
    return null;

  return (
    <div className="min-w-full p-4 space-y-4" >
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title">Accounts</h2>
          <div className="mt-2">
            {
              user && user.accounts ?
                user.accounts.map((account:any) => (
                  <p key={account.name}>{account.name} - ${account.balance}</p>
                ))
                : <p>No accounts found</p>
            }
          </div>
        </div>
        <div className="card-actions pl-8 pb-4">
          <button className="btn btn-info" onClick={() => addAccountModalRef.current!.showModal()}>Add Account</button>
          <dialog ref={addAccountModalRef} className="modal">
            <div className="modal-box">
              <h2 className="text-xl">Add Account</h2>
              <div>
                <LabeledInput ref={accountNameRef} label="Account Name" type="text" />
                <LabeledInput ref={balanceRef} label="Balance" type="number" hideUpDown isMoney/>
                <div className="flex form-control mt-4 text-right">
                  <span className="space-x-3">
                    <button className="btn btn-primary" onClick={addAccountOnClick}>Add</button>
                    <button className="btn btn-error" onClick={() => clearFieldsAndClose("account")}>Cancel</button>
                  </span>
                </div>
              </div>
            </div>
          </dialog>
        </div>
      </div>
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title">Ticker Watch List</h2>
          <div className="mt-2">
            {
              user
                ? null
                : <p>No watched tickers</p>
            }
          </div>
        </div>
        <div className="card-actions pl-8 pb-4">
          <button className="btn btn-info">Add Ticker</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
