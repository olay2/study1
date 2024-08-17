const User = require('../Models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req,res) => {
    try {
        // 1 check user
        const { name, password} = req.body
        var user = await User.findOne({ name })
        if (user) {
            return res.send('user already registered!!!').status(400)
        }
        // 2 encrypt password
        const salt = await bcrypt.genSalt(10)
        user = new User({
            name,
            password
        })
        user.password = await bcrypt.hash(password, salt)
        // 3 save
        await user.save()
        res.send('register successfully')
    }catch(err) {
        console.log(err)
        res.status(500).send('server error: ' + err.message)
    }
}
exports.login = async (req,res) => {
    try {
        // 1 check user
        const { name, password } = req.body
        var user = await User.findOneAndUpdate({ name }, { new: true })
        console.log(user)
        if (user){
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                return res.status(400).send('Password invalid !!!!')
            }
            // 2 payload
            var payload = {
                user: {
                    name: user.name
                }
            }
            // 3 generate token
            jwt.sign(payload, 'jwtsecret', {expiresIn: '1d'}, (err,token) => {
                if (err) throw err;
                res.json({token, payload})   
            })
        }else{
            return res.status(400).send('user not found!!!')
        }
        
    }catch(err) {
        console.log(err)
        res.status(500).send('server error: ' + err.message)
    }
}