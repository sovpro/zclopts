"use strict"
import {
  CommandLineArgumentType,
  CommandLineValue,
} from '../types'

/**
 * Make a single value
 */
export function makeValue (value: string): CommandLineValue {
  return {
     type: CommandLineArgumentType.Value,
     key: null,
     value
  }
}

/**
 * Returns an object representing a value
 * that is not a flag or param from a string
 */
export function getValue (arg) {
  return makeValue (arg)
}
