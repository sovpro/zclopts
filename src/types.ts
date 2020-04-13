export enum CommandLineArgumentType {
  Parameter,
  Flag,
  Value
}

export interface CommandLineArgument {
  type: CommandLineArgumentType;
}

export interface CommandLineParameter extends CommandLineArgument {
  type: CommandLineArgumentType.Parameter;
  key: string;
  value: undefined | string | Array<undefined | string>;
}

export interface CommandLineFlag extends CommandLineArgument {
  type: CommandLineArgumentType.Flag;
  key: string;
  value: true;
}

export interface CommandLineValue extends CommandLineArgument {
  type: CommandLineArgumentType.Value;
  key: null;
  value: string | undefined;
}

export type ProgramOption = CommandLineParameter | CommandLineFlag | CommandLineValue
export type ProgramOptionList = Array<ProgramOption | null>

export interface ProgramOptionsConfig {
  [index: string]: true | undefined | string | number | Array<undefined | string>;
}

export interface ProgramOptionsMeta {
  prior_option: { key: string | null, value: true | undefined | string | number | Array<undefined | string> } | null;
  non_null_key: string | null;
  config: ProgramOptionsConfig;
}
