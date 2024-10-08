import { Schema } from 'mongoose';

export const userSchema = new Schema({
  id: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});
