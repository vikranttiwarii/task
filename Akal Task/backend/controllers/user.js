const usermodel = require('../models/user');
const bcrypt = require('bcrypt');

exports.addUser = async (req, res) => {
    try {
        let existUser = await usermodel.findOne({ email: req.body.email })

        if (existUser) {
            res.status(200).json({
                error: true
            })
        } else {
            const hashPassword = await bcrypt.hash(req.body.password, 10);

            const userObj = {
                fullName: req.body.fullName,
                email: req.body.email,
                password: hashPassword,
                contactNumber: req.body.contactNumber
            }

            await usermodel.create(userObj);

            res.status(201).json({
                error: false
            })
        }
    } catch (error) {
        console.log(error);
    }
}

exports.getUser = async (req, res) => {
    try {
        const {pageSize,pageIndex} = JSON.parse(req.params.parm)
        const skip = pageSize * (pageIndex + 1 - 1);

        if(skip==0){
            var count = await usermodel.find().count();
        }

        let data = await usermodel.find().limit(pageSize).skip(skip);

        res.status(200).json({
            data: data,
            count: count
        })
    } catch (error) {
        console.log(error);
    }
}

exports.updateUser = async (req, res) => {
    try {
        productId = req.params.id

        const updateData = {
            fullName: req.body.fullName,
            email: req.body.email,
            contactNumber: req.body.contactNumber
        }

        await usermodel.findByIdAndUpdate(productId, updateData)

        res.status(200).json({
            error: false
        })

    } catch (error) {
        res.send({ error: true })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        productId = req.params.id
        console.log(productId,'productId')

        await usermodel.deleteOne({_id:productId})

        res.status(200).json({
            error: false
        })
    } catch (error) {
        console.log(error)
    }
}