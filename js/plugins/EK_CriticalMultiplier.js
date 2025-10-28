//=============================================================================
// EK_CriticalMultiplier.js
//=============================================================================

/*:
 * @target MV
 * @plugindesc [2.0.0] Multiplicado de Dano Crítico.
 * @author EvaarK
 *
 * @param Multiplicador
 * @type number
 * @decimals 2
 * @min 1
 * @desc Define o multiplicador de dano crítico.
 * Default: 3.00
 * @default 3.00
 *
 * @help
 * ============================================================================
 * Sobre
 * ============================================================================
 * Plugin para RPG Maker MV 1.6.3.
 * 
 * Este plugin não tem comandos.
 * ============================================================================
 * Changelog
 * ============================================================================
 * v2.0.0:
 * - Utilização do EK_Core.
 * - Código reescrito.
 * - Melhoria na legibilidade.
 *
 * v1.1.0:
 * - Mudança no código.
 *
 * v1.0.0:
 * - Lançamento Inicial.
 */
(function () {
  try {
    if (!Evaark.Imported.Core) {
      throw new Error("Core não está instalado.");
    }

    if (Evaark.version.major != 1) {
      throw new Error(`Core não está na versão correta. Versão esperado [v1.x.x], versão atual [${Evaark.version}]`);
    }

    /** @type {Evaark.CriticalMultiplier} */
    const mod = Evaark.createModule("CriticalMultiplier", new Evaark.Version(2, 0, 0, "beta"));

    const params = PluginManager.parameters("EK_CriticalMultiplier");

    mod.multiplier = Number(params["Multiplicador"] || 3.0);

    mod.main = function () {
      Game_Action.prototype.applyCritical = function (damage) {
        console.log(damage * Evaark.CriticalMultiplier.multiplier);
        return damage * Evaark.CriticalMultiplier.multiplier;
      };

      Evaark.log("CriticalMultiplier", `Carregado com sucesso - ${mod.version}`);
    };

    mod.main();
  } catch (err) {
    console.error(err);
  }
})();
