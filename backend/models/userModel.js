import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  cartItems: [{
    qty: { type: Number, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
    _id: false
  }],
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
}, {
  timestamps: true
})

// Compare bcrypt pw to user input 
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware: Encrypt pw befroe saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model('User', userSchema)

export default User;