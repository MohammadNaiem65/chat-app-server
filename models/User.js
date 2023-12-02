const { default: mongoose, Schema } = require('mongoose');

const userSchema = new Schema(
	{
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
		mobile: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
		},
		role: {
			type: String,
			enum: ['admin', 'instructor', 'user'],
			default: 'user',
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model('User', userSchema);

module.exports = User;
