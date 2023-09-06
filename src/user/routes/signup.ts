import { Request, Response } from 'express';
import express from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/user-model';
import { validateRequest } from '../../middleware/validate-request';
import { BadRequestError } from '../../errors/bad-request-error';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage("Password must be between 4 and 20 characters."),
    body('userType')
        .isString()
        .withMessage("UserType must be valid"),
],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password, userType, firstname, lastname } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new BadRequestError('Email in use');
        }

        const user = User.build({ email, password, userType, firstname, lastname });
        await user.save();

        const userJwt = jwt.sign({
            id: user.id,
            email: user.email,
            userType: user.userType
        }, process.env.JWT_KEY!);

        req.session = {
            jwt: userJwt
        };

        res.status(201).send(user);
    });

export { router as signUpRouter };