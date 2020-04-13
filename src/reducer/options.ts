"use strict"
import {
  ProgramOption,
  ProgramOptionList,
  ProgramOptionsMeta,
  ProgramOptionsConfig
} from '../types'
import { getParam, getFlags, getValue } from '../args'

/**
 * Reduces an array produced by reduceArgs to an
 * object with properties representing arguments
 * and parameter values.
 */
export function reduceOptions (meta, obj, i): ProgramOptionsMeta {
  if (obj === null) return meta

  const key = obj.key
  const value = obj.value
  const non_null_key = key || meta.non_null_key

  // No state .. No op
  if (non_null_key === null) return meta

  // Whaen an option exists, append or concat the value
  if (meta.config.hasOwnProperty (non_null_key)) {

    // Implicit values

    if (isImplicitValue (value)) {
      if (value === true) {
        let value_update;

        if (meta.config[non_null_key] === true) {
          value_update = 2
        }
        else if (typeof meta.config[non_null_key] === 'number') {
          value_update = meta.config[non_null_key] + 1
        }
        else {
          value_update = true
        }

        return {
          config: { ...meta.config , [non_null_key]: value_update },
          prior_option: { key, value: value_update },
          non_null_key
        }
      }

      return { ...meta, prior_option: { key, value }, non_null_key }
    }

    // Append a value

    else if (
      key !== meta.prior_option.key &&
      isImplicitValue (meta.config[non_null_key]) === false
    ) {
      let value_update;

      // Convert to array as needed
      if (! Array.isArray (meta.config[non_null_key])) {
        value_update = [meta.config[non_null_key]]
      }

      value_update = value_update.concat ([value])

      return {
        config: { ...meta.config, [non_null_key]: value_update },
        prior_option: { key, value: value_update },
        non_null_key
      }
    }

    // Concat a value

    else {
      let value_update;

      // Don't concat to implicit value, overwrite it 
      // if the new value is not implicit otherwise skip it

      if (isImplicitValue (meta.config[non_null_key])) {
        if (! isImplicitValue (value))
          value_update = value
        else
          return { ...meta, prior_option: { key, value }, non_null_key }
      }

      // Concat to an array's last element value
      else if (Array.isArray (meta.config[non_null_key])) {
        const last_idx = meta.config[non_null_key].length - 1
        const last_value = meta.config[non_null_key][last_idx]
        const last_update = isImplicitValue (last_value) ? value : last_value + ' ' + value
        value_update = meta.config[non_null_key].slice (0, last_idx).concat ([last_update])
      }

      // Concat to a string value
      else { 
        value_update = meta.config[non_null_key] + ' ' + value 
      }

      return {
        config: { ...meta.config, [non_null_key]: value_update },
        prior_option: { key, value: value_update },
        non_null_key
      }
    }

  }

  // Add an option
  return {
    config: { ...meta.config, [key]: value },
    prior_option: { key, value },
    non_null_key
  }
}

/**
 * Return a boolean indicating if a
 * flag or param value is implicit.
 */
function isImplicitValue (value: ProgramOption['value']): boolean {
  return (
    value === true ||
    value === undefined ||
   (typeof value === 'number' && Object.is (value, NaN) === false)
  )
}
