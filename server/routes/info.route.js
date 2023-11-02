import express from 'express';
const route = express.Router();
import { get_info, insert_discount, discount_code, update_bulb } from '../controllers/info.js'

route.get('/get', async (req, res) => {
    try {
        const _out = await get_info(req.body)

        return res.json(_out)
    } catch (error) {
        return res.json({ status: false, message: error });
    }
})

route.post('/insert', async (req, res) => {
    try {
        const _out = await insert_discount(req.body)

        return res.json(_out)
    } catch (error) {
        return res.json({ status: false, message: error });
    }
})

route.post('/submit', async (req, res) => {
    try {
        const _out = await discount_code(req.body)
        console.log(req.body)
        console.log('out', _out)

        return res.json(_out)
    } catch (error) {
        return res.json({ status: false, message: error });
    }
  })

route.post('/update', async (req, res) => {
    try {
        const _out = await update_bulb(req.body)
        // console.log('body', req.body)
        // console.log('out', _out)

        return res.json(_out)
    } catch (error) {
        return res.json({ status: false, message: error });
    }
})

export default route;