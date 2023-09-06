import { Request, Response } from 'express';
import express from 'express';
import { currentUser } from '../../middleware/current-user';
import { validateRequest } from '../../middleware/validate-request';
import { BadRequestError } from '../../errors/bad-request-error';

import { Job } from '../models/job-model';


const router = express.Router();

router.post('/api/jobs/apply/:jobId/user/:userId', [currentUser, validateRequest],
    async (req: Request, res: Response) => {
        const jobId = req.params.jobId;
        const userId = req.params.userId;

        if (!req.currentUser) {
            throw new BadRequestError('Invalid Credentials');
        }
        const userType = req.currentUser.userType;
        if (userType !== "applicant") {
            throw new BadRequestError('Invalid Credentials');
        }
        // Check if the job with the provided jobId exists and don't add existing user id to array
        const job = await Job.findByIdAndUpdate(
            jobId,
            { $addToSet: { userIds: userId } },
            { new: true }
        );

        if (!job) {
            throw new BadRequestError('Job not found');
        }

        res.status(202).send(job);

    });

export { router as applyToJobRouter };