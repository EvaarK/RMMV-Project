// EK.d.js
// v1.0.0

declare namespace Evaark {
  interface EvaarkObject {
    version: Version;
    name: string;

    main(): void;
    onError(error: any): void;
  }

  class Version {
    constructor(major?: number, minor?: number, patch?: number, preRelease?: string, build?: string);
    major: number;
    minor: number;
    patch: number;
    preRelease?: string;
    build?: string;
    toString(): string;
  }

  let version: Version;
  let name: string;

  function debug(name: string, message?: any): void;
  function log(name: string, message?: any): void;
  function warn(name: string, message?: any): void;
  function error(name: string, message?: any): void;

  function createModule<T extends EvaarkObject>(name: string, version: Version): T;
  function timesRun();
  function main();

  interface BattleLogMessageSpeed extends EvaarkObject {
    speed: number;
    customSpeed: number;

    logSpeed(): number;
    setLogSpeed(newSpeed: number, customSpeed: number = -1): void;
    assertLogSpeed(): void;
  }

  interface CriticalMultiplier extends EvaarkObject {
    multiplier: number;

    setMultiplier(value: number): void;
  }

  interface DamageFormula extends EvaarkObject {
    isLoadedEkDamageFormula?: boolean;

    replaceVarToLet(text: string): string;
    replaceSpaces(text: string): string;
    updateFormula(dataSkill: rm.types.Skill): void;
    createDamageFormula(dataSkills: rm.types.Skill[]): void;
    reloadFormulas(): void;
  }

  interface RecoverOnLevelUp extends EvaarkObject {}

  let Imported: {
    [key: string]: boolean | undefined;
    Core?: boolean;
    BattleLogMessageSpeed?: boolean;
    CriticalMultiplier?: boolean;
    DamageFormula?: boolean;
    RecoverOnLevelUp?: boolean;
  };

  const BattleLogMessageSpeed: BattleLogMessageSpeed;
  const CriticalMultiplier: CriticalMultiplier;
  const DamageFormula: DamageFormula;
  const RecoverOnLevelUp: RecoverOnLevelUp;
}
