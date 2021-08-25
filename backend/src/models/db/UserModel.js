import mongoose from 'mongoose';
import UserValidators from '../../controllers/validators/UserValidators';

export const UserModel = mongoose.model('Users', {
  localSystemId: {
    type: String,
    default: '',
    validate: {
      validator: UserValidators.isFilledIfCustomer,
      message: 'Field is mandatory if userLevel is CUSTOMER',
    },
  },

  name: {
    type: String,
    required: [true, 'Field name is required'],
    validate: {
      validator: UserValidators.isTrimOk,
      message: 'Field name cannot begin / end with a space',
    },
  },

  email: {
    type: String,
    required: [true, 'Field email required'],
    lowercase: true,
    unique: true,
    validate: {
      validator: UserValidators.isEmail,
      message: 'Please enter a valid email address (lowercase required!).',
    },
  },

  status: {
    type: String,
    required: true,
    enum: ['NOT ACCEPTED', 'ACTIVE', 'NOT ACTIVE'],
  },

  passHash: {
    type: String,
    validate: {
      validator: UserValidators.isPassHashOk,
      message:
        'Field is mandatory if status is ACTIVE or NOT ACTIVE, length is minimum 8',
    },
  },

  userLevel: {
    type: String,
    required: [true, 'Field userLevel required'],
    enum: ['OWNER_SA', 'OWNER_USER', 'CUSTOMER'],
  },

  language: {
    type: String,
    required: [true, 'Field language required'],
    enum: ['hu', 'en', 'de'],
  },

  gdprAccepted: {
    type: Boolean,
    validate: {
      validator: UserValidators.isTrueIfAccepted,
      message: 'Field is mandatory true if status is ACTIVE or NOT ACTIVE',
    },
  },

  termsOfServiceAccepted: {
    type: Boolean,
    validate: {
      validator: UserValidators.isTrueIfAccepted,
      message: 'Field is mandatory true if status is ACTIVE or NOT ACTIVE',
    },
  },

  emailAnnouncementsAccepted: {
    type: Boolean,
    default: false,
  },

  newsletterAccepted: {
    type: Boolean,
    default: false,
  },

  deleted: {
    type: Boolean,
    default: false,
  },

  params: {
    type: String,
    default: '{}',
  },

  logs: {
    lastLogin: {
      type: Date,
    },
  },
});
