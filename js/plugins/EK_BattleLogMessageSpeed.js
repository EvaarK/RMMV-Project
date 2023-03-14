//=============================================================================
// EK_BattleLogMessageSpeed.js
//=============================================================================

/*:
 * @target MV
 * @plugindesc Modifica a velocidade da messagem no log de batalha.
 * @author EvaarK
 *
 * @param Velocidade
 * @type number
 * @min 0
 * @max 3
 * @desc Velocidade da messagem no log de batalha. Padrão: Normal
 * 0 - Rápido | 1 - Normal | 2 - Lento | 3 - Personalizado
 * @default 1
 * 
 * @param Velocidade Personalizada
 * @type number
 * @desc Define a velocidade personalizada.
 * Quanto menor o valor, mais rápido.
 * @default 16
 * 
 * @help
 * ============================================================================
 * Sobre
 * ============================================================================
 * Feito no RPG Maker MV 1.6.1.
 * Este plugin não tem comandos.
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Versão 1.0.0:
 * - Lançamento Inicial.
 */

var Evaark = Evaark || {};
Evaark.BattleLogMessageSpeed = Evaark.BattleLogMessageSpeed || {};

Evaark.BattleLogMessageSpeed.version = [1, 0, 0];

Evaark.BattleLogMessageSpeed.params = PluginManager.parameters('EK_BattleLogMessageSpeed');

Evaark.BattleLogMessageSpeed.speed = Number(Evaark.BattleLogMessageSpeed.params['Velocidade'] || 1);
Evaark.BattleLogMessageSpeed.customSpeed = Number(Evaark.BattleLogMessageSpeed.params['Velocidade Personalizada']);

switch (Evaark.BattleLogMessageSpeed.speed)
{
    case 0:
        Evaark.BattleLogMessageSpeed.logSpeed = 8;
        break;
    case 1:
        Evaark.BattleLogMessageSpeed.logSpeed = 16;
        break;
    case 2:
        Evaark.BattleLogMessageSpeed.logSpeed = 32;
        break;
    case 3:
        if (Evaark.BattleLogMessageSpeed.customSpeed < 0)
        {
            Evaark.BattleLogMessageSpeed.logSpeed = 0;
        }
        else
        {
            Evaark.BattleLogMessageSpeed.logSpeed = Evaark.BattleLogMessageSpeed.customSpeed;
        }
        break;
    default:
        Evaark.BattleLogMessageSpeed.logSpeed = 16;
}

Window_BattleLog.prototype.messageSpeed = function()
{
    return Evaark.BattleLogMessageSpeed.logSpeed;
};
