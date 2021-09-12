import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js';

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      cartItems: user.cartItems,
      isAdmin: user.isAdmin,
      token: generateToken(user._id), // Generate an access token
    })
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// Testing in Postman (enter json data in req.body first)
// const authUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   res.json({ email, password });
// });

// @desc Register a new user 
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  const user = await User.create({
    name, email, password
  })
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400);
    throw new Error('Invalid input');
  }
});


// @desc Get user profile
// @route GET /api/users/profile
// @access Private 
const getUserProfile = asyncHandler(async (req, res) => {
  if (req.user) {
    const { user } = req;
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      cartItems: user.cartItems,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private 
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    if (!await user.matchPassword(req.body.oPassword)) {
      res.status(400);
      throw new Error('Incorrect current password');
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.nPassword) {
      user.password = req.body.nPassword;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      cartItems: updatedUser.cartItems,
    });
  } else {
    res.status(400);
    throw new Error('Invalid input');
  }
});

// @desc Add an item to user's cart 
// @route POST /api/users/cart
// @access Private 
const addToUserCart = asyncHandler(async (req, res) => {
  const product = req.body;
  const user = await User.findById(req.user._id);
  if (user) {
    const existItem = user.cartItems.find(item => item.productId.toString() === product.productId);
    if (existItem) {
      user.cartItems[user.cartItems.indexOf(existItem)] = product;
    } else {
      user.cartItems.push(product);
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      cartItems: updatedUser.cartItems,
    });
  } else {
    res.status(400);
    throw new Error('Unable to add items to cart');
  }
});

// @desc Remove an item from user's cart 
// @route DELETE /api/users/cart/:id
// @access Private 
const removeFromUserCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.cartItems = user.cartItems.filter(item => item.productId.toString() !== req.params.id);
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      cartItems: updatedUser.cartItems,
    });
  } else {
    res.status(400);
    throw new Error('Unable to delete cart item');
  }
});

export { authUser, registerUser, getUserProfile, updateUserProfile, addToUserCart, removeFromUserCart };