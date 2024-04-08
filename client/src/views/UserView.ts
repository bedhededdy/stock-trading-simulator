import AccountBasicView from "@views/AccountBasicView";

export default class UserView {
  public name: string = "";
  public accounts: AccountBasicView[] = [];
  public selectedPage: string = "";
}
