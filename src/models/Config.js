import { Schema, model } from "mongoose";

const schema = new Schema({
    logomarca: { type: String, required: true },
    title: { type: String, required: true },
    banner: { type: String, required: false },
    phrase: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true
    },
    timestamps: true
});

// Definindo URLs virtuais para `logomarca` e `banner`
schema.virtual('logomarca_url').get(function() {
    return `http://localhost:3333/files/${this.logomarca}`;
});

schema.virtual('banner_url').get(function() {
    return `http://localhost:3333/files/${this.banner}`;
});

export default model("Config", schema);
