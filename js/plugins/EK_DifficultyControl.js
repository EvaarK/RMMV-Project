//=============================================================================
// EK_DifficultyControl.js
//=============================================================================

/*:
 * @target MV
 * @plugindesc [1.0.0] Controle de dificuldade.
 * @author EvaarK
 *
 * @param Fácil
 * @default
 * 
 * @param Dano Jogador Fácil
 * @type number
 * @decimals 2
 * @parent Fácil
 * @min 0
 * @desc Define o multiplicador de dano do jogodor.
 * Padrão = 3.00
 * @default 3.00
 * 
 * @param Dano Inimigo Fácil
 * @type number
 * @decimals 2
 * @parent Fácil
 * @min 0
 * @desc Define o multiplicador de dano do inimigo.
 * Padrão = 0.50
 * @default 0.50
 * 
 * @param Normal
 * @default
 * 
 * @param Dano Jogador Normal
 * @type number
 * @decimals 2
 * @parent Normal
 * @min 0
 * @desc Define o multiplicador de dano do jogodor.
 * Padrão = 3.00
 * @default 3.00
 * 
 * @param Dano Inimigo Normal
 * @type number
 * @decimals 2
 * @parent Normal
 * @min 0
 * @desc Define o multiplicador de dano do inimigo.
 * Padrão = 1.00
 * @default 1.00
 * 
 * @param Difícil
 * @default
 * 
 * @param Dano Jogador Difícil
 * @type number
 * @decimals 2
 * @parent Difícil
 * @min 0
 * @desc Define o multiplicador de dano do jogodor.
 * Padrão = 2.00
 * @default 2.00
 * 
 * @param Dano Inimigo Difícil
 * @type number
 * @decimals 2
 * @parent Difícil
 * @min 0
 * @desc Define o multiplicador de dano do inimigo.
 * Padrão = 2.00
 * @default 2.00
 * 
 * @param Variável
 * @type number
 * @min 1
 * @desc Define a variável do RPG Maker que será usada.
 * Padrão = 1
 * @default 1
 * 
 * @help
 * ============================================================================
 * Sobre
 * ============================================================================
 * Plugin para RPG Maker MV 1.6.3.
 *
 * [!] Requer EK_Core v1.x.x carregado antes.
 *
 * - Define a variável de dificuldade no banco de variáveis do jogo.
 * 
 * - Aplica as mudanças chamando `Evaark.DifficultyControl.setDifficulty()`.
 * Exemplo:
 *   Evaark.DifficultyControl.setDifficulty(Evaark.Difficulty.EASY);
 * 
 * - Cicla entre dificuldades chamando `Evaark.DifficultyControl.cycleDifficulty()`.
 * 
 * ============================================================================
 * Changelog
 * ============================================================================
 * v1.0.0:
 * - Lançamento inicial.
 */

