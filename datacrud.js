require("./database")
const express = require('express')
const router = express.Router()
const collection = require('./collection')
const kart = require('./kart')
const users = require('./users')
const admin = require('./admin')
const cors = require('cors')

const bodyParser = require('body-parser')
const { Collection } = require("mongoose")

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())
router.use(cors())




// router.post("/signup", async (request, response) => {
//     const newuser = new users(request.body)
//     await newuser.save()
//     response.json(newuser)
// })





router.post("/signup", async (request, response) => {
    const  usernamein = request.body.username;
    const exist = await users.findOne({ username: usernamein });
    if (exist) {
        response.json({message: "User already exists"})
    }
    else {
        const newuser = new users(request.body);
        await newuser.save();
        response.json({newuser})
    }
        
})

router.post('/checklogin', async (request, response) => {
    const user = request.body.username;
    const pass = request.body.password;
    const t = await users.findOne({ '$and': [{ "username": { '$eq': user } }, { "password": { '$eq': pass } }] });

    if (t) {
        const m = await kart.find({ "username": { "$eq": t.username } });
        response.json({ user: t, kart: m });
    } else {
        response.json({ message: "error" });
    }
});


router.post('/adminchecklogin', async (request, response) => {
    const user = request.body.username;
    const pass = request.body.password;
    const t = await admin.findOne({ '$and': [{ "username": { '$eq': user } }, { "password": { '$eq': pass } }] });

            response.json({ user: t });
    
});



router.post("/insertcollection", async (request, response) => {
    const proid = request.body.itemid;
    const exist = await collection.findOne({ itemid: proid });
    if (exist) {
        response.json({ message: "product already exists" })
    }
    else {
        const newproduct = new collection(request.body);
        await newproduct.save();
        response.json({ newproduct })
    }
})


router.put("/insertcart", async (request, response) => {
    const username = request.body.username
    const itemname = request.body.itemname
    const itemprice = request.body.itemprice
    const itemid = request.body.itemid
    const quantity = request.body.quantity
    let cartItem = await kart.findOne({ username: username, itemid: itemid });

    if (cartItem) {
        cartItem.quantity += quantity;
    }
    else {
        cartItem = new kart({
            username: username,
            itemname: itemname,
            itemprice: itemprice,
            itemid: itemid,
            quantity: quantity
            });
        }

    await cartItem.save();
    response.json({ message: cartItem })

})



router.delete("/kart/:id", async (request, response) => {
    const itemId = request.params.id;
        await kart.deleteOne({ _id: itemId });
        response.json({ message: "Item deleted successfully" });
    
});





router.get("/users", async (request, response) => {
        const allusers = await users.find();
        response.json(allusers);
});

router.get("/kart/:username", async (request, response) => {

        const userkart = await kart.find({ username: request.params.username });
        response.json(userkart);
    
});

router.get("/collection", async (request, response) => {
    
        const allcollection = await collection.find();
        response.json(allcollection);
   
});







































// routers

// router.delete('/many/:location', async (request, response) => {
//     const data = await bluedart.deleteMany({ receiverAddress: { '$eq': request.params.location } })
//     response.json(data)
// })

// router.delete('/erase/:id', async (request, response) => {
//     const data = await bluedart.findByIdAndDelete(id = request.params.id)
//     response.json(data)
// })

// router.put('/modify', async (request, response) => {
//     const data = await bluedart.updateMany({ status: { '$eq': "Transit" } }, { status: "Return" })
//     response.json(data)
// })

// router.put('/', async (request, response) => {
//     const data = await bluedart.findByIdAndUpdate(id = request.body._id, request.body, { new: false })
//     response.json(data)
// })

// router.get('/status/:given', async (request, response) => {
//     // const found = await bluedart.findOne({"status":{'$eq':request.params.given}})
//     const found = await bluedart.find({ "status": { '$eq': request.params.given } })
//     response.json(found)
// })

// router.get('/:id', async (request, response) => {
//     const consignment = await bluedart.findById(id = request.params.id)
//     response.json(consignment)
// })

// router.post("/deliver", async (request, response) => {
//     const newItem = new bluedart(request.body)
//     await newItem.save()
//     response.json(newItem)
// })

// router.get('/', async (request, response) => {
//     const tracks = await bluedart.find()
//     response.json(tracks)
// })

module.exports = router