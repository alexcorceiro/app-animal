const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

exports.createStock = async (req, res) => {
    const { name, type, description, quantity, purchase_date } = req.body;
    const userId = req.user.id;
  
    try {
      const newStock = await prisma.stock.create({
        data: {
          name,
          type,
          description,
          quantity,
          purchase_date,
          user_id: userId
        },
      });
  
      res.status(201).json(newStock);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}

exports.getAllStock = async (req, res) => {
    try{
        const stock = await prisma.stock.findMany({
            where: { user_id: req.user.id}
        })

        res.status(201).json(stock)
    }catch(err){
        res.status(500).json({ message: err.message})
    }
}


exports.getStockById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const stock = await prisma.stock.findUnique({ 
        where: { id: Number(id) } 
      });
  
      res.json(stock);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  exports.updateStock = async (req, res) => {
    const { id } = req.params;
    const { name, type, description, quantity, purchase_date } = req.body;
    const user_id = req.user.id;
  
    try {
      const stock = await prisma.stock.update({
        where: { id: Number(id) },
        data: {
          name,
          type,
          description,
          quantity,
          purchase_date, 
          user_id
        },
      });
  
      res.json(stock);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  exports.deleteStock = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
  
    try {
      const stock = await prisma.stock.findUnique({ where: { id: Number(id) } });
  
      if (!stock) {
        return res.status(404).json({ message: 'Stock not found' });
      }
  
      if (stock.user_id !== userId) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      await prisma.stock.delete({ where: { id: Number(id) } });
  
      res.json({ message: 'Stock deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  
exports.getUserStock = async (req, res) => {
  const user_id = req.user.id;

  try {
      const stocks = await prisma.stock.findMany({
          where: {
              user_id: user_id
          }
      });

      let total = 0;

      stocks.forEach(stock => {
          total += Number(stock.quantity);
      });

      res.status(200).json({ total: total });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};