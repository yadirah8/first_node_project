import { Router, Response, Request, NextFunction } from "express";
import HttpException from "@/utils/exceptions/http.exception";
import validate from "@/resources/post/post.validation";
import PostService from "@/resources/post/post.service";
import Controller from "@/utils/interfaces/controller.interface";
import validationMiddleware from "@/middleware/validation.middleware";

class PostController implements Controller {
  public path = "/posts";
  public router = Router();
  private PostService = new PostService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      `${this.path}`,
      validationMiddleware(validate.create),
      this.create
    );
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { title, body } = req.body;
      const post = await this.PostService.create(title, body);
      res.status(201).json({ post });
    } catch (e) {
      next(new HttpException(400, "Cannot create post"));
    }
  };
}

export default PostController;
