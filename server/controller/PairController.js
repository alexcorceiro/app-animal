const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

exports.createPair = async (req, res) => {
    const { maleName, femaleName } = req.body;
  const user_id = req.user.id;

  try {
    const male = await prisma.animal.findFirst({ where: { name: maleName, user_id: user_id } });
    const female = await prisma.animal.findFirst({ where: { name: femaleName, user_id: user_id } });

    if (!male || !female) {
      return res.status(404).json({ message: 'Animal not found' });
    }

    if (male.pair_id || female.pair_id) {
        return res.status(400).json({ message: `cette animal est deja en couple : ${male.name || female.name}` });
      }

    const newpair = await prisma.pair.create({
        data: {
          male_id: male.id,
          female_id: female.id
        }
      });

      await prisma.animal.update({
        where: { id: male.id },
        data: { pair_id: newpair.id },
    });

   await prisma.animal.update({
        where: { id: female.id },
        data: { pair_id: newpair.id },
    });

    res.status(201).json(newpair);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPairById = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'id invalide' });
  }

  try {
      const pair = await prisma.pair.findUnique({
          where: { id: id },
      });

      if (!pair) {
        return res.status(404).json({ message: 'couple introuvable ' });
      }

      const male = await prisma.animal.findUnique({
          where: { id: pair.male_id },
      });

      const female = await prisma.animal.findUnique({
          where: { id: pair.female_id },
      });

      const pairWithDetails = { ...pair, male, female };

      res.json(pairWithDetails);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

exports.getAllPairs = async (req, res) => {
    try {
      const pairs = await prisma.pair.findMany({
        include: {
          animal: true,
        },
      });
  
      res.status(200).json(pairs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

exports.updatePair = async (req, res) => {
const { id } = req.params;
const { maleName, femaleName } = req.body
const user_id = req.user.id

try{
    const male = await prisma.animal.findFirst({ where: { name: maleName, user_id: user_id, pair_id: null } });
    const female = await prisma.animal.findFirst({ where: { name: femaleName, user_id: user_id, pair_id: null } });

    if (!male || !female) {
      return res.status(404).json({ message: 'Animal not found or already paired' });
    }

    const updatePair = await prisma.pair.update({
        where: { id: Number(id)},
        data:{
            male_id: male.id, 
            female_id: female.id
        }
    });

    await prisma.animal.update({
        where: { id: male.id },
        data: { pair_id: updatePair.id },
    });

   await prisma.animal.update({
        where: { id: female.id },
        data: { pair_id: updatePair.id },
    });

    res.status(200).json(updatePair)
}catch(err){
    res.status(500).json({ message: err.message})
}
};

exports.deletePair = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedPair = await prisma.pair.delete({
        where: { id: parseInt(id) },
      });
      res.json(deletedPair);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};


exports.getPairCount = async (req, res) => {
  try {  
      const pairCount = await prisma.pair.count();
      res.status(200).json({ count: pairCount });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};
