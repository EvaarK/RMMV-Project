//=============================================================================
// EK_BattleSpeed.js
//=============================================================================

var Imported = Imported || {};
Imported.EK_BattleSpeed = true;

var Evaark = Evaark || {};
Evaark.BattleSpeed = Evaark.BattleSpeed || {};
Evaark.BattleSpeed.version = 1.01;

/*:
 * @plugindesc Modifica a velocidade da batalha.
 * @author EvaarK
 *
 * @param Velocidade
 * @type number
 * @min 0
 * @max 3
 * @desc Define a velocidade do log de batalha. Padrão: Normal
 * 0 - Rápido | 1 - Normal | 2 - Lento | 3 - Personalizado
 * @default 1
 * 
 * @param Velocidade Personalizada
 * @type number
 * @desc Define a velocidade personalizada.
 * @default
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
 * Versão 1.0.1:
 * - Pequena alteração no codigo.
 * 
 * Versão 1.0:
 * - Lançamento Inicial.
 */

Evaark.Parameters = PluginManager.parameters('EK_BattleSpeed');
Evaark.Param = Evaark.Param || {};

Evaark.Param.BattleSpeed = Number(Evaark.Parameters['Velocidade'] || 1);
Evaark.Param.CustomSpeed = Number(Evaark.Parameters['Velocidade Personalizada']);

Evaark.BattleSpeed.LogSpeed = 0;
switch (Evaark.Param.BattleSpeed)
{
    case 0:
        Evaark.BattleSpeed.LogSpeed = 8;
        break;
    case 1:
        Evaark.BattleSpeed.LogSpeed = 16;
        break;
    case 2:
        Evaark.BattleSpeed.LogSpeed = 32;
        break;
    case 3:
        Evaark.BattleSpeed.LogSpeed = Evaark.Param.CustomSpeed;
        break;
    default:
        Evaark.BattleSpeed.LogSpeed = 16;
}

Window_BattleLog.prototype.messageSpeed = function() {
    return Evaark.BattleSpeed.LogSpeed;
};
