const usermodel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async (req,res)=>{
    try {
        let existUser = await usermodel.findOne({ email: req.body.email })

        if (existUser) {

            const comparePass = await bcrypt.compare(req.body.password,existUser.password);

            if(comparePass){

                const token = jwt.sign({_id:existUser._id},process.env.SECRET_KEY)

                res.status(200).json({
                    token: token,
                    error:false
                })
            }else{
                res.status(200).json({
                    error:true
                })
            }
        }else{
            res.status(200).json({
                error:true
            })
        }
    } catch (error) {
        console.log(error)
    }
}