const fs = require('fs')
const path = require('path')

const versions = ['1.13', '1.14', '1.15', '1.16', '1.17', '1.18', '1.19']

versions.forEach(v => {
    const list = fs.readdirSync(path.resolve(__dirname, '../dist', v)).map(e => e.slice(0, -5))
    fs.writeFileSync(path.resolve(__dirname, '../dist', v + '.json'), JSON.stringify(list, null, 4))
})