//=============================================================================
// EK_BattleSpeed.js
//=============================================================================

/*:
 * @target MV
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
 * Versão 0.2.0-alpha:
 * - Alteração no código.
 * 
 * Versão 0.1.1-alpha:
 * - Pequena alteração no codigo.
 * 
 * Versão 0.1-alpha:
 * - Lançamento Inicial.
 */

var Evaark = Evaark || {};
Evaark.BattleSpeed = Evaark.BattleSpeed || {};

Evaark.BattleSpeed.Version = Evaark.BattleSpeed.Version || {};
Evaark.BattleSpeed.Version.major = 0;
Evaark.BattleSpeed.Version.minor = 2;
Evaark.BattleSpeed.Version.patch = 0;
Evaark.BattleSpeed.Version.preReleaseTag = "-alpha";
Evaark.BattleSpeed.Version.semVer = Evaark.BattleSpeed.Version.major + '.' +
                    Evaark.BattleSpeed.Version.minor + '.' +
                    Evaark.BattleSpeed.Version.patch +
                    Evaark.BattleSpeed.Version.preReleaseTag;

Evaark.BattleSpeed.params = PluginManager.parameters('EK_BattleSpeed');

Evaark.BattleSpeed.speed = Number(Evaark.BattleSpeed.params['Velocidade'] || 1);
Evaark.BattleSpeed.customSpeed = Number(Evaark.BattleSpeed.params['Velocidade Personalizada']);

Evaark.BattleSpeed.logSpeed = 0;
switch (Evaark.BattleSpeed.speed)
{
    case 0:
        Evaark.BattleSpeed.logSpeed = 8;
        break;
    case 1:
        Evaark.BattleSpeed.logSpeed = 16;
        break;
    case 2:
        Evaark.BattleSpeed.logSpeed = 32;
        break;
    case 3:
        if (Evaark.BattleSpeed.customSpeed < 0)
        {
            Evaark.BattleSpeed.logSpeed = 0;
        }
        else
        {
            Evaark.BattleSpeed.logSpeed = Evaark.BattleSpeed.customSpeed;
        }
        break;
    default:
        Evaark.BattleSpeed.logSpeed = 16;
}

Window_BattleLog.prototype.messageSpeed = function()
{
    return Evaark.BattleSpeed.logSpeed;
};
