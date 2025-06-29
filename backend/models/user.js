import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  profilePhoto: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    maxlength: 20,
    match: /^[^\s]*$/
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    default: 'Male'
  },
  customGender: {
    type: String
  },
  profession: {
    type: String,
    enum: ['Student', 'Developer', 'Entrepreneur'],
    required: true
  },
  companyName: {
    type: String
  },
  address: {
    country: String,
    state: String,
    city: String,
    addressLine1: {
      type: String,
      required: true
    }
  },
  subscriptionPlan: {
    type: String,
    enum: ['Basic', 'Pro', 'Enterprise'],
    default: 'Basic'
  },
  newsletter: {
    type: Boolean,
    default: true
  },
  dateOfBirth: {
    type: Date
  }
}, { timestamps: true });

export default model('User', UserSchema);
