import {
  Post,
  User,
} from "src/core";

const createPost = async (title: string, content: string, userId: number) => {
  const user = await User.findOne({ where: { id: userId } });
  if (user == null) {
    throw new Error("User not found.");
  }
  const post = await Post.create({
    title,
    content,
    thumbnail: "",
    userId: user.id,
  });
  return post;
};

const getPostsByPagination = async (page: number = 1, limit: number = 6) => {
  page -= 1;
  const totalPosts = await Post.count({});
  const posts = await Post.findAll({
    offset: page * limit,
    limit,
    order: [
      ["createdAt", "DESC"],
    ],
    include: [
      {
        model: User,
        as: "user",
      },
    ],
  });
  return {
    posts,
    totalPosts,
  };
};

const getPostById = async (id: number) => {
  const post = await Post.findOne({
    where: {
      id,
    },
    include: [
      {
        model: User,
        as: "user",
      },
    ],
  });
  return post;
};

const deletePostById = async (postId: number, userId: number) => {
  const deletedCount = await Post.destroy({
    where: {
      id: postId,
      userId,
    },
  });
  return deletedCount === 1;
};

export const PostService = {
  createPost,
  getPostsByPagination,
  getPostById,
  deletePostById,
};
