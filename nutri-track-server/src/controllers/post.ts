import postModel, { IPost } from "../models/post";

export const getAllPostsWithLikes = () => postModel.aggregate([
  {
    $lookup: {
      from: "likes",
      localField: "_id",
      foreignField: "postId",
      as: "likes"
    }
  },
  {
    $project: {
      _id: 1,
      title: 1,
      content: 1,
      image: 1,
      date: 1,
      sender: 1,
      numOfLikes: { $size: "$likes" }
    }
  }
])

export const getAllPostsWithLikesBySender = (sender) => postModel.aggregate([
  {
    $match: {
      sender: sender
    }
  },
  {
    $lookup: {
      from: "likes",
      localField: "_id",
      foreignField: "postId",
      as: "likes"
    }
  },
  {
    $project: {
      _id: 1,
      title: 1,
      content: 1,
      image: 1,
      date: 1,
      sender: 1,
      numOfLikes: { $size: "$likes" }
    }
  }
])

export const getPostById = (id: string) => postModel.findById(id);

export const addNewPost = (post: IPost) => postModel.create(post);

export const updatePostById = (
  id: string,
  { title, content, sender, image }
) =>
  postModel.findByIdAndUpdate(
    id,
    { title, content, sender, image },
    { new: true }
  );
