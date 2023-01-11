import express from 'express'
import { Auto } from '../types/auto.type'
const router = express.Router()

router.get('/', async (req, res) => {
    let orderBy = 'price'
    let orderType = 'asc'

    if (req.query.orderBy) {
        orderBy = `${req.query.orderBy}`
    }

    if (req.query.orderType) {
        orderType = `${req.query.orderType}`
    }

    const items = await req.db?.list(orderBy, orderType)
    res.status(200).send(items)
})

router.post('/', async (req, res) => {
    const payload: Auto = req.body
    const result = await req.db?.add({
        ...{
            brand: 'noname',
            name: 'noname',
            price: 0,
            year: 0
        },
        ...payload
    })
    res.status(200).send({
        status: result
    })
})

router.patch('/:id', async (req, res) => {
    const id: string = req.params.id
    const payload: Auto = req.body
    const result = await req.db?.edit(id, payload)
    res.status(200).send({
        status: result
    })
})

router.delete('/:id', async (req, res) => {
    const id: string = req.params.id
    const result = await req.db?.del(id)
    res.status(200).send({
        status: result
    })
})

export default router