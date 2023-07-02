const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

exports.getAllAnimalForSale = async (req, res) => {
    try{
        const animals = await prisma.animal_for_sale.findMany({
            where : { user_id: req.user.id},
        })
        res.status(200).json(animals)
    }catch(err){
        res.status(500).json({ message: err.message})
    }
}

exports.getAnimalForSale = async (req, res) =>{
    const { id }  = req.params;
    try{
        const animal = await prisma.animal_for_sale.findUnique({
            where: { id: Number(id)}
        })
        res.status(200).json(animal)
    }catch(err){
        res.status(500).json({ message: err.message})
    }
}

exports.createAnimalforSale = async (req, res) => {
    const { name , species, birthdate, price, gender } = req.body;
    const user_id = req.user.id
    try{
        newAnimal = await prisma.animal_for_sale.create({
            data: {
                name, species, 
                birthdate, price, 
                gender, user_id
            }
        })

        res.status(201).json(newAnimal)
    }catch(err){
        res.status(500).json({ message: err.message})
    }
}

exports.updateAnimalForSale = async (req, res) => {
    const { id } = req.params
    const { name, species, birthdate, price, gender } = req.body

    try{
        const updateAnimal = await prisma.animal_for_sale.update({
            where: { id: Number(id)}, 
            data: {
                name, species, 
                birthdate, price, gender
            }
        })

        res.status(200).json(updateAnimal)
    }catch(err){
        res.status(500).json({ message: err.message})
    }
}

exports.deleteAnimalForSale = async (req, res) => {
    const { id } = req.params
    try{
        await prisma.animal_for_sale.delete({
            where:{id: Number(id)}
        })
        res.status(201).json({ message: "animal supprimer"})
    }catch(err){
        res.status(500).json({ message: err.message})
    }
}