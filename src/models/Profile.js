
import { Schema, model } from "mongoose";

const schema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    url: { type: String, required: true },
		bg: { type: String, default: "#323232" }, // Cor de fundo
		color: { type: String, default: "#f1f1f1" }, // Cor do texto
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    toJSON: {
        virtuals: true
    },
    timestamps: true
});

// Virtual para a URL completa da imagem
schema.virtual('image_url').get(function() {
    return `http://localhost:3333/files/${this.image}`;
});

export default model("Profile", schema);

