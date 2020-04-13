"use strict"
import { ProgramOptionList } from '../types'
import {
  getParam, makeParam,
  getFlags, makeFlag,
  getValue
} from '../args'

// reduceArgs internal constants
reduceArgs.ONLY_DASHES_REGEX = /^\-+$/

/**
 * Reduces a string array, representing arguments
 * to a program, to ProgramOptionList
 */
export function reduceArgs (args, val, i): ProgramOptionList {

  // We'll treat any arg with double dashes
  // as a regular param, one dash as a
  // flag (single-character) or group of 
  // flags (multi-character) and no dashes
  // as a potential value

  const leading_dash_count = (
    val.indexOf ('--') === 0 ? 2 :
    val.indexOf ('-')  === 0 ? 1 : 0
  )

  const is_only_dashes = reduceArgs.ONLY_DASHES_REGEX
    .test (val)

  // If the leading dash count is zero
  // then it could be a value to the prior
  // argument.

  if (is_only_dashes ||
      leading_dash_count === 0) {
    return args.concat ([getValue (val)])
  }

  // If we're here then we just need to concat
  // a parameter or flag(s). Let's use the leading
  // dash count to determine how to proceed.

  if (leading_dash_count > 1) {
    return args.concat ([getParam (val)])
  }
  else {
    return args.concat (getFlags (val, leading_dash_count))
  }

}
