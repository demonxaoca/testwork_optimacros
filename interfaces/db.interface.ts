import {Auto} from '../types/auto.type'
export interface DB {
    connect: () => Promise<boolean>
    list: (orderBy: string, orderType: string) => Promise<Array<Auto>>
    add: (payload: Auto) => Promise<boolean>
    edit: (id: string, payload: Auto) => Promise<boolean>
    del: (id: string) => Promise<boolean>
}