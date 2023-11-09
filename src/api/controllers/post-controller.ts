import {
  Request,
  Response,
} from "express";
import {
  PostService,
} from "src/core";

const createPost = async (req: Request, res: Response) => {
  if (req.user == null) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
  const post = await PostService.createPost(req.body.title, req.body.content, req.user as number);
  console.log(post);
  return res.status(200).json({
    success: true,
    data: post,
  });
};

const getPosts = async(req: Request, res: Response)=> {
  const page = parseInt(req.query.page as string || "1", 10);
  const limit = parseInt(req.query.limit as string || "1", 10);
  const {posts, totalPosts} = await PostService.getPostsByPagination(page, limit);
  return res.status(200).json({
    success: true,
    data: {
      totalPosts,
      posts,
    },
  });
  console.log(posts);
};

export const PostController = {
  createPost,
  getPosts,
};
