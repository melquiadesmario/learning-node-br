const Commander = require('commander')

const Database = require('./database')
const Hero = require('./hero')

async function main(){
    Commander
        .version('v1')
        .option('-i, --id [value]', "ID Hero")
        .option('-n, --name [value]', "Hero's Name")
        .option('-p, --power [value]', "Hero Power")

        .option('-s, --store', "Store a Hero")
        .option('-l, --list', "List all Heroes")
        .option('-m, --modify [value]', "Modify a Hero by ID")
        .option('-r, --remove', "Remove a Hero by ID")

        .parse(process.argv)

    const hero = new Hero(Commander)

    try{
        if(Commander.store){
            delete hero.id

            const result = await Database.store(hero)
            
            if(!result){
                console.error('Unable to Register Hero.')
                return
            }

            console.log('Hero Stored Successfully.')
        }

        if(Commander.list){
            const result = await Database.toList()
            console.log(result)
            return
        }

        if(Commander.modify){
            const idModify = parseInt(Commander.modify)
            const data = JSON.stringify(hero)
            const heroModify = JSON.parse(data)
            const result = await Database.modify(idModify, heroModify)

            if(!result){
                console.error('Unable to Modify Hero')
                return
            }

            console.log('Hero Modified Successfylly')
        }

        if(Commander.remove){
            const result = await Database.remove(hero.id)

            if(!result){
                console.error('Unable to Remove Hero')
                return
            }

            console.log('Hero Removed Successfully')
        }

    }catch(error){
        console.error('IT WAS BAB.', error)
    }
}

main()