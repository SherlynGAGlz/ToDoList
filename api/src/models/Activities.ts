import { model, Schema } from "mongoose"

interface IActivities{
    title: String,
    dateEnd: Date,
    description: string,
    status: "active" | "pending",
    idUser: Schema.Types.ObjectId | string
}

const ActivitySchema = new Schema <IActivities>({
    title:{
        type: String,
        required: true
    },
    dateEnd:{
        type: Date,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
        enum:["active", "pending"]
    },
    idUser:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
}, {timestamps: true});

export const ActivityModel = model<IActivities>('activities', ActivitySchema);