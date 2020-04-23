import zclopts from './zclopts'

function makeArgv (...args) {
  return ['node', 'my-script.js', ...args]
}

describe ('zclopts', () => {

  describe ('Parses flag options', () => {
  
    it ('A flag should default to true', () => {
      const argv = makeArgv ('-f')
      const opts = zclopts (argv.slice (2))
      expect (opts).toHaveProperty ('f', true)
    })

    it ('A negation flag should default to false', () => {
      const argv = makeArgv ('-no-f')
      const opts = zclopts (argv.slice (2))
      expect (opts).toHaveProperty ('f', false)
    })

    it ('A flag occurring more than once should have a value equal to the number of instances', () => {
      const argv = makeArgv ('-fff')
      const opts = zclopts (argv.slice (2))
      expect (opts).toHaveProperty ('f', 3)
    })

    it ('A negation flag occurring more than onces hould have a value of false', () => {
      const argv = makeArgv ('-no-ff')
      const opts = zclopts (argv.slice (2))
      expect (opts).toHaveProperty ('f', false)
    })

    it ('A flag with a value should have the value', () => {
      const argv = makeArgv ('-f', 'value')
      const opts = zclopts (argv.slice (2))
      expect (opts).toHaveProperty ('f', 'value')
    })

    it ('A flag occurring more than once with sequential values should have a value equal to the values of the final instance concatenated by spaces', () => {
      const argv = makeArgv ('-f', 'value-1', 'value-2', '-f', 'value-3', 'value-4')
      const opts = zclopts (argv.slice (2))
      expect (opts).toHaveProperty ('f', 'value-3 value-4')
    })

    it ('A flag group should be parsed as separate flags', () => {
      const argv = makeArgv ('-abc')
      const opts = zclopts (argv.slice (2))
      expect (opts).toHaveProperty ('a', true)
      expect (opts).toHaveProperty ('b', true)
      expect (opts).toHaveProperty ('c', true)
    })

    it ('A negation flag group should be parsed as separate flags', () => {
      const argv = makeArgv ('-no-abc')
      const opts = zclopts (argv.slice (2))
      expect (opts).toHaveProperty ('a', false)
      expect (opts).toHaveProperty ('b', false)
      expect (opts).toHaveProperty ('c', false)
    })

    it ('A flag group with a trailing value should be parsed as separate flags and one flag with a value', () => {
      const argv = makeArgv ('-abc', 'value')
      const opts = zclopts (argv.slice (2))
      expect (opts).toHaveProperty ('a', true)
      expect (opts).toHaveProperty ('b', true)
      expect (opts).toHaveProperty ('c', 'value')
    })

    it ('A flag group with a trailing value after an equal symbol should be parsed as separate flags and one flag with a value', () => {
      const argv = makeArgv ('-abc=value')
      const opts = zclopts (argv.slice (2))
      expect (opts).toHaveProperty ('a', true)
      expect (opts).toHaveProperty ('b', true)
      expect (opts).toHaveProperty ('c', 'value')
    })

    it ('A negation flag group with a trailing value should be parsed as separate flags and one flag with a value', () => {
      const argv = makeArgv ('-no-abc', 'value')
      const opts = zclopts (argv.slice (2))
      expect (opts).toHaveProperty ('a', false)
      expect (opts).toHaveProperty ('b', false)
      expect (opts).toHaveProperty ('c', 'value')
    })

    it ('A negation flag group with a trailing value after an equal symbol should be parsed as separate flags and one flag with a value', () => {
      const argv = makeArgv ('-no-abc=value')
      const opts = zclopts (argv.slice (2))
      expect (opts).toHaveProperty ('a', false)
      expect (opts).toHaveProperty ('b', false)
      expect (opts).toHaveProperty ('c', 'value')
    })
     
    it ('A flag with an equal symbol and a value should have the value', () => {
      const argv = makeArgv ('-f=value')
      const opts = zclopts (argv.slice (2))
      expect (opts).toHaveProperty ('f', 'value')
    })

    it ('A negation of a preceding flag should override the prior value', () => {
      const argv = makeArgv ('-f', '-no-f')
      const opts = zclopts (argv.slice (2))
      expect (opts).toHaveProperty ('f', false)
    })

    it ('A non-negation of a preceding flag should override the prior value', () => {
      const argv = makeArgv ('-no-f', '-f')
      const opts = zclopts (argv.slice (2))
      expect (opts).toHaveProperty ('f', true)
    })

  })

  describe ('Parses param options', () => {

    it ('A param without a value should have a value of undefined', () => {
      const argv = makeArgv ('--param')
      const opts = zclopts (argv.slice (2))
      expect (opts).toHaveProperty ('param', undefined)
    })

    it ('A param with a value should have the value', () => {
      const argv = makeArgv ('--param', 'value')
      const opts = zclopts (argv.slice (2))
      expect (opts).toHaveProperty ('param', 'value')
    })

    it ('A param with an equal symbol and a value should have the value', () => {
      const argv = makeArgv ('--param=value')
      const opts = zclopts (argv.slice (2))
      expect (opts).toHaveProperty ('param', 'value')
    })

    it ('A param with sequential values should have a value equal to the values concatenated by spaces', () => {
      const argv = makeArgv ('--param', 'value-1', 'value-2')
      const opts = zclopts (argv.slice (2))
      expect (opts).toHaveProperty ('param', 'value-1 value-2')
    })

    it ('A param occurring more than once should have an array with the value of each occurrence', () => {
      const argv = makeArgv ('--param', 'value-1', 'value-2', '--param', 'value-3', 'value-4')
      const opts = zclopts (argv.slice (2))
      expect (opts).toHaveProperty ('param', ['value-1 value-2', 'value-3 value-4'])
    })

    it ('A param occurring more than once with no value should remain without value', () => {
      const argv = makeArgv ('-no-f', '--no-f')
      const opts = zclopts (argv)
      expect (opts).toHaveProperty ('param', undefined)
    })

  })

})
