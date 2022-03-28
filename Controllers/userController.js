const User = require("./../Models/userModel");
const catchAsync = require("./../Utils/catchAsync");

exports.getAllUser = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

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
