import mongoose from 'mongoose';
import Validators from '../../controllers/validators/Validators';

export const NewsModel = mongoose.model('News', {
  date: {
    type: Date,
    required: true,
  },

  expireDate: {
    type: Date,
    required: true,
  },

  language: {
    type: String,
    required: true,
    maxlength: 3,
  },

  title: {
    type: String,
    required: true,
    maxlength: 256,
  },

  shortDescription: {
    type: String,
    required: true,
    maxlength: 1024,
  },

  linkToArticle: {
    type: String,
    required: true,
    validate: {
      validator: Validators.isUrl,
      message: 'Field linkToArticle is not a valid URL',
    },
  },
});
