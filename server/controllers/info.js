import { MongoClient } from 'mongodb';
const url = 'mongodb+srv://bupbee:bulbeepassword@bulbeedb.oqjikje.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(url)
client.connect();

export async function get_info(req) {
    try {
        const database = client.db('usersDB')
        const col = database.collection('info')

        const user = await col.findOne({ sid: req.sid })

        return user
    } catch(error) {
        return { status: false, result: error}
    }
}

export async function insert_discount(req) {
    try {
        const database = client.db('usersDB')
        const col = database.collection('info')

        const user = await col.insertOne({ sid: req.sid, discount: [{code: 'universal', amount: 50}, {code: 'massive', amount: 1000}], bulb: 10000})

        return user
    } catch(error) {
        return { status: false, result: error}
    }
}

export async function discount_code(req) {
    try {
        const database = client.db('usersDB');
        const col = database.collection('info');

        const ref = { sid: req.sid }

        const existed = await col.findOne({ sid: req.sid }, { projection: {_id: 0}})
        console.log('existed', existed)
        console.log('discount array', existed.discount)

        for (const data of existed.discount) {
            if (data.code === req.code) {
                const _out = { "amount": data.amount}
                console.log('out', _out)
                const remove = await col.updateOne(ref, {$pull: {discount: data}})
                if (remove.modifiedCount === 1) {
                    console.log('Discounted Succesfully')
                } else {
                    console.log('Failed to discount')
                }
                return _out
            }
            return { "amount": 0}
        }
        console.log('Discount doesnt exist')
        
        return { "amount": 0}
    } catch(error) {
        return { status: false, result: error}
    }
}

export async function update_bulb(req) {
    try {
        const database = client.db('usersDB')
        const col = database.collection('info')

        const ref = { sid: req.sid }
        const user = await col.findOne(ref)

        // console.log(user)
        // console.log(user.bulb)
        // console.log(req.total)

        const calculate = parseFloat(user.bulb) - parseFloat(req.total);
        console.log('calculate', calculate)

        if (calculate >= 0) {
            const updated = await col.updateOne(ref, { $set: {bulb: calculate}})
            console.log('updated', updated)
            return { status: true, result: 'success'}
        } else {
            return { status: false, result: 'not enough bulb'}
        }

    } catch(error) {
        return { status: false, result: error}
    }
}