import api from "./api";
class UserService {

  helathCheck() {
    return api.get("/");
  }
}

export default new UserService();
