const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

exports.createEvent = async (req, res) => {
    const { title, description, address, date} = req.body
    const user_id = req.user.id

    try{
        const event = await prisma.event.create({
            data : {
                title, 
                description, 
                address, 
                date, 
                user_id
            }
        })

        res.status(201).json(event)
    }catch(err){
        res.status(500).json({ message: err.message})
    }
}

exports.getAllEvent = async (req, res) => {
    try{
        const event = await prisma.event.findMany({
            where: { user_id: req.user.id}
        })

        res.status(201).json(event)
    }catch(err){
        res.status(500).json({ message: err.message})
    }
}

exports.getEvent = async (req, res) => {
    const { id }= req.params
    try{
        const event = await prisma.event.findUnique({
            where : {
                id: Number(id)
            }
        })

        res.status(200).json(event)
    }catch(err){
        res.status(500).json({ message: err.message})
    }
}

exports.updateEvent = async (req,res) => {
    const { id } = req.params
    const { title, description, address, date} = req.body

    try{
        const event = await prisma.event.update({
            where: {id: Number(id)}, 
            data: {
                title, description, address, date 
            }
        })

        res.status(201).json(event)
    }catch(err){
        res.status(500).json({ message: err.message})
    }

}

exports.deleteEvent = async (req, res) => {
    const { id } = req.params
    try{
        await prisma.event.delete({
            where: { id: Number(id)}
        })

        res.status(200).json({ message: "event supprimer"})
    }catch(err){
        res.status(500).json({ message: err.message})
    }
}