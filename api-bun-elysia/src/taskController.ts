import UserTemp from "./models/UserTemp";
import User from "./models/User";
import Group from "./models/Group";
import Note from "./models/Note";
import {Types} from "mongoose";

type Task = {
    name: string,
    group: string,
    date: string,
    localDay: string,
    localTime: string,
    priority: number,
    description: string
}

class TaskController {
    async createTask(id: string | number, body: Task) {
        try {
            const note = new Note({
                name: body.name,
                date: new Date(body.date),
                localDay: body.localDay,
                localTime: body.localTime,
                priority: body.priority,
                description: body.description
            })
            console.log(id, body.group)
            User.updateOne(
                { _id: id, 'groups._id': new Types.ObjectId(body.group) },
                {
                    $push: { 'groups.$[group].notes': note }
                },
                {
                    arrayFilters: [{ 'group._id': new Types.ObjectId(body.group) }]
                }
            ).then(result => {
                console.log('success',result);
            }).catch(error => {
                console.error('error',error);
            });

            return "cool"
        }
        catch (e) {
            console.log(e);
            return e
        }
    }
}

export default new TaskController()