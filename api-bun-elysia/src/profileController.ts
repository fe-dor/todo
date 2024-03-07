import User from "./models/User";



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
            }
        } catch (e) {
            return new Response('Profile error', {
                status: 400
            })
        }
    }
}

export default new ProfileController()