import * as dotenv from 'dotenv'
dotenv.config()

import { argv } from 'node:process'
import axios from 'axios'
import { cObject } from './interfaces/custom_object.interface'
import { Auto } from './types/auto.type'

(async () => {
    const [,, action, ...args] = argv

    const [entity, entityAction] = action.split('/') 
    
    let params: cObject = {}
    for (let arg of args) {
        const [param, value] = arg.split('=')
        params[param] = value
    }
    
    const request = axios.create({
        baseURL: `${process.env.BASE_URL}/${entity}`,
        timeout: 5000
    })
    
    console.log(new Date(), params)

    if (entityAction === 'list') {
        const response = await request.get('/', {
            params
        })
        console.log(response?.data)
    }

    if (entityAction === 'add') {
        const payload: Partial<Auto> = {
            ...params
        }
        const response = await request.post('/', payload)
        console.log(response?.data)
    }

    if (entityAction === 'edit') {
        const payload: Partial<Auto> = {
            ...params
        }
        if (!payload.id) {
            console.warn(new Date(), 'provide id for edit')
            process.exit(1)
        }
        const response = await request.patch(`/${payload.id}`, payload)
        console.log(response?.data)
    }

    if (entityAction === 'del') {
        if (!params.id) {
            console.warn(new Date(), 'provide id for edit')
            process.exit(1)
        }
        const response = await request.delete(`/${params.id}`)
        console.log(response?.data)
    }

})()




