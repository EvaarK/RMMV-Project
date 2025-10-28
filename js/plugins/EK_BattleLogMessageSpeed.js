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
 * Modifica a velocidade das mensagens exibidas no log de batalha.
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
 * - Melhoria na legibilidade e segurança.
 *
 * v1.1.0:
 * - Mudança no código.
 *
 * v1.0.0:
 * - Lançamento Inicial.
 * ============================================================================
 */
(() => {
  try {
    if (!Evaark.Imported.Core) {
      throw new Error("Core não está instalado.");
    }

    if (Evaark.version.major != 1) {
      throw new Error(`Core não está na versão correta. Versão esperado [v1.x.x], versão atual [${Evaark.version}]`);
    }

    /** @type {Evaark.BattleLogMessageSpeed} */
    const mod = Evaark.createModule("BattleLogMessageSpeed", [2, 0, 0]);

    const params = PluginManager.parameters("EK_BattleLogMessageSpeed");

    mod.speed = Number(params["Velocidade"] || 1);
    mod.customSpeed = Number(params["Velocidade Personalizada"] || 16);

    const _Window_BattleLog_messageSpeed = Window_BattleLog.prototype.messageSpeed;

    mod.resolveSpeed = () => {
      switch (mod.speed) {
        case 0: return 8;
        case 2: return 32;
        case 3: return Math.max(0, mod.customSpeed);
        default: return 16;
      }
    };

    mod.setLogSpeed = () => {
      mod.logSpeed = mod.resolveSpeed();
      Evaark.debug(
        "BattleLogMessageSpeed",
        `Velocidade do log: ${mod.logSpeed}`
      );

      Window_BattleLog.prototype.messageSpeed = function () {
        return mod.logSpeed || _Window_BattleLog_messageSpeed.call(this);
      };
    }

    mod.assertLogSpeed = () => {
      let actual = Window_BattleLog.prototype.messageSpeed();
      let expected = mod.logSpeed;

      if (actual !== expected) {
        Evaark.error("BattleLogMessageSpeed", `messageSpeed retornou  ${actual}, mas o esperado era ${expected}`);
        Window_BattleLog.prototype.messageSpeed = _Window_BattleLog_messageSpeed;

        throw new Error("Erro em EK_BattleLogMessageSpeed.js");
      }
    };

    mod.setLogSpeed();
    mod.assertLogSpeed();
  } catch (err) {
    console.error(err);
  }
})();
