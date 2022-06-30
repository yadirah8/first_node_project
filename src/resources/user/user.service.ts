import UserModel from "@/resources/user/user.model";
import token from "@/utils/token";
import Logger from "@/utils/logger";

class UserService {
  //    register a new user
  async register(
    name: string,
    email: string,
    password: string,
    role: string
  ): Promise<string | Error> {
    try {
      const user = await UserModel.create({ name, email, password, role });
      return token.createToken(user);
    } catch (e: any) {
      throw new Error("Unable to create user");
    }
  }

  //Attempt to login user
  async login(email: string, password: string): Promise<string | Error> {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw new Error("Unable to find user with email");
      }

      if (await user.isValidPassword(password)) {
        return token.createToken(user);
      } else {
        throw new Error("Wrong credentials given");
      }
    } catch (e: any) {
      Logger.error("Unable to login user, wrong email or password");
      throw new Error("Unable to login user, wrong email or password");
    }
  }
}

export default UserService;
