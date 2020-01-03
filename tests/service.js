const { get } = require('axios')

const URL = `https://swapi.co/api/people`

async function getPeoples(name){
    const url = `${ URL }/?search=${ name }&format=json`
    const result = await get(url)
    console.log(result.data)
    return result.data.results.map(mapPeoples)
}

function mapPeoples(people){
    return{
        name: people.name,
        height: people.height
    }
}

module.exports = { getPeoples }