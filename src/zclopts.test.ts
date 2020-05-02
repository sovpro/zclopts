import zclopts from './zclopts'

function makeArgv (...args) {
  return ['node', 'my-script.js', ...args]
}

describe ('zclopts', () => {

  it ('Should parse process.argv when receiving no arguments', () => {
    expect (zclopts ()).toBeDefined ()
  })

  describe ('Parses flag options', () => {
  
    it ('A flag should default to true', () => {
      const argv = makeArgv ('-f')
      const opts = zclopts (argv.slice (2))
      expect (opts.get ('f')).toBe (true)
    })

    it ('A negation flag should default to false', () => {
      const argv = makeArgv ('-no-f')
      const opts = zclopts (argv.slice (2))
      expect (opts.get ('f')).toBe (false)
    })

    it ('A flag occurring more than once should have a value equal to the number of instances', () => {
      const argv = makeArgv ('-fff')
      const opts = zclopts (argv.slice (2))
      expect (opts.get ('f')).toBe (3)
    })

    it ('A negation flag occurring more than onces hould have a value of false', () => {
      const argv = makeArgv ('-no-ff')
      const opts = zclopts (argv.slice (2))
      expect (opts.get ('f')).toBe (false)
    })

    it ('A flag with a value should have the value', () => {
      const argv = makeArgv ('-f', 'value')
      const opts = zclopts (argv.slice (2))
      expect (opts.get ('f')).toBe ('value')
    })

    it ('A flag occurring more than once with sequential values should have a value equal to the values of the final instance concatenated by spaces', () => {
      const argv = makeArgv ('-f', 'value-1', 'value-2', '-f', 'value-3', 'value-4')
      const opts = zclopts (argv.slice (2))
      expect (opts.get ('f')).toBe ('value-3 value-4')
    })

    it ('A flag group should be parsed as separate flags', () => {
      const argv = makeArgv ('-abc')
      const opts = zclopts (argv.slice (2))
      expect (opts.get ('a')).toBe (true)
      expect (opts.get ('b')).toBe (true)
      expect (opts.get ('c')).toBe (true)
    })

    it ('A negation flag group should be parsed as separate flags', () => {
      const argv = makeArgv ('-no-abc')
      const opts = zclopts (argv.slice (2))
      expect (opts.get ('a')).toBe (false)
      expect (opts.get ('b')).toBe (false)
      expect (opts.get ('c')).toBe (false)
    })

    it ('A flag group with a trailing value should be parsed as separate flags and one flag with a value', () => {
      const argv = makeArgv ('-abc', 'value')
      const opts = zclopts (argv.slice (2))
      expect (opts.get ('a')).toBe (true)
      expect (opts.get ('b')).toBe (true)
      expect (opts.get ('c')).toBe ('value')
    })

    it ('A flag group with a trailing value after an equal symbol should be parsed as separate flags and one flag with a value', () => {
      const argv = makeArgv ('-abc=value')
      const opts = zclopts (argv.slice (2))
      expect (opts.get ('a')).toBe (true)
      expect (opts.get ('b')).toBe (true)
      expect (opts.get ('c')).toBe ('value')
    })

    it ('A negation flag group with a trailing value should be parsed as separate flags and one flag with a value', () => {
      const argv = makeArgv ('-no-abc', 'value')
      const opts = zclopts (argv.slice (2))
      expect (opts.get ('a')).toBe (false)
      expect (opts.get ('b')).toBe (false)
      expect (opts.get ('c')).toBe ('value')
    })

    it ('A negation flag group with a trailing value after an equal symbol should be parsed as separate flags and one flag with a value', () => {
      const argv = makeArgv ('-no-abc=value')
      const opts = zclopts (argv.slice (2))
      expect (opts.get ('a')).toBe (false)
      expect (opts.get ('b')).toBe (false)
      expect (opts.get ('c')).toBe ('value')
    })
     
    it ('A flag with an equal symbol and a value should have the value', () => {
      const argv = makeArgv ('-f=value')
      const opts = zclopts (argv.slice (2))
      expect (opts.get ('f')).toBe ('value')
    })

    it ('A negation of a preceding flag should override the prior value', () => {
      const argv = makeArgv ('-f', '-no-f')
      const opts = zclopts (argv.slice (2))
      expect (opts.get ('f')).toBe (false)
    })

    it ('A non-negation of a preceding flag should override the prior value', () => {
      const argv = makeArgv ('-no-f', '-f')
      const opts = zclopts (argv.slice (2))
      expect (opts.get ('f')).toBe (true)
    })

    it ('A hypenated non-negation flag should be parsed as separate flags', () => {
      const argv = makeArgv ('-F-L-A--G')
      const opts = zclopts (argv.slice (2))
      expect (opts.get ('F')).toBe (true)
      expect (opts.get ('L')).toBe (true)
      expect (opts.get ('A')).toBe (true)
      expect (opts.get ('G')).toBe (true)
    })

  })

  describe ('Parses param options', () => {

    it ('A param without a value should have a value of undefined', () => {
      const argv = makeArgv ('--param')
      const opts = zclopts (argv.slice (2))
      expect (opts.get ('param')).toBe (undefined)
    })

    it ('A param with a value should have the value', () => {
      const argv = makeArgv ('--param', 'value')
      const opts = zclopts (argv.slice (2))
      expect (opts.get ('param')).toBe ('value')
    })

    it ('A param with an equal symbol and a value should have the value', () => {
      const argv = makeArgv ('--param=value')
      const opts = zclopts (argv.slice (2))
      expect (opts.get ('param')).toBe ('value')
    })

    it ('A param with sequential values should have a value equal to the values concatenated by spaces', () => {
      const argv = makeArgv ('--param', 'value-1', 'value-2')
      const opts = zclopts (argv.slice (2))
      expect (opts.get ('param')).toBe ('value-1 value-2')
    })

    it ('A param occurring more than once, with one or more values, should be an array with the concatenated value of each occurrence', () => {
      const argv = makeArgv ('--param', 'value-1', 'value-2','--param', 'value-3', '--param', 'value-4', 'value-5')
      const opts = zclopts (argv.slice (2))
      expect (opts.get ('param')).toEqual (['value-1 value-2', 'value-3', 'value-4 value-5'])
    })

    it ('A param occurring more than once with no value should remain without value', () => {
      const argv = makeArgv ('-no-f', '--no-f')
      const opts = zclopts (argv)
      expect (opts.get ('param')).toBe (undefined)
    })

  })

})
