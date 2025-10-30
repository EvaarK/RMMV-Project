//=============================================================================
// EK_<NomeDoPlugin>.js
//=============================================================================

/*:
 * @target MV
 * @plugindesc [1.0.0] Descrição breve do plugin.
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
 * Este plugin não possui comandos.
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

  /** @type {Evaark.<NomeDoPlugin>} */
  const mod = Evaark.createModule("<NomeDoPlugin>",new Evaark.Version(1, 0, 0, "beta"));

  const params = PluginManager.parameters(`EK_${mod.name}`);

  mod.main = function () {
    Evaark.log(mod.name, `Carregado com sucesso - ${mod.version}`);
  };

  mod.onError = function (error) {
    Evaark.error(mod.name, error);
  };

  console.time(`[EK_${mod.name}] Init Time`);

  try {
    mod.main();
  } catch (err) {
    mod.onError(err);
  }

  console.timeEnd(`[EK_${mod.name}] Init Time`);
})(window);