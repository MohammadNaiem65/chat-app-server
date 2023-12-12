const { default: mongoose, Schema } = require('mongoose');

const userSchema = new Schema(
	{
		_id: String,
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
		},
		email_verified: {
			type: Boolean,
			default: false,
		},
		mobile: {
			type: String,
		},
		avatar: {
			type: String,
		},
		role: {
			type: String,
			enum: ['admin', 'instructor', 'student'],
			default: 'student',
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model('User', userSchema);

module.exports = User;
