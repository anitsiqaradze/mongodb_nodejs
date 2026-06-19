const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {
    register: async (req, res) => {
        try {
            const body = req.body;

            if (!body.username || !body.password) {
                return res.status(400).json({
                    message: 'required params are missing'
                })
            }

            const exists = await UserModel.findOne({ username: body.username });
            if (exists) {
                return res.status(409).json({
                    message: 'such user already exists'
                })
            }

            const hashPassword = bcrypt.hashSync(body.password, 10);

            const user = await new UserModel({
                username: body.username,
                password: hashPassword,
                active: body.active,
                permits: body.permits
            }).save();


            const token = await jwt.sign({
                _id: user._id,
                username: user.username,
                active: user.active,
                permits: user.permits
            }, process.env.SECRET_KEY);

            res.header('x-session-token', token);
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error });
        }
    },
    login: async (req, res) => {
        try {
            const body = req.body;

            if (!body.username || !body.password) {
                return res.status(400).json({
                    message: 'required params are missing'
                })
            }

            const user = await UserModel.findOne({
                username: body.username
            });

            if (!user) {
                return res.status(404).json({
                    message: 'user not found'
                });
            }

            if (bcrypt.compareSync(body.password, user.password)) {
                const token = await jwt.sign({
                    _id: user._id,
                    username: user.username,
                    active: user.active,
                    permits: user.permits
                }, process.env.SECRET_KEY);
    
                res.header('x-session-token', token);
                res.json({ success: true });
            } else {
                return res.status(404).json({
                    message: 'user not found'
                });
            }

        } catch (error) {
            res.status(500).json({ error });
        }
    },
    getActive: async(req, res)=>{
        try {
        const users = await UserModel.find(
            { "active": true }
       
        )
        res.json(users)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
  
}