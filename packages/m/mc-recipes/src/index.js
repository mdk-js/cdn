const fs = require('fs')
const path = require('path')

const versions = ['1.13', '1.14', '1.15', '1.16', '1.17', '1.18', '1.19']

versions.forEach(v => {
    const dir = path.resolve(__dirname, '../dist/recipes', v)
    const list = fs.readdirSync(dir).map(e => {
        const result = JSON.parse(fs.readFileSync(path.resolve(dir, e))).result
        if (result === undefined) {
            return undefined
        }
        return {
            file: e.slice(0, -5),
            id: typeof result === 'string' ? result.slice(10) : result.item.slice(10)
        }
    }).filter(Boolean)
    fs.writeFileSync(path.resolve(__dirname, '../dist', v + '.json'), JSON.stringify(list, null, 4))
})