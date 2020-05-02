export enum CommandLineArgumentType {
  Parameter,
  Flag,
  Value
}

export interface CommandLineArgument {
  type: CommandLineArgumentType;
}

export type ProgramParameterValue = undefined | string | Array<undefined | string>;

export type ProgramFlagValue = boolean | number

export interface CommandLineParameter extends CommandLineArgument {
  type: CommandLineArgumentType.Parameter;
  key: string;
  value: ProgramParameterValue;
}

export interface CommandLineFlag extends CommandLineArgument {
  type: CommandLineArgumentType.Flag;
  key: string;
  value: ProgramFlagValue;
}

export interface CommandLineValue extends CommandLineArgument {
  type: CommandLineArgumentType.Value;
  key: null;
  value: string | undefined;
}

export type ProgramOption = CommandLineParameter | CommandLineFlag | CommandLineValue
export type ProgramOptionList = Array<ProgramOption | null>

export interface ProgramOptionsConfig {
  [index: string]: ProgramConfigValue;
}

export type ProgramConfigValue = ProgramFlagValue | ProgramParameterValue;

export type ProgramOptionsMap = Map<string, ProgramConfigValue>

export interface ProgramOptionsMeta {
  prior_option: { key: string | null, value: ProgramConfigValue } | null;
  non_null_key: string | null;
  config: ProgramOptionsConfig;
}