(function (global) {
  "use strict";

  if (!global.Evaark || !global.Evaark.Imported || !global.Evaark.Imported.Core) {
    throw new Error("EK_Core não está instalado ou carregado antes deste plugin.");
  }

  const Evaark = global.Evaark;
  const majorCore = 1;

  if (Evaark.version.major !== majorCore) {
    throw new Error( `EK_Core não está na versão correta. Esperado [v1.x.x], atual [${Evaark.version}]`);
  }

  /** @type {Evaark.DifficultyControl} */
  const mod = Evaark.createModule("DifficultyControl",new Evaark.Version(1, 0, 0, "alpha"));
  console.time(`[EK_${mod.name}] Init Time`);

  Evaark.loadParamsNumber(mod, {
    playerMultiplierEasy: {param: "Dano Jogador Fácil", default: 3, min: 0},
    enemyMultiplierEasy: {param: "Dano Inimigo Fácil", default: 0.5, min: 0},
    playerMultiplierNormal: {param: "Dano Jogador Normal", default: 3, min: 0},
    enemyMultiplierNormal: {param: "Dano Inimigo Normal", default: 1, min: 0},
    playerMultiplierHard: {param: "Dano Jogador Difícil", default: 2, min: 0},
    enemyMultiplierHard: {param: "Dano Inimigo Difícil", default: 2, min: 0},
    difficultyVariable: {param: "Variável", default: 1, min: 1},
  })

  mod.playerMultiplier = mod.playerMultiplierNormal;
  mod.enemyMultiplier = mod.enemyMultiplierNormal;
  mod._currentDifficulty = null;

  mod.applyDifficulty = function (variable) {
    const value = Evaark.normalizeString(String($gameVariables.value(variable)));

    switch (value) {
      case Evaark.Difficulty.EASY:
        mod.playerMultiplier = mod.playerMultiplierEasy;
        mod.enemyMultiplier = mod.enemyMultiplierEasy;
        break;

      case Evaark.Difficulty.NORMAL:
        mod.playerMultiplier = mod.playerMultiplierNormal;
        mod.enemyMultiplier = mod.enemyMultiplierNormal;
        break;
      
      case Evaark.Difficulty.HARD:
        mod.playerMultiplier = mod.playerMultiplierHard;
        mod.enemyMultiplier = mod.enemyMultiplierHard;
        break;

      default:
        mod.playerMultiplier = 1;
        mod.enemyMultiplier = 1;
        break;
    }

    mod._currentDifficulty = value;

    Evaark.debug(mod.name, `Valor da Variavel ${variable}: ${$gameVariables.value(variable)}`);
    Evaark.debug(mod.name, `Multiplicador do jogador: ${mod.playerMultiplier}`);
    Evaark.debug(mod.name, `Multiplicador do inimigo: ${mod.enemyMultiplier}`);
  }

  mod.getDifficultyLabel = function(value) {
    switch (value) {
      case Evaark.Difficulty.EASY: return "Fácil";
      case Evaark.Difficulty.NORMAL: return "Normal";
      case Evaark.Difficulty.HARD: return "Difícil";
      default: return "Desconhecida";
    }
  };

  mod.setDifficulty = function (difficulty) {
    const normalized = Evaark.normalizeString(String(difficulty));

    if (!Object.values(Evaark.Difficulty).includes(normalized)) {
      Evaark.warn(mod.name, `Dificuldade inválida: ${difficulty}`);
      return;
    }

    $gameVariables.setValue(mod.difficultyVariable, normalized);
  };

  mod.cycleDifficulty = function() {
    const order = [Evaark.Difficulty.EASY, Evaark.Difficulty.NORMAL, Evaark.Difficulty.HARD];
    const current = mod._currentDifficulty || Evaark.Difficulty.EASY;
    const next = order[(order.indexOf(current) + 1) % order.length];
    mod.setDifficulty(next);
  };

  const _Game_Variables_setValue = Game_Variables.prototype.setValue;
  Game_Variables.prototype.setValue = function(variableId, value) {
    const oldValue = this._data[variableId];
    _Game_Variables_setValue.call(this, variableId, value);

    if (variableId === mod.difficultyVariable && oldValue !== value) {
      Evaark.log(mod.name, `Variável de dificuldade alterada para: ${mod.getDifficultyLabel(value)}`);
      mod.applyDifficulty(variableId);
    }
  };

  const _Scene_Load_onLoadSuccess = Scene_Load.prototype.onLoadSuccess;
  Scene_Load.prototype.onLoadSuccess = function() {
    _Scene_Load_onLoadSuccess.call(this);
    Evaark.log(mod.name, "Aplicando dificuldade ao carregar jogo");
    mod.applyDifficulty(mod.difficultyVariable);
  }

  mod.main = function () {
    Evaark.log(mod.name, `Carregado com sucesso - ${mod.version}`);
  };

  mod.onError = function (error) {
    Evaark.error(mod.name, error);
  };

  try {
    mod.main();
  } catch (err) {
    mod.onError(err);
  }

  console.timeEnd(`[EK_${mod.name}] Init Time`);
})(window);