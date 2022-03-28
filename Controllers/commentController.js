const Post = require("./../Models/postModel");
const Comment = require("./../Models/commentModel");
const catchAsync = require("./../Utils/catchAsync");

exports.createComment = catchAsync(async (req, res, next) => {
  const createdAt = Date.now();
  const newComment = new Post({
    createdAt,
    author: req.user._id,
    body: req.body.body,
    post: req.body.postId,
  });

  const createdComment = await Comment.create(newComment);

  if (req.body.parCommentId) {
    await Comment.findByIdAndUpdate(req.body.parCommentId, {
      $push: { replies: createdComment._id },
    });
  } else {
    await Post.findByIdAndUpdate(req.body.postId, {
      $push: { comments: createdComment._id },
    });
  }

  res.status(201).json({
    status: "success",
    data: {
      comment: createdComment,
    },
  });
});

exports.getAllComment = catchAsync(async (req, res, next) => {
  const post = await Post.find().select("comments").populate({
    path: "comments",
    select: "author createdAt body",
  });

  if (!post) {
    return next(new AppError(`No post found with ID ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      comments: post.comments,
    },
  });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return next(new AppError(`No comment found with ID ${req.params.id}`, 404));
  }

  if (!req.user || (req.user && req.user._id !== comment.author._id)) {
    return next(
      new AppError("Access Denied!! Only author of a can delete it", 401)
    );
  }
  await Comment.deleteMany({ _id: { $in: comment.replies } });
  await comment.remove();

  res.status(204).json({
    status: "success",
    message: `Comment with ID ${req.params.id} deleted.`,
  });
});

exports.getAllReplies = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id).populate({
    path: "replies",
    select: "author createdAt body",
  });

  if (!comment) {
    return next(new AppError(`No comment found with ID ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      replies: comment.replies,
    },
  });
});
