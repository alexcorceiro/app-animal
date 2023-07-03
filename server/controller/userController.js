const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const generateToken = (userId) => {
    return jwt.sign({id: userId}, process.env.SCERET_JWT,{expiresIn: "1d"});
}

exports.register= async (req,res) => {
    const { lastName, firstName, email, password, confirmPassword } = req.body
    const hasedPasssword = await bcrypt.hash(password, 10)

    if(password !== confirmPassword){
        return res.status(400).json({ message: "les mot de passe ne sont pas identique"})
    }
    try{
        const user = await prisma.users.create({
            data:{
                firstName,
                lastName, 
                email, 
                password: hasedPasssword
            }
        })

        const token = generateToken(user.id)
        res.status(201).json({ message: "utilisateur cree", token})
    }catch(err){
        res.status(500).json({ message: err.message})
    }
}

exports.login = async (req, res) =>{
    const {email, password } = req.body

    try{
        const user = await prisma.users.findUnique({ where : {email}})

        if(!user){
            return res.status(400).json({ message: 'Utilisateur introuvable'})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if(!isPasswordCorrect){
            return res.status(400).json({ message: "mot de passe invalide"})
        }

        const token = generateToken(user.id)

        res.status(201).json({
            message: "connection avec succee", 
            token
        })  
     }catch(err){
        res.status(500).json({ message: err.message})
     }
}

exports.updateUser = async (req, res) => {
    const { firstName, lastName, email, city, country, address} = req.body
    try{
       const user = await prisma.users.update({
        where : {
            id: req.user.id
        }, 
        data : {
            firstName: firstName, 
            lastName: lastName,
            email: email, 
            city: city, 
            address: address, 
            country: country
        }
       })

       res.status(200).json({ user })
    }catch(err){
        res.status(500).json({ message: err.message})
    }
}

exports.updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body

  try{
    const user = await prisma.users.findUnique({
        where: {
            id: req.user.id
        }
    })

    const validPassword = await bcrypt.compare(oldPassword, user.password)

    if(!validPassword){
        return res.status(400).json({ message: "mot de passe invalide "})
    }

    const hasedPasssword = await bcrypt.hash(newPassword, 10)

    await prisma.users.update({ 
        where: {
            id: req.user.id,
        }, 
        data : {
            password: hasedPasssword
        }
    })
    res.status(200).json({ message: 'mot de passe mis a jour avec succée'})
  }catch(err){
    res.status(500).json({ message: err.message})
  }
  }

  exports.getProfile = async (req, res) => {
    try{
        const user = await prisma.users.findUnique({
            where: {
                id: req.user.id
            }
        })
        res.status(201).json(user)
    }catch(err){
        res.status(500).json({ message: err.message})
    }
  }

exports.deleteUser = async (req, res) => {
    const user = await prisma.users.delete({
        where: {
            id: req.user.id
        }
    })

    res.json(200).json({ message: `a Bientot ${user.lastName}`})
}