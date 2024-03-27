import User from "./models/User";
import {Types} from "mongoose";

type Group = {
    color: string,
    name: string,
    icon: string
}

type GroupNameId = {
    name: string,
    id: Types.ObjectId | undefined
}
class ProfileController {
    //категории, имя, почта, фото
    async getProfile(id: string | number) {
        try {
            const user = await User.findById(id);
            if (!user) {
                return new Response("No user found with this id", {
                    status: 400
                })
            }
            const objects: Group[] = []
            for (const i of user.groups) {
                objects.push({color: i.color, name: i.name, icon: i.icon})
            }
            return {
                "email" : user.email,
                "username": user.username,
                "photo": user.photo,
                "groups": objects
            }
        } catch (e) {
            return new Response('Profile error', {
                status: 400
            })
        }
    }

    async updatePhoto(id: string | number, body: {photo: string}) {
        try {
            await User.findOneAndUpdate({_id: id}, {photo: body.photo}).catch(error => {console.error('error',error);})
            return "Profile photo updated successfully"
        } catch (e) {
            return new Response('Photo update error', {status: 400})
        }
    }


    //Все кроме пароля
    async getHome(id: string | number) {
        try {
            const user = await User.findById(id);
            if (!user) {
                return new Response("No user found with this id", {
                    status: 400
                })
            }
            return user
        } catch (e) {
            return new Response('Can\'t get home', {
                status: 400
            })
        }
    }

    async getGroups(id: string | number) {
        try {
            const user = await User.findById(id);
            if (!user) {
                return new Response("No user found with this id", {
                    status: 400
                })
            }
            const objects: GroupNameId[] = []
            for (const i of user.groups) {
                objects.push({name: i.name, id: i._id})
            }
            return {
                "groups": objects
            }
        } catch (e) {
            return new Response('Can\'t get groups', {
                status: 400
            })
        }
    }

}

export default new ProfileController()