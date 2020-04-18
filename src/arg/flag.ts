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
export function getFlags (arg, leading_dash_count = 0, state = true) {
  const has_value = arg.indexOf ('=') !== -1

  // If our flag has a value then process
  // the last character as a standalone
  // param and all preceding characters
  // as usual flags

  if (has_value) {
    const [raw_key, val] = arg.substr (leading_dash_count).split ('=')
    const [key, real_state] = getFlagState (raw_key, state)
    const last_char_idx = key.length - 1

    // The flag is a standalone param,
    // there are no preceding characters

    if (key === key[last_char_idx])
      return [makeParam (key, val)]

    // Process flags preceding the last as normal
    // flags and the last flag as a standalone param

    return getFlags (key.substr (0, last_char_idx), 0, real_state).concat ([
      makeParam (key[last_char_idx], val)
    ])
  }

  // If we're here then there is no value indication
  const raw_key = arg.substr (leading_dash_count)
  const [key, real_state] = getFlagState (raw_key, state)

  return key.split ('').filter (isFlagChar)
   .map (makeFlag.bind (null, real_state))
}

/**
 * Make a single flag
 */
export function makeFlag (state = true, key: string): CommandLineFlag {
  return {
     type: CommandLineArgumentType.Flag,
     key,
     value: state
  }
}

// isFlagChar internal constants
isFlagChar.CHAR_CODE_NUM_LOWER = 48
isFlagChar.CHAR_CODE_NUM_UPPER = 57
isFlagChar.CHAR_CODE_AZ_UC_LOWER = 65
isFlagChar.CHAR_CODE_AZ_UC_UPPER = 90
isFlagChar.CHAR_CODE_AZ_LC_LOWER = 97
isFlagChar.CHAR_CODE_AZ_LC_UPPER = 122
isFlagChar.CHAR_CODE_DASH = 45

/**
 * Return a boolean indicating whether
 * a character makes an accpetable flag
 */
export function isFlagChar (chr) {
  if (chr.length > 1) return false
  const code = chr.charCodeAt (0)
  return (
    code == isFlagChar.CHAR_CODE_DASH ||
    inRangeInclusive (
      isFlagChar.CHAR_CODE_NUM_LOWER,
      isFlagChar.CHAR_CODE_NUM_UPPER,
      code
    ) ||
    inRangeInclusive (
      isFlagChar.CHAR_CODE_AZ_LC_LOWER,
      isFlagChar.CHAR_CODE_AZ_LC_UPPER,
      code
    ) ||
    inRangeInclusive (
      isFlagChar.CHAR_CODE_AZ_UC_LOWER,
      isFlagChar.CHAR_CODE_AZ_UC_UPPER,
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

/**
 * Return a tuple representing a flag,
 * sans negation prefix, and its state
 */
function getFlagState (key: string, state: boolean): [string, boolean] {
  const dash_idx = key.indexOf ('-')

  if (dash_idx === -1)
    return [key, state]

  const prefix = key.substr (0, dash_idx).toLowerCase ()

  if (prefix === 'no')
    return [key.substr (dash_idx + 1), false]
}
