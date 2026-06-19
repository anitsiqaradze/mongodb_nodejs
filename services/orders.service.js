var OrderModel = require('../models/orders');
const mongoose = require('mongoose');

module.exports = {
    add: async (req, res) => {
            try {
                const savedItem = await new OrderModel(req.body).save();
                res.json(savedItem);
            } catch (error) {
                res.status(500).json(error);
            }
        },
    countByStatus: async(req, res)=>{
        //     try {
        //     const result = await  OrderModel.aggregate([
        //         {
        //             $group: {
        //                 _id: '$status',
        //                 count: { $sum: 1 }
        //             }
        //         }
        //     ]);

        //     res.json(result)
        // }   catch (err) {
        //     res.status(500).json({ error: err.message })
        // }

         try {
        const result = await OrderModel.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                    orderId: { $first: '$_id' },
                    userId: { $first: '$userId' }
                }
            },
            {
                $project: {
                    _id: 0,
                    status: '$_id',
                    orderId: 1,
                    userId: 1,
                    count: 1
                }
            }
        ]);

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
      }
     },

     topSpenders: async (req, res) => {
        try {
            const result = await OrderModel.aggregate([
                {
                    $group: {
                        _id: '$userId',
                        totalSpend: { $sum: '$totalAmount' }
                    }
                },
                { $sort: { totalSpend: -1 } },
                { $limit: 5 }
            ]);

            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


}
 
 