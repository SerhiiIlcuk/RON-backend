import * as mongoose from 'mongoose';

export const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 6,
        maxlength: 255,
        required: [true, 'TITLE_IS_BLANK'],
    },
    category: {
        type: String,
        required: [true, 'CATEGORY_IS_BLANK'],
    },
    status: {
        type: String,
        enum: ['draft', 'publish'],
        default: 'draft',
        required: [true, 'STATUS_IS_BLANK'],
    },
    featured: {
        type: Boolean,
        default: false,
    },
    content: {
        type: String,
        required: [true, 'BODY_IS_BLANK'],
    },
}, {
    versionKey: false,
    timestamps: true,
});
