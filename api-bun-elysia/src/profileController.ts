import User from "./models/User";

type Group = {
    color: string,
    name: string,
    icon: string
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
            const user = await User.findById(id);
            if (!user) {
                return new Response("No user found with this id", {
                    status: 400
                })
            }
            const {photo} = body
            if (photo !== undefined && photo !== null) {
                user.photo = body.photo
                user.save()
            }
            else {
                return new Response("Photo is null or undefined", { status: 400})
            }
            return "Profile photo updated successfully"
        } catch (e) {
            return new Response('Photo update error', {
                status: 400
            })
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
            const objects: string[] = []
            for (const i of user.groups) {
                objects.push(i.name)
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