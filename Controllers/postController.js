const Post = require("./../Models/postModel");
const catchAsync = require("./../Utils/catchAsync");
const AppError = require("./../Utils/appError");
const User = require("./../Models/userModel");
const Comment = require("./../Models/commentModel");
const Notification = require("./../Models/notificationModel");

exports.getAllPost = catchAsync(async (req, res, next) => {
  const posts = await Post.find()
    .populate({
      path: "taggedUsers",
      select: "handle",
    })
    .populate({
      path: "author",
      select: "handle",
    });

  res.status(200).json({
    status: "success",
    data: {
      posts,
    },
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id)
    .populate({
      path: "taggedUsers",
      select: "handle",
    })
    .populate({
      path: "author",
      select: "handle",
    });

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
    author: req.user._id,
    ...req.body,
  });

  const createdPost = await Post.create(newPost);
  await User.findByIdAndUpdate(req.user._id, {
    $push: { posts: createdPost._id },
  });

  res.status(201).json({
    status: "success",
    data: {
      post: createdPost,
    },
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  if (req.body.caption) {
    await Post.findByIdAndUpdate(req.params.id, {
      caption: req.body.caption,
    });

    res.status(201).json({
      status: "success",
    });
  } else if (req.body.fileId) {
    await Post.findByIdAndUpdate(req.params.id, {
      fileId: req.body.fileId,
    });

    res.status(201).json({
      status: "success",
    });
  } else if (req.body.addLike) {
    const post = await Post.findById(req.params.id).select("author");
    await Post.findByIdAndUpdate(req.params.id, {
      $addToSet: { likedBy: req.user._id },
    });

    const createdAt = Date.now();
    const newNotification = new Notification({
      createdAt,
      user: post.author,
      category: "post",
      categoryId: req.params.id,
      body: `${req.user.handle} liked your post`,
      hasRead: false,
    });

    const createdNotification = await Notification.create(newNotification);

    await User.findByIdAndUpdate(post.author, {
      $push: { notifications: createdNotification._id },
    });

    res.status(201).json({
      status: "success",
    });
  } else if (req.body.removeLike) {
    await Post.findByIdAndUpdate(req.params.id, {
      $pull: { likedBy: req.user._id },
    });

    res.status(201).json({
      status: "success",
    });
  } else if (req.body.addTag) {
    await Post.findByIdAndUpdate(req.params.id, {
      $addToSet: { taggedUsers: req.body.addTag },
    });

    res.status(201).json({
      status: "success",
    });
  } else if (req.body.removeTag) {
    await Post.findByIdAndUpdate(req.params.id, {
      $pull: { taggedUsers: req.body.removeTag },
    });

    res.status(201).json({
      status: "success",
    });
  } else return next(new AppError(`Invalid patch request`, 404));
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id).select("author comments");
  if (!post) {
    return next(new AppError(`No post found with ID ${req.params.id}`, 404));
  }

  if (req.user._id.toString() !== post.author.toString()) {
    return next(
      new AppError("Access Denied!! Only author of a post can delete it", 401)
    );
  }
  await Comment.deleteMany({ _id: { $in: post.comments } });
  await Post.findByIdAndDelete(req.params.id);
  // await post.remove();

  res.status(204).json({
    status: "success",
    message: `Post with ID ${req.params.id} deleted.`,
  });
});
