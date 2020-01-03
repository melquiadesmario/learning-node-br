const { deepEqual, ok } = require('assert')

const database = require('./database')

const DEFAULT_HERO_REGISTER = {
    id: 1,
    name: 'Flash',
    power: 'Speed'
}

describe('Hero manipulation suite', () => {
    before(async () => {
        await database.store(DEFAULT_HERO_REGISTER)
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
})