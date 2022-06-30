import { Router, Response, Request, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import validationMiddleware from "@/middleware/validation.middleware";
import authenticatedMiddleware from "@/middleware/authenticated.middleware";
import userValidation from "@/resources/user/user.validation";
import sendEmail from "@/utils/mailer";
import UserService from "@/resources/user/user.service";

class UserController implements Controller {
  public path = "/users";
  public router = Router();
  private userService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(userValidation.register),
      this.register
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(userValidation.login),
      this.login
    );
    this.router.get(`${this.path}`, authenticatedMiddleware, this.getUser);
  }

  private register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { name, email, password } = req.body;
      const token = await this.userService.register(
        name,
        email,
        password,
        "user"
      );

      await sendEmail(name, email);
      res.status(201).json({ token: token });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { email, password } = req.body;
      const token = await this.userService.login(email, password);
      res.status(200).json({ token: token });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private getUser = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    if (!req.user) {
      return next(new HttpException(404, "No logged in user"));
    }
    res.status(200).json({ user: req.user });
  };
}

export default UserController;
