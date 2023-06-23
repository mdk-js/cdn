const fs = require('fs')
const path = require('path')

const versions = ['1.13', '1.14', '1.15', '1.16', '1.17', '1.18', '1.19', '1.20']

function trimPrefix(text) {
    return text.startsWith('minecraft:') ? text.slice(10) : text
}

versions.forEach(v => {
    const dir = path.resolve(__dirname, '../dist/recipes', v)
    const list = fs.readdirSync(dir).map(e => {
        const { result, type } = JSON.parse(fs.readFileSync(path.resolve(dir, e)))
        if (result === undefined) {
            return undefined
        }
        return {
            file: e.slice(0, -5),
            type: trimPrefix(type),
            id: typeof result === 'string' ? trimPrefix(result) : trimPrefix(result.item),
        }
    }).filter(Boolean)
    fs.writeFileSync(path.resolve(__dirname, '../dist', v + '.json'), JSON.stringify(list, null, 4))
})