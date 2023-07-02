const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const path = require('path')

exports.createAnimal = async (req, res) => {
  const { name, species, ring, gender, birthdate} = req.body;
  const user_id = req.user.id;
  const image = req.file ? path.join('images',String(req.user.id), req.file.filename) : null;

  try {
    const newAnimal = await prisma.animal.create({
      data: {
        name,
        species,
        ring,
        gender,
        birthdate,
        user_id,
        image,
      },
    });
    res.status(201).json(newAnimal);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.getAllAnimals = async (req, res) => {
    try{
        const animals = await prisma.animal.findMany({
            where : { user_id: req.user.id}
        })

        res.status(200).json(animals)
    }catch(err){
        res.status(500).json({ message: err.message})
    }
}

exports.getAnimal = async (req, res) => {
    const { id } = req.params;
    try {
      const animal = await prisma.animal.findUnique({
        where: { id: Number(id) },
        include: {
          pair: true
        }
      });
  
      if (!animal) {
        return res.status(404).json({ message: 'Animal not found' });
      }
  
      let pairAnimal = null;
  
      // If the animal is in a pair, find the other animal
      if (animal.pair) {
        pairAnimal = await prisma.animal.findFirst({
          where: {
            pair_id: animal.pair_id,
            id: {
              not: animal.id,  // Exclude the current animal
            },
          },
        });
      }
  
      const animalWithPair = { ...animal, pair: pairAnimal };
  
      res.json(animalWithPair);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}

exports.updateAnimal = async (req, res) => {
  const { name, species, ring, gender, birthdate} = req.body;
  const user_id = req.user.id;
  const image = req.file ? path.join('images', req.file.filename) : null;

  try {
    const updatedAnimal = await prisma.animal.update({
      where: { id: Number(req.params.id) },
      data: {
        name,
        species,
        ring,
        gender,
        birthdate,
        user_id,
        image,
      },
    });
    res.json(updatedAnimal);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.deleteAnimal= async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAnimal = await prisma.animal.delete({ 
      where: { id: Number(id)}
    });

    res.status(200).json({ message: "animal supprimer"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}