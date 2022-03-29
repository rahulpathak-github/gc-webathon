const User = require("./../Models/userModel");
const Notification = require("./../Models/notificationModel");
const catchAsync = require("./../Utils/catchAsync");
const AppError = require("./../Utils/appError");

exports.getAllUser = catchAsync(async (req, res, next) => {
  const users = await User.find().select("handle");

  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id)
    .select("posts followers followings") // TODO: select only handle from tagged users
    .populate({ path: "posts", select: "createdAt caption taggedUsers" })
    .populate({
      path: "followers",
      select: "handle",
    })
    .populate({
      path: "followers",
      select: "handle",
    });

  if (!user) {
    return next(new AppError(`No user found with ID ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  if (req.body.follow) {
    await User.findByIdAndUpdate(req.params.id, {
      $addToSet: { followers: req.user._id },
    });

    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { followings: req.params.id },
    });

    const createdAt = Date.now();
    const newNotification = new Notification({
      createdAt,
      user: req.params.id,
      category: "user",
      categoryId: req.user._id,
      body: `${req.user.handle} started following you`,
      hasRead: false,
    });

    const createdNotification = await Notification.create(newNotification);

    await User.findByIdAndUpdate(newNotification.user, {
      $push: { notifications: createdNotification._id },
    });

    res.status(201).json({
      status: "success",
    });
  } else if (req.body.unfollow) {
    await User.findByIdAndUpdate(req.params.id, {
      $pull: { followers: req.user._id },
    });

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { followings: req.params.id },
    });

    res.status(201).json({
      status: "success",
    });
  } else if (req.body.gender) {
    await User.findByIdAndUpdate(req.user._id, {
      gender: req.body.gender,
    });

    res.status(201).json({
      status: "success",
    });
  } else if (req.body.dob) {
    await User.findByIdAndUpdate(req.user._id, {
      dob: req.body.dob,
    });

    res.status(201).json({
      status: "success",
    });
  } else if (req.body.profilePic) {
    await User.findByIdAndUpdate(req.user._id, {
      profilePic: req.body.profilePic,
    });

    res.status(201).json({
      status: "success",
    });
  } else if (req.body.coverPic) {
    await User.findByIdAndUpdate(req.user._id, {
      coverPic: req.body.coverPic,
    });

    res.status(201).json({
      status: "success",
    });
  } else return next(new AppError(`Invalid patch request`, 404));
});

exports.createNotification = catchAsync(async (req, res, next) => {
  const createdAt = Date.now();
  const newNotification = new Notification({
    createdAt,
    user: req.params.uid,
    ...req.body,
  });

  const createdNotification = await Notification.create(newNotification);
  await User.findByIdAndUpdate(req.params.uid, {
    $push: { notifications: createdNotification._id },
  });

  res.status(201).json({
    status: "success",
    data: {
      notification: createdNotification,
    },
  });
});

exports.getAllNotification = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.uid)
    .select("notifications")
    .populate({
      path: "notifications",
      select: "createdAt category body hasRead",
    });

  res.status(200).json({
    status: "success",
    data: {
      notifications: user.notifications,
    },
  });
});

exports.notificationMarkAsRead = catchAsync(async (req, res, next) => {
  const notification = await Notification.findById(req.params.nid);
  if (!notification) {
    return next(
      new AppError(`No notification found with ID ${req.params.nid}`, 404)
    );
  }
  notification.hasRead = true;
  await notification.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
  });
});
