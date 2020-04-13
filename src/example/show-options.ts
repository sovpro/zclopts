import zclopts from '../zclopts'

const argv = process.argv.slice (2)
const opts = zclopts (argv)

console.log ({ opts })
