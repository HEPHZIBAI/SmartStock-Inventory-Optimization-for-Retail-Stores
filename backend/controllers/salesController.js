exports.getCitySummary = async (req, res) => {
  try {
    const data = await Sale.aggregate([
      {
        $group: {
          _id: "$city",
          totalUnitsSold: { $sum: "$UnitsSold" },
          totalInventory: { $sum: "$InventoryLevel" },
          stores: { $addToSet: "$StoreID" }
        }
      },
      {
        $project: {
          city: "$_id",
          totalUnitsSold: 1,
          totalInventory: 1,
          totalStores: { $size: "$stores" },
          _id: 0
        }
      }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "City summary failed" });
  }
};
