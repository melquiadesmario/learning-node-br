const { readFile, writeFile } = require('fs')
const { promisify } = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class Database{
    constructor(){
        this.NAME_FILE = 'heros.json'
    }

    async getFileData(){
        const file = await readFileAsync(this.NAME_FILE, 'utf-8')
        return JSON.parse(file.toString())
    }

    async store(hero){
        const data = await this.getFileData()
        const id = hero.id <= 2 ? hero.id : Date.now()

        const heroId = {
            id,
            ...hero
        }

        const finalData = [
            ...data,
            heroId
        ]

        const result = await this.myWriteFile(finalData)
        
        return result
    }

    async myWriteFile(data){
        await writeFileAsync(this.NAME_FILE, JSON.stringify(data))
        return true
    }

    async toList(id){
        const data = await this.getFileData()
        const filteredData = data.filter(hero => (id ? (hero.id === id): true))
        return filteredData
    }
}

module.exports = new Database()