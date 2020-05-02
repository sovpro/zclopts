"use strict"
import {
  ProgramOptionList,
  ProgramOptionsMeta,
  ProgramOptionsConfig,
  ProgramOptionsMap
} from './types'
import { reduceArgs, reduceOptions } from './reducers'

export = zclopts

/**
 * Produces an object with properties representing
 * program arguments and parameter values.
 */
function zclopts (params?: string[]): ProgramOptionsMap {
  const values: string[] = Array.isArray (params) ? params : process.argv.slice (2)
  const args: ProgramOptionList = values.reduce (reduceArgs, [])
  const meta_init = { prior_option: null, non_null_key: null, config: {} }
  const meta: ProgramOptionsMeta = args.reduce (reduceOptions, meta_init)
  return mapProgramOptionsConfig (meta.config)
}

function mapProgramOptionsConfig (cfg: ProgramOptionsConfig): ProgramOptionsMap {
  return Object.getOwnPropertyNames (cfg).reduce (
    (map, prop) => map.set (prop, cfg[prop]),
    new Map ()
  )
}
