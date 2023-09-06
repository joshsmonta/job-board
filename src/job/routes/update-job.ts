import { Request, Response } from 'express';
import express from 'express';
import { currentUser } from '../../middleware/current-user';
import { validateRequest } from '../../middleware/validate-request';
import { BadRequestError } from '../../errors/bad-request-error';

import { Job } from '../models/job-model';


const router = express.Router();

router.put('/api/jobs/update/:jobId', [currentUser, validateRequest],
    async (req: Request, res: Response) => {
        const { title, description } = req.body;
        if (!req.currentUser) {
            throw new BadRequestError('Invalid Credentials');
        }
        const userType = req.currentUser.userType;

        if (userType !== "admin") {
            throw new BadRequestError('Invalid Credentials');
        }

        const jobId = req.params.jobId;

        // Check if the job with the provided jobId exists
        const job = await Job.findById(jobId);

        if (!job) {
            throw new BadRequestError('Job not found');
        }

        // Update the job properties
        job.title = title;
        job.description = description;

        await job.save();

        res.status(202).send(job);
    });

export { router as updateJobRouter };