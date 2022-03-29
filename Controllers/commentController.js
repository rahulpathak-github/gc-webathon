const Post = require("./../Models/postModel");
const User = require("./../Models/userModel");
const Comment = require("./../Models/commentModel");
const catchAsync = require("./../Utils/catchAsync");
const AppError = require("./../Utils/appError");

exports.createComment = catchAsync(async (req, res, next) => {
  if (!req.body.postId && !req.body.parCommentId) {
    return next(new AppError("provide either postId or parCommentId", 400));
  }
  const createdAt = Date.now();

  const newComment = new Comment({
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

    const createdAt = Date.now();
    const newNotification = new Notification({
      createdAt,
      user: req.params.id,
      category: "post",
      categoryId: req.body.postId,
      body: `${req.user.handle} commented on your post`,
      hasRead: false,
    });

    const createdNotification = await Notification.create(newNotification);

    await User.findByIdAndUpdate(newNotification.user, {
      $push: { notifications: createdNotification._id },
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
  const post = await Post.findById(req.params.id).select("comments").populate({
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
  const comment = await Comment.findById(req.params.id).select(
    "author replies"
  );
  if (!comment) {
    return next(new AppError(`No comment found with ID ${req.params.id}`, 404));
  }

  if (req.user._id.toString() !== comment.author.toString()) {
    return next(
      new AppError(
        "Access Denied!! Only author of a comment can delete it",
        401
      )
    );
  }
  await Comment.deleteMany({ _id: { $in: comment.replies } });
  await Comment.findByIdAndDelete(req.params.id);

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
