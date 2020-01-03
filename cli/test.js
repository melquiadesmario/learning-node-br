const { deepEqual, ok } = require('assert')

const database = require('./database')

const DEFAULT_HERO_REGISTER = {
    id: 1,
    name: 'Flash',
    power: 'Speed'
}

const DEFAULT_HERO_UPDATE = {
    id: 2,
    name: 'Green Lantern',
    power: 'Ring energy'
}

describe('Hero manipulation suite', () => {
    before(async () => {
        await database.store(DEFAULT_HERO_REGISTER)
        await database.store(DEFAULT_HERO_UPDATE)
    })

    it('must search for a hero, using files', async () => {
        const expected = DEFAULT_HERO_REGISTER
        const [result] = await database.toList(expected.id)
        
        deepEqual(result, expected)
    })

    it('must register a hero, using files', async () => {
        const expected = DEFAULT_HERO_REGISTER
        const result = await database.store(DEFAULT_HERO_REGISTER)
        const [current] = await database.toList(DEFAULT_HERO_REGISTER.id)

        deepEqual(current, expected)
    })

    it('must modify a hero by id', async () => {
        const expected = {
            ...DEFAULT_HERO_UPDATE,
            name: 'Batman',
            power: 'Money'
        }

        const newData = {
            name: 'Batman',
            power: 'Money'
        }

        await database.modify(DEFAULT_HERO_UPDATE.id, newData)
        
        const [result] = await database.toList(DEFAULT_HERO_UPDATE.id)

        deepEqual(result, expected)
    })

    it('must remove a hero by id', async () => {
        const expected = true
        const result = await database.remove(DEFAULT_HERO_REGISTER.id)

        deepEqual(result, expected)
    })
})