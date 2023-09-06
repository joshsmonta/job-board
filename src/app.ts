import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found-error';

import { currentUserRouter } from './user/routes/current-user';
import { signinRouter } from './user/routes/signin';
import { signOutRouter } from './user/routes/signout';
import { signUpRouter } from './user/routes/signup';

import { createJobRouter } from './job/routes/create-job';
import { updateJobRouter } from './job/routes/update-job';
import { getFilteredJobs } from './job/routes/get-job';
import { deleteJobRouter } from './job/routes/delete-job';
import { applyToJobRouter } from './job/routes/apply-job';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: false
}));

//User Features
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signOutRouter);
app.use(signUpRouter);

//Job Features
app.use(createJobRouter);
app.use(updateJobRouter);
app.use(getFilteredJobs);
app.use(deleteJobRouter);
app.use(applyToJobRouter);


app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };