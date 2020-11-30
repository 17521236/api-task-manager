const User = require('../models/user.model')
const md5 = require('md5')

module.exports = {
    create: async(req, res) => {
        var email = req.body.email;
        var password = req.body.password;
        var name = req.body.name;
        if (!email || email === '' || !password || !name) {
            res.send({
                result: '0',
                message: 'Please complete all information'
            })
        }
        // validate
        var user = await User.find({ email: req.body.email })
        if (user.length === 0) {
            req.body.password = md5(req.body.password);
            await User.create(req.body)
                .then(value => res.send({
                    result: '1',
                    value: {...value }
                }))
                .catch(err => res.send({
                    result: '0',
                    message: 'Create user failed !',
                    error: err
                }))
        } else {
            res.send({
                result: '0',
                message: 'Email existed !'
            })
        }
    }
}