const mongoose = require('mongoose')
const userModel = require('../model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const JWT_SECRET_KEY = "hsdjasfhsfvhvcfklvhvl"

exports.post = async (req, res) => {
    let { name, mobile, emailID, password, city, country } = req.body;
    const User_Find = await userModel.findOne({ emailID });
    if (User_Find) {
        res.send({ status: 0, message: "Email Already Exists" })
    } else {
        if (name && mobile && emailID && password && city && country) {
            try {
                const salt = await bcrypt.genSalt(10)
                const hashPassword = await bcrypt.hash(password, salt)
                const token = await jwt.sign({ UserID: User_Find }, JWT_SECRET_KEY, { expiresIn: "1d" })
                const data = new userModel({
                    name: name,
                    mobile: mobile,
                    emailID: emailID,
                    Password: hashPassword,
                    password: password,
                    city: city,
                    country: country,
                    jwt: token
                })
                let result = await data.save()
                console.log(result)
                res.send({status: 1,message: "Data Inserted Successfully",data: data});
            } catch (err) {
                console.log(err);
                res.send({ status: 0, message: "Unable to Register" });
            }
        }
        else {
            res.send({status: 0, message: "All Fields are Required"});
        }
    }
}

exports.get = async (req, res) => {
    let data = await userModel.find()
    console.log(data)
    res.send(data)
}

exports.put = async (req, res) => {
    let data = await userModel.updateOne(req.params, { $set: req.body })
    console.log(data)
    res.send({status: 1, message: "Update data Successfully"});
}

exports.delete = async (req, res) => {
    let data = await userModel.deleteOne(req.params)
    console.log(data)
    res.send({status: 1, Data: data, message: "Data has been deleted"});
}

exports.get = async (req, res) => {
    console.log(req.params.key)
    let search = await userModel.find({
        $or: [
            { Name: { $regex: req.params.key } },
            { Mobile: { $regex: req.params.key } },
            { Email: { $regex: req.params.key } },
            { City: { $regex: req.params.key } },
            { Country: { $regex: req.params.key } },
        ]
    })
    res.send({status: 1, Data: search, message: "Data Found Successfully" })
    console.log(search)
}