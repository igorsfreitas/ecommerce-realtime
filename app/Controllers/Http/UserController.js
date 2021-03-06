'use strict'

const UserTransformer = use('App/Transformers/Admin/UserTransformer')

class UserController {
    async me ({ response, transform, auth }) {
        let user = await auth.getUser()
        let userData = transform.item(user, UserTransformer)

        userData.roles = await user.getRoles()

        return response.send(userData)
    }
}

module.exports = UserController
