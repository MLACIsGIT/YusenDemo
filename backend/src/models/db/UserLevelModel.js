import mongoose from 'mongoose';

export const UserLevelModel = mongoose.model('userlevels', {
    level: {
        type: String,
        default: 'CUSTOMER',
        required: true,
        enum: ['OWNER_SA', 'OWNER_USER', 'CUSTOMER'],
    },

    params: {
        type: String,
        default: '{}',
        required: true,
    },
})