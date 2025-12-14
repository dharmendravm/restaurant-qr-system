import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    sessionToken: {
        type: String,
        default: null
    },
    deviceId: {
        type: String,
        default: null
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    userAgent:{
        type: String
    },
    tableNumber: {
        type: Number
    },
    qrCodeUrl: {
        type: String
    },
    convertedSession: {
        type: Boolean,
        default: null
    },
    expiresAt: {
        type: Date,
    },
    lastActivity: {
        type: Date
    }
});

const Session = mongoose.model('Session',sessionSchema);

export default Session;
