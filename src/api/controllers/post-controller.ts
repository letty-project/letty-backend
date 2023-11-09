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
  const userId = req.user as number;
  const post = await PostService.createPost(req.body.title, req.body.content, userId);
  return res.status(200).json({
    success: true,
    data: post,
  });
};

const getPosts = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string || "1", 10);
  const limit = parseInt(req.query.limit as string || "1", 10);
  const { posts, totalPosts } = await PostService.getPostsByPagination(page, limit);
  return res.status(200).json({
    success: true,
    data: {
      totalPosts,
      posts,
    },
  });
};

const getPost = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10) || 0;
  const post = await PostService.getPostById(id);
  if (post == null) {
    return res.status(404).json({
      success: false,
    });
  }
  return res.status(200).json({
    success: true,
    data: post,
  });
};

const deletePost = async (req: Request, res: Response) => {
  if (req.user == null) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
  const userId = req.user as number;
  const postId = parseInt(req.params.id, 10) || 0;
  const result = await PostService.deletePostById(postId, userId);
  return res.status(200).json({
    success: result,
  });
};

export const PostController = {
  createPost,
  getPosts,
  getPost,
  deletePost,
};
