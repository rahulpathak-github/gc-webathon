const Post = require("./../Models/postModel");
const catchAsync = require("./../Utils/catchAsync");
const AppError = require("./../Utils/appError");

exports.getAllPost = catchAsync(async (req, res, next) => {
  const posts = await Post.find();

  res.status(200).json({
    status: "success",
    data: {
      posts,
    },
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError(`No post found with ID ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  const createdAt = Date.now();
  const newPost = new Post({
    createdAt,
    ...req.body,
  });

  const createdPost = await Post.create(newPost);

  res.status(201).json({
    status: "success",
    data: {
      post: createdPost,
    },
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {});

exports.deletePost = catchAsync(async (req, res, next) => {});
