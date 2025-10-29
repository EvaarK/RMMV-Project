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
 * [!] Requer EK_Core v1.x.x carregado antes.
 * 
 * Este plugin não tem comandos.
 * ============================================================================
 * Changelog
 * ============================================================================
 * v2.0.0:
 * - Utilização do EK_Core.
 * - Código reescrito.
 * - Função setMultiplier(value) em runtime.
 *
 * v1.1.0:
 * - Mudança no código.
 *
 * v1.0.0:
 * - Lançamento Inicial.
 */
(function (global) {
  "use strict";

  if (!global.Evaark || !global.Evaark.Imported || !global.Evaark.Imported.Core) {
    throw new Error("Core não está instalado.");
  }

  const Evaark = global.Evaark;

  if (Evaark.version.major != 1) {
    throw new Error(`Core não está na versão correta. Versão esperado [v1.x.x], versão atual [${Evaark.version}]`);
  }

  /** @type {Evaark.CriticalMultiplier} */
  const mod = Evaark.createModule("CriticalMultiplier", new Evaark.Version(2, 0, 0, "beta"));

  const params = PluginManager.parameters("EK_CriticalMultiplier");

  mod.multiplier = Number(params["Multiplicador"]);
  if (isNaN(mod.multiplier) || mod.multiplier < 1) mod.multiplier = 3.0;

  mod.setMultiplier = function (value) {
    if (isNaN(value) || value < 1) {
      Evaark.warn(mod.name, `Valor inválido (${value}). Deve ser >= 1.`);
      return;
    }

    mod.multiplier = value;
    Evaark.log(mod.name, `Multiplicador atualizado para ${mod.multiplier}`);
  };

  mod.main = function () {
    Game_Action.prototype.applyCritical = function (damage) {
      return damage * mod.multiplier;
    };

    Evaark.log(mod.name, `Carregado com sucesso - ${mod.version}`);
  };

  console.time(`[EK_${mod.name}] Init Time`);
  mod.main();
  console.timeEnd(`[EK_${mod.name}] Init Time`);
})(window);
