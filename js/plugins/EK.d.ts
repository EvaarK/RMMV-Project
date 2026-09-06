/*
  EK.d.js
  v1.0.0

  https://forums.rpgmakerweb.com/index.php?threads/introduction-to-the-new-plugin-manager-in-rpg-maker-mv-1-5-0.79764/
  https://rpgmakerofficial.com/product/mz/plugin/make/annotation.html
  https://forums.rpgmakerweb.com/index.php?threads/vscode-rpg-maker-javascript-snippet-for-plugin-developement.114922/
  https://forums.rpgmakerweb.com/index.php?threads/is-anyone-encounter-api-documentation-issue.126482/
  https://developer.rpgmakerweb.com/rpg-maker-mz/
*/

declare namespace Evaark {
  interface EvaarkObject {
    version: Version;
    name: string;

    main(): void;
    onError(error: any): void;
  }

  interface ParamNumber {
    value: string;
    min: number = 0;
    name: string = "";
    def: number = -Infinity;
    module: string = "";
  }

  interface ParamNumberConfig {
    param: string;
    default: number;
    min?: number;
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

  class Difficulty {
    constructor(name: string, playerMultiplier: number, enemyMultiplier: number);
    name: string;
    playerMultiplier: number;
    enemyMultiplier: number;
  }

  function parseDifficulties(mod: DifficultyControl, paramName: string): Array<Difficulty>;

  enum DifficultyEnum {
    EASY = "easy",
    NORMAL = "normal",
    HARD = "hard"
  }

  let version: Version;
  let name: string;

  function debug(name: string, message?: any): void;
  function log(name: string, message?: any): void;
  function warn(name: string, message?: any): void;
  function error(name: string, message?: any): void;

  function createModule<T extends EvaarkObject>(name: string, version: Version): T;
  function timesRun(): void;
  function parseParamNumber(paramNumber: ParamNumber): number;
  function loadParamsNumber<T extends Record<string, any>>(mod: T,schema: Record<keyof T, ParamNumberConfig>): void;
  function loadStructArray<T>(mod: T, paramName: string): Array<any>;
  function normalizeString(text: string): string;
  function main(): void;

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

  interface VolumeOffset extends EvaarkObject {
    value: number;
    multiplier: number;

    alteraVolume(): number;
  }

  interface DifficultyControl extends EvaarkObject {
    easyPlayer: number;
    easyEnemy: number;
    normalPlayer: number;
    normalEnemy: number;
    hardPlayer: number;
    hardEnemy: number;
    difficultyVariable: number;
    playerMultiplier: number;
    enemyMultiplier: number;
    _currentDifficulty: Evaark.DifficultyEnum;
    _difficulties: Array<Difficulty>

    applyDifficulty(variable: number): void;
    getDifficultyLabel(value: any): string;
    setDifficulty(difficulty: Evaark.DifficultyEnum): void;
    cycleDifficulty(): void;
    _convertDifficulty(value: string): string;
    _damageInPlayer(damage: number): number;
    _damageInEnemy(damage: number): number;
    _damageInBoss(damage: number): number;
  }

  let Imported: {
    [key: string]: boolean | undefined;
    Core?: boolean;
    BattleLogMessageSpeed?: boolean;
    CriticalMultiplier?: boolean;
    DamageFormula?: boolean;
    RecoverOnLevelUp?: boolean;
    VolumeOffset?: boolean;
  };

  const BattleLogMessageSpeed: BattleLogMessageSpeed;
  const CriticalMultiplier: CriticalMultiplier;
  const DamageFormula: DamageFormula;
  const RecoverOnLevelUp: RecoverOnLevelUp;
  const VolumeOffset: VolumeOffset;
  const DifficultyControl: DifficultyControl;
}
