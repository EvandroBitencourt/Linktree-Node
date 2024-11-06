import Profile from "../models/Profile"

class DashboardController {
  async show(req, res){
		const {user_id} = req.headers

		const profile = await Profile.find({user: user_id})
		return res.json(profile)
	}
}

export default new DashboardController()