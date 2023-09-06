import { Request, Response } from 'express';
import express from 'express';
import { currentUser } from '../../middleware/current-user';
import { validateRequest } from '../../middleware/validate-request';
import { BadRequestError } from '../../errors/bad-request-error';

import { Job } from '../models/job-model';


const router = express.Router();

router.delete('/api/jobs/delete/:jobId', [currentUser, validateRequest],
    async (req: Request, res: Response) => {
        const jobId = req.params.jobId;

        if (!req.currentUser) {
            throw new BadRequestError('Invalid Credentials');
        }
        const userType = req.currentUser.userType;

        if (userType !== "admin") {
            throw new BadRequestError('Invalid Credentials');
        }

        try {
            // Find the job by ID
            const job = await Job.findById(jobId);

            // Check if the job exists
            if (!job) {
                throw new BadRequestError('Job not found');
            }

            // Delete the job
            await Job.deleteOne({ _id: jobId });

            res.status(204).send(); // Respond with a 204 No Content status on successful deletion
        } catch (error) {
            // Handle errors appropriately
            throw new BadRequestError('An Error Occurred during the operation')
        }
    });

export { router as deleteJobRouter };