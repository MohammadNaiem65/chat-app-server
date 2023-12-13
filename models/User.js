const { default: mongoose, Schema } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema(
	{
		name: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		email_verified: {
			type: Boolean,
			default: false,
		},
		mobile: {
			type: String,
			unique: true,
			trim: true,
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

// unique validator plugin
// userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema);

module.exports = User;
