const User = require('../models/user')
const bcrypt = require('bcrypt')

const home = (req, res) => {
    res.send('welcome')
}

const showSignUpForm = (req, res) => {
    res.render('auth/sign-up.ejs')
}

const signUp = async (req, res) => {
    const userInDatabase = await User.findOne({
        username: req.body.username
    })
    if(userInDatabase){
        return res.send('Username already taken.')
    }
    
    let userData = {}
    userData.username = req.body.username
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    userData.password = hashedPassword

    const user = await User.create(userData);
    // console.log(req.body)
    res.send(user)
}

const showSignInForm = (req,res) => {
    res.render('auth/sign-in.ejs')
}
const signIn = async (req,res) =>{
    const userInDatabase = await User.findOne({
        username: req.body.username
    })
    if(!userInDatabase){
        return res.send('Log In Not Ok')
    }
    const validPassword = bcrypt.compareSync(
        req.body.password, userInDatabase.password
    )
    if(!validPassword){
        return res.send('Login Failed.')
    }
    console.log(req.body)
    res.send('signed in')
}

module.exports = {
    home,
    showSignUpForm,
    signUp,
    showSignInForm,
    signIn,
}


