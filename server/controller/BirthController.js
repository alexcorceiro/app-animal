const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

exports.getAllBirth = async (req, res) => {
    try {
        const births = await prisma.birth.findMany({
            include: { pair: true },
        });

        const detailedBirths = await Promise.all(
            births.map(async (birth) => {
                const pair = await prisma.pair.findUnique({
                    where: { id: birth.pair_id },
                });
  
                const male = await prisma.animal.findUnique({
                    where: { id: pair.male_id },
                });
  
                const female = await prisma.animal.findUnique({
                    where: { id: pair.female_id },
                });

                return { ...birth, pair: { ...pair, male, female }};
            })
        );

        res.status(200).json(detailedBirths);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getBirthById = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const birth = await prisma.birth.findUnique({
            where: { id: id },
            include: { pair: true },
        });
  
        if (!birth) {
          return res.status(404).json({ message: 'Birth not found' });
        }
  
        const pair = await prisma.pair.findUnique({
            where: { id: birth.pair_id },
        });
  
        const male = await prisma.animal.findUnique({
            where: { id: pair.male_id },
        });
  
        const female = await prisma.animal.findUnique({
            where: { id: pair.female_id },
        });
  
        const birthWithDetails = { ...birth, pair: { ...pair, male, female }};
  
        res.json(birthWithDetails);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.createBirth= async (req,res) => {
    const { date, number_babies, animalName } = req.body;
    try {
        const animal = await prisma.animal.findFirst({
            where: { name: animalName },
          });
      if (!animal) {
        return res.status(404).json({ error: 'No animal found with this name' });
      }
      const pair = await prisma.pair.findFirst({
        where: {
          OR: [
            { male_id: animal.id },
            { female_id: animal.id },
          ],
        },
      });
      if (!pair) {
        return res.status(404).json({ error: 'No pair found for this animal' });
      }
      const newBirth = await prisma.birth.create({
        data: { date, number_babies, pair_id: pair.id },
      });
      res.status(201).json(newBirth);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}

exports.updateBirth = async (req, res) => {
  const { id } = req.params;
  const { date, number_babies, animalName } = req.body;
  try {
      const birth = await prisma.birth.findUnique({
          where: { id: Number(id) },
      });
      if (!birth) {
          return res.status(404).json({ error: 'No birth found with this id' });
      }
      const animal = await prisma.animal.findFirst({
          where: { name: animalName },
      });
      if (!animal) {
          return res.status(404).json({ error: 'No animal found with this name' });
      }
      const pair = await prisma.pair.findFirst({
          where: {
              OR: [
                  { male_id: animal.id },
                  { female_id: animal.id },
              ],
          },
      });
      if (!pair) {
          return res.status(404).json({ error: 'No pair found for this animal' });
      }
      const updatedBirth = await prisma.birth.update({
          where: { id: Number(id) },
          data: { date, number_babies, pair_id: pair.id },
      });
      res.status(200).json(updatedBirth);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}

exports.deleteBirth = async (req ,res ) => {
    const { id } = req.params
    try {
        await prisma.birth.delete({
            where: { id: Number(id)}
        })
        res.status(204).json({ message: "naissance supprimer"})
    }catch(err){
        res.status(500).json({ message: err.message})
    }
}

exports.getTotalBabies = async (req, res) => {
    try {
        const births = await prisma.birth.findMany();
        const totalBirths = births.reduce((total, birth) => total + birth.number_babies, 0);
        res.json({ totalBirths });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}