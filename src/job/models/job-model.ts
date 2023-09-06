import mongoose from 'mongoose';

interface JobAttrs {
    title: string;
    description: string;
    userIds: string[];
}

interface JobDoc extends mongoose.Document {
    title: string;
    description: string;
    userIds: string[];
}

interface JobModel extends mongoose.Model<JobDoc> {
    build(attrs: JobAttrs): JobDoc;
}

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        userIds: {
            type: Array
        }
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);

jobSchema.statics.build = (attrs: JobAttrs) => {
    return new Job(attrs);
};

const Job = mongoose.model<JobDoc, JobModel>('Job', jobSchema);

export { Job };