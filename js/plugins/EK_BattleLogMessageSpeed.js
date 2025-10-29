//=============================================================================
// EK_BattleLogMessageSpeed.js
//=============================================================================

/*:
 * @target MV
 * @plugindesc [2.0.0] Modifica a velocidade da messagem no log de batalha.
 * @author EvaarK
 *
 * @param Velocidade
 * @type select
 * @option Rápido - 8
 * @value 0
 * @option Normal - 16
 * @value 1
 * @option Lento - 32
 * @value 2
 * @option Personalizado
 * @value 3
 * @desc Velocidade da messagem no log de batalha. Padrão: Normal
 * 0 - Rápido | 1 - Normal | 2 - Lento | 3 - Personalizado
 * @default 1
 *
 * @param Velocidade Personalizada
 * @type number
 * @min 0
 * @desc Define a velocidade personalizada (quanto menor, mais rápido).
 * Quanto menor o valor, mais rápido.
 * @default 16
 *
 * @help
 * ============================================================================
 * Sobre
 * ============================================================================
 * Plugin para RPG Maker MV 1.6.3.
 * 
 * Modifica a velocidade das mensagens exibidas no log de batalha.
 * 
 * [!] Requer EK_Core v1.x.x carregado antes.
 *
 * Qualquer valor abaixo de 0 informado na opção Personalizado,
 * será desconsiderado.
 *
 * Não possui comandos de plugin.
 *
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
 * ============================================================================
 */
(function (global) {
  if (!global.Evaark || !global.Evaark.Imported || !global.Evaark.Imported.Core) {
    throw new Error("Core não está instalado.");
  }

  const Evaark = global.Evaark;

  if (Evaark.version.major != 1) {
    throw new Error(`Core não está na versão correta. Versão esperado [v1.x.x], versão atual [${Evaark.version}]`);
  }

  /** @type {Evaark.BattleLogMessageSpeed} */
  const mod = Evaark.createModule("BattleLogMessageSpeed",new Evaark.Version(2, 0, 0, "beta"));

  const params = PluginManager.parameters("EK_BattleLogMessageSpeed");

  const allowedSpeeds = [0, 1, 2, 3]
  mod.speed = allowedSpeeds.includes(Number(params["Velocidade"])) ? Number(params["Velocidade"]) : 1;

  mod.customSpeed = Number(params["Velocidade Personalizada"]);
  if (isNaN(mod.customSpeed) || mod.customSpeed < 0) mod.customSpeed = 16;

  const _Window_BattleLog_messageSpeed = Window_BattleLog.prototype.messageSpeed;

  mod.logSpeed = function () {
    const speeds = {0: 8, 1: 16, 2: 32};
    return mod.speed === 3 ? Math.max(0, mod.customSpeed) : speeds[mod.speed] || 16;
  };

  Window_BattleLog.prototype.messageSpeed = function() {
    return mod.logSpeed() || _Window_BattleLog_messageSpeed.call(this);
  };

  mod.setLogSpeed = function(newSpeed, customSpeed = -1) {
    if (allowedSpeeds.includes(newSpeed)) mod.speed = newSpeed;
    if (!isNaN(customSpeed) && customSpeed >= 0) mod.customSpeed = customSpeed;
    Evaark.debug(mod.name, `Velocidade atualizada: ${mod.logSpeed()}`);
  };

  mod.assertLogSpeed = function () {
    let actual = Window_BattleLog.prototype.messageSpeed();
    let expected = mod.logSpeed();

    if (actual !== expected) {
      Evaark.error(
        mod.name,
        `messageSpeed retornou  ${actual}, mas o esperado era ${expected}`
      );
      Window_BattleLog.prototype.messageSpeed = _Window_BattleLog_messageSpeed;

      throw new Error("Erro em EK_BattleLogMessageSpeed.js");
    }
  };

  mod.main = function () {
    mod.assertLogSpeed();

    Evaark.log(mod.name, `Carregado com sucesso - ${mod.version}`);
  };

  console.time("[EK_BattleLogMessageSpeed] Init Time");
  mod.main();
  console.log(Window_BattleLog.prototype.messageSpeed());
  console.timeEnd("[EK_BattleLogMessageSpeed] Init Time");
})(window);
