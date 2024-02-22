import conf from "../config/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  Client = new Client();
  account;
  constructor() {
    this.Client.setEndpoint(conf.appwriteURl).setProject(
      conf.appwriteProjectId
    );
    this.account = new Account(this.Client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (e) {
      console.error(e);
    }
  }

  async login({ email, password }) {
    try {
      const userAccount = await this.account.createEmailSession(
        email,
        password
      );
      return userAccount;
    } catch (e) {
      console.error(e);
    }
  }

  async getCurrentAccount() {
    try {
      const account = await this.account.get();
      return account;
    } catch (e) {
      console.log(e);
    }

    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessionss();
      return true;
    } catch (e) {
      console.log(e);
    }
  }
}

const authService = new AuthService();

export default authService;
