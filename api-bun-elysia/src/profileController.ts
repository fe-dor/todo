import User from "./models/User";
import Priority from "./models/Priority";
import Note from "./models/Note";



class ProfileController {
    async profile(id: string | number) {
        try {
            const user = await User.findById(id);
            if (!user) {
                return new Response("No user found with this id", {
                    status: 400
                })
            }
            return {
                "email" : user.email,
                "username": user.username,
                "photo": user.photo
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

    async info() {
        const note = new Note({

        })

        return "cool"
    }

}

export default new ProfileController()