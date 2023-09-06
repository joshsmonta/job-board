import { BadRequestError } from '../../errors/bad-request-error';
import { Request, Response } from 'express';
import express from 'express';
import { Job } from '../models/job-model';

const router = express.Router();

async function filterJobs(title: string | null, description: string | null) {
    // Create an empty object to build the filter criteria dynamically
    const filter: any = {};

    // Add filter criteria based on the provided parameters
    if (title) {
        filter.title = title;
    }

    if (description) {
        filter.description = description;
    }

    try {
        // Use the filter object to query the database
        const jobs = await Job.find(filter);

        return jobs;
    } catch (error) {
        // Handle any database query errors
        throw new BadRequestError('Bad request.');
    }
}

router.get('/api/jobs', async (req: Request, res: Response) => {
    const title = req.query.title as string | null;
    const description = req.query.description as string | null;

    try {
        const filteredJobs = await filterJobs(title, description);

        res.status(200).json(filteredJobs);
    } catch (error) {
        // Handle errors appropriately
        throw new BadRequestError('An error occured during the query');
    }
});

export { router as getFilteredJobs }