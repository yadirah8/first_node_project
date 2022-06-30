import PostModule from "@/resources/post/post.model";
import Post from "@/resources/post/post.interface";

class PostService {
  //    Create a new post
  async create(title: string, body: string): Promise<Post> {
    try {
      return await PostModule.create({ title, body });
    } catch (e) {
      throw new Error("Unable to create post");
    }
  }
}

export default PostService;
