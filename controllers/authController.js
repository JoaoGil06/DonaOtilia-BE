const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync.js');
const AppError = require('./../utils/AppError');
const { promisify } = require('util');

const signToken = (id) =>
	jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});

const createSendToken = (user, statusCode, res) => {
	const token = signToken(user._id);
	const cookieOptions = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
		),
		secure: false,
		httpOnly: true,
	};

	if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
	res.cookie('jwt', token, cookieOptions);

	// Remove password from the output
	user.password = undefined;

	res.status(statusCode).json({
		status: 'success',
		token,
		data: {
			user,
		},
	});
};

exports.signup = catchAsync(async (req, res) => {
	const { name, email, password, passwordConfirm, role } = req.body;
	const newUser = await User.create({
		name,
		email,
		password,
		passwordConfirm,
		role,
	});

	createSendToken(newUser, 200, res);
});

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	// 1) Check if email & password exists
	if (!email || !password) {
		return next(new AppError('Por favor envia um e-mail e password!', 400));
	}

	// 2) Check if user exists & password is correct
	const user = await User.findOne({ email }).select('+password');
	const correct = await user.correctPassword(password, user.password);

	if (!user || !correct) {
		return next(new AppError('Email ou password incorretos', 401));
	}

	// 3) If everything is okay, send token back to client
	createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
	// 1) Getting token and check of it's there
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	} else if (req.cookies.jwt) {
		token = req.cookies.jwt;
	}

	if (!token) {
		return next(
			new AppError(
				'Não estás logado! Por favor efetua o login para ter acesso.',
				401
			)
		);
	}

	// 2) Verification token
	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	// 3) Check if user still exists
	const currentUser = await User.findById(decoded.id);
	if (!currentUser) {
		return next(
			new AppError('O utilizador associado a este token não existe.', 401)
		);
	}

	// GRANT ACCESS TO PROTECTED ROUTE
	req.user = currentUser;
	res.locals.user = currentUser;
	next();
});

// Only for rendered pages, no errors!
exports.isLoggedIn = async (req, res, next) => {
	if (req.cookies.jwt) {
		try {
			// VErify Token
			const decoded = await promisify(jwt.verify)(
				req.cookies.jwt,
				process.env.JWT_SECRET
			);

			// Check if user still exists
			const currentUser = await User.findById(decoded.id);
			if (!currentUser) {
				return next();
			}

			// Check if user changed password after the token was issued
			if (currentUser.changedPasswordAfter(decoded.iat)) {
				return next();
			}

			// There is a logged in user
			res.locals.user = currentUser;
			return next();
		} catch (err) {
			return next();
		}
	}

	next();
};

exports.restrictTo = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new AppError('Não tens autorização para fazer esta ação', 403)
			);
		}

		next();
	};
};
