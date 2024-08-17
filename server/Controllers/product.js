const Product = require('../Models/Product')
const fs = require('fs')

exports.read = async (req,res) => {
    try {
        //code
        const id = req.params.id
        const producted = await Product.find({_id: id}).exec();
        res.send(producted)
    }catch(err) {
        //error
        console.log(err)
        res.status(500).send('server error')
    }
}

exports.list = async (req,res) => {
    try {
        //code
        const producted = await Product.find({}).exec();
        res.send(producted)
    }catch(err){
        //error
        console.log(err)
        res.status(500).send('server error')
    }
}

exports.create = async (req,res) => {
    try {
        //code
        var data = req.body
        if (req.file){
            data.file = req.file.filename
        }
        const producted = await Product(data).save()
        res.send(producted)
    }catch(err) {
        //error
        console.log(err)
        res.status(500).send('server error')
    }
}

exports.update = async (req,res) => {
    try {
        //code
         const id = req.params.id
         var newData = req.body
         console.log(newData)
         console.log(req.file)
        if(typeof req.file !== 'undefined'){
            newData.file = req.file.filename
            await fs.unlink('./uploads/' + newData.fileold, (err) => {
                if (err) {
                    console.log(err)
                }else {
                    console.log ('edit success')
                }
            })
        }
        var Updata = await Product
        .findOneAndUpdate({_id: id}, newData, {new: true})
        .exec()
        console.log("update success");
        res.send(Updata);
    }catch(err) {
        //error
        console.log(err)
        res.status(500).send('server error')
    }
}

exports.remove = async (req,res) => {
    try {
        //code
        const id = req.params.id
        const removed = await Product.findOneAndDelete({_id: id}).exec()
        if (removed?.file) {
            await fs.unlink('./uploads/' + removed.file, (err) => {
                if (err) {
                    console.log(err)
                }else {
                    console.log ('remove success')
                }
            })
        }
        res.send(removed)
    }catch (err) {
        //error
        console.log(err)
        res.status(500).send('server error')
    }
}