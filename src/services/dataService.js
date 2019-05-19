export default class DataService {
  static setLoggedUser = user => {
    localStorage.setItem("user", JSON.stringify(user));
  };
  static getLoggedUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
  };
}
