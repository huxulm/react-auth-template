"use client";

const baseUrl = "http://127.0.0.1:8080";
class AuthService {
  _url: string;

  constructor(baseUrl: string) {
    this._url = baseUrl;
  }

  _validateStringField(field: string, value: string) {
    if (typeof value !== "string" || !value.trim().length)
      throw Error(`${field} is not valid`);
  }

  _userId(userId: any) {
    if (typeof userId !== "undefined") {
      sessionStorage.setItem("uid", userId);
      return;
    }
    return sessionStorage.getItem("uid");
  }

  _isLogin() {
    return !!this._userId(undefined);
  }

  login(name: string, password: string): Promise<any> {
    return Promise.resolve().then(() => {
      this._validateStringField("name", name);
      this._validateStringField("password", password);

      let form = new FormData();
      form.append("name", name);
      form.append("password", password);

      return fetch(`${this._url}/v1/login`, {
        method: "POST",
        body: form,
        headers: {},
      })
        .then((res) => {
          if (res.status === 200) {
            return res;
          }
          return res.json().then(({ message }) => {
            throw Error(message);
          });
        })
        .then((res) => res.json())
        .then(({ user }) => {
          this._userId(user.id);
          return true;
        })
        .catch((err) => {
          return false;
        });
    });
  }

  logout(): Promise<any> {
    return Promise.resolve().then(() => {
      return fetch(`${this._url}/v1/logout`, {
        method: "POST",
        headers: {},
      })
        .then((res) => {
          if (res.status === 200) {
            return res;
          }
          return res.json().then(({ message }) => {
            throw Error(message);
          });
        })
        .then((res) => res.json())
        .then((data) => {
          this._userId(null);
          sessionStorage.removeItem("uid");
          return true;
        })
        .catch((err) => {
          return false;
        });
    });
  }

  retriveUser(): Promise<any> {
    return Promise.resolve().then(() => {
      return fetch(`${this._url}/v1/me`, {
        method: "POST",
        headers: {},
      })
        .then((res) => {
          if (res.status === 200) {
            return res;
          }
          return res.json().then(({ message }) => {
            throw Error(message);
          });
        })
        .then((res) => res.json())
        .then(({ user }) => {
          return user;
        })
        .catch((err) => {
          return null;
        });
    });
  }
}

export default new AuthService(baseUrl);
