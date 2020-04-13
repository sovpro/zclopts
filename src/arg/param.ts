"use strict"
import {
  CommandLineArgumentType,
  CommandLineParameter,
} from '../types'

/**
 * Make a single param
 */
export function makeParam (key: string, val: string): CommandLineParameter {
  return {
    type: CommandLineArgumentType.Parameter,
    key,
    value: val || undefined
  }
}

/**
 * Returns an object representing a long parameter 
 * from a string 
 */
export function getParam (arg) {
  const [key, val] = arg.substr (2).split ('=')
  return makeParam (key, val)
}

