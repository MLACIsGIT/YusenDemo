import mongoose from 'mongoose';

export const DocumentModel = mongoose.model('Document', {
    type: {
        type: String,
        required: true,
        enum: ['NAV-XML', 'INVOICE'],
    },

    origFileName: {
        type: String,
        required: true,
    }
})