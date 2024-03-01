import User from "./models/User";



class ProfileController {
    async profile(id: string | number) {
        try {
            const user = await User.findById(id);
            if (!user) {
                return "No user found with this id"
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