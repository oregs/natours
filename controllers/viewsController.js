const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Booking = require('../models/bookingModel');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Build template
  // 3) Render that template from collection
  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) get the data, for the requested tour (including reviews and guildes)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }

  // 2) Render template using data from 1)
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour
  });
});

exports.getLoginForm = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Login into your account'
  });
});

exports.getAccount = (req, res, next) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

exports.getMyBookings = catchAsync(async (req, res, next) => {
  // Find all bookings
  const bookings = await Booking.find({ user: req.user.id });
  // find tours with returned IDs
  const tourIDs = bookings.map((el) => el.tour);

  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours
  });
});

// exports.updateUserData = catchAsync(async (req, res, next) => {
//   console.log('To update>>>>>> '+ req.body);
//   const updatedUser = await User.findByIdAndUpdate(req.user.id, {
//     name: req.body.name,
//     email: req.body.email
//   },
//   {
//     new: true,
//     runValidators: true
//   });

//   res.status(200).render('account', {
//     title: 'Your account',
//     user: updatedUser
//   });
// });
