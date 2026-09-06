//=============================================================================
// EK_VolumeOffset.js
//=============================================================================

/*:
 * @target MV
 * @plugindesc [2.0.0] Altera o valor que modifica o volume.
 * @author EvaarK
 * 
 * @param Valor
 * @type number
 * @min 1
 * @desc Define o valor que modifica o volume.
 * Padrão: 20
 * @default 20
 * 
 * @param Valor Shift
 * @type decimal
 * @min 1
 * @desc Define o multiplicador com shift apertado.
 * Padrão: 1.00
 * @default 1.00
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
 * v2.0.0:
 * - Utilização do EK_Core.
 * - Código reescrito.
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
    throw new Error("EK_Core não está instalado ou carregado antes deste plugin.");
  }

  const Evaark = global.Evaark;
  const majorCore = 1;

  if (Evaark.version.major !== majorCore) {
    throw new Error( `EK_Core não está na versão correta. Esperado [v1.x.x], atual [${Evaark.version}]`);
  }

  /** @type {Evaark.VolumeOffset} */
  const mod = Evaark.createModule("VolumeOffset",new Evaark.Version(2, 0, 0, "beta"));
  console.time(`[EK_${mod.name}] Init Time`);

  const params = PluginManager.parameters(`EK_${mod.name}`);

  mod.value = Number(params["Valor"]);
  if (isNaN(mod.value) || mod.value < 1) {
    Evaark.warn(mod.name, `Valor menor que 1, ajustado para 20`);
    mod.value = 20;
  }

  mod.multiplier = Number(params["Valor Shift"]);
  if (isNaN(mod.multiplier) || mod.multiplier < 1) {
    Evaark.warn(mod.name, `Valor Shift menor que 1, ajustado para 1.00`);
    mod.multiplier = 1.00;
  }

  mod.alteraVolume = function () {
    if (Input.isPressed(Input.keyMapper[16]))
    {
        let returno = mod.value * mod.multiplier;
        Evaark.debug(mod.name, `${returno} ${Input.isPressed(Input.keyMapper[16])}`)
        return returno;
    }

    Evaark.debug(mod.name, `${mod.value} ${Input.isPressed(Input.keyMapper[16])}`)
    return mod.value;
  }

  const _Window_Options_volumeOffset = Window_Options.prototype.volumeOffset;
  Window_Options.prototype.volumeOffset = function()
  {
    return mod.alteraVolume() || _Window_Options_volumeOffset.call(this);
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