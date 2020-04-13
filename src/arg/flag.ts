"use strict"
import {
  CommandLineArgumentType,
  CommandLineFlag,
} from '../types'
import { makeParam } from './param'

/**
 * Returns an object representing a flag parameter 
 * from a string 
 */
export function getFlags (arg, leading_dash_count = 0) {
  const has_value = arg.indexOf ('=') !== -1

  // If our flag has a value then process
  // the last character as a standalone
  // param and all preceding characters
  // as usual flags

  if (has_value) {
    const [key, val] = arg.substr (1).split ('=')
    const last_char_idx = key.length - 1

    // The flag is a standalone param,
    // there are no preceding characters

    if (key === key[last_char_idx])
      return [makeParam (key, val)]

    // Process flags preceding the last as normal
    // flags and the last flag as a standalone param

    return getFlags (key.substr (0, last_char_idx)).concat ([
      makeParam (key[last_char_idx], val)
    ])
  }

  // If we're here then there is no value indication

  return arg.substr (leading_dash_count)
   .split ('')
   .filter (isFlagChar)
   .map (makeFlag)
}

/**
 * Make a single flag
 */
export function makeFlag (key: string): CommandLineFlag {
  return {
     type: CommandLineArgumentType.Flag,
     key,
     value: true
  }
}

// isFlagChar internal constants
isFlagChar.CHAR_CODE_NUM_LOWER = 48
isFlagChar.CHAR_CODE_NUM_UPPER = 57
isFlagChar.CHAR_CODE_AZ_LOWER = 65
isFlagChar.CHAR_CODE_AZ_UPPER = 90
isFlagChar.CHAR_CODE_AZ_LOWER = 97
isFlagChar.CHAR_CODE_AZ_UPPER = 122

/**
 * Return a boolean indicating whether
 * a character makes an accpetable flag
 */
export function isFlagChar (chr) {
  if (chr.length > 1) return false
  const code = chr.charCodeAt (0)
  return (
    inRangeInclusive (
      isFlagChar.CHAR_CODE_NUM_LOWER,
      isFlagChar.CHAR_CODE_NUM_UPPER,
      code
    ) ||
    inRangeInclusive (
      isFlagChar.CHAR_CODE_AZ_LOWER,
      isFlagChar.CHAR_CODE_AZ_UPPER,
      code
    ) ||
    inRangeInclusive (
      isFlagChar.CHAR_CODE_AZ_LOWER,
      isFlagChar.CHAR_CODE_AZ_UPPER,
      code
    )
  )
}

/**
 * Return a boolean indicating whether
 * a number is witin an inclusive range 
 */
function inRangeInclusive (min: number, max: number, num: number): boolean {
  return min <= num && num <= max
}
