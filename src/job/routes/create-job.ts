import { Request, Response } from 'express';
import express from 'express';
import { body } from 'express-validator';
import { currentUser } from '../../middleware/current-user';
import { validateRequest } from '../../middleware/validate-request';
import { BadRequestError } from '../../errors/bad-request-error';

import { Job } from '../models/job-model';


const router = express.Router();

router.post('/api/jobs/create', [
    body('title').notEmpty().withMessage('You must supply a title'),
], [currentUser, validateRequest],
    async (req: Request, res: Response) => {
        const { title, description } = req.body;
        if (!req.currentUser) {
            throw new BadRequestError('Invalid Credentials');
        }
        const userType = req.currentUser.userType;

        if (userType !== "admin") {
            throw new BadRequestError('Invalid Credentials');
        }

        const job = Job.build({
            title, description,
            userIds: []
        });
        await job.save();

        res.status(201).send(job);
    });

export { router as createJobRouter };