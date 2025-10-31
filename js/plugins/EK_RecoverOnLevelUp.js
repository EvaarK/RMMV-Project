//=============================================================================
// EK_RecoverOnLevelUp.js
//=============================================================================

/*:
 * @target MV
 * @plugindesc [2.0.0] Recupera HP e MP no LevelUp.
 * @author EvaarK
 * 
 * @help
 * ============================================================================
 * Sobre
 * ============================================================================
 * Plugin para RPG Maker MV 1.6.3.
 * 
 * [!] Requer EK_Core v1.x.x carregado antes.
 * 
 * Este plugin não tem comandos.
 * ============================================================================
 * Changelog
 * ============================================================================
 * v2.0.0:
 * - Utilização do EK_Core.
 * - Código reescrito.
 * 
 * v1.2.0:
 * - Mudança no código.
 * 
 * v1.0.0:
 * - Lançamento Inicial.
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

  /** @type {Evaark.RecoverOnLevelUp} */
  const mod = Evaark.createModule("RecoverOnLevelUp",new Evaark.Version(2, 0, 0, "beta"));
  console.time(`[EK_${mod.name}] Init Time`);

  const _Game_Actor_levelUp = Game_Actor.prototype.levelUp;
  Game_Actor.prototype.levelUp = function()
  {
      _Game_Actor_levelUp.call(this);

      this.recoverAll();
      Evaark.debug(mod.name, `HP e MP restaurados de ${this.name()} (Nv.${this.level})`);
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
})(window)