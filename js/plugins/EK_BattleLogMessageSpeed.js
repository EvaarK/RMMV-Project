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
 * Versão 0.3.0-alpha:
 * - Alteração do nome do script para um mais coerente
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
Evaark.BattleLogMessageSpeed = Evaark.BattleLogMessageSpeed || {};

Evaark.BattleLogMessageSpeed.Version = Evaark.BattleLogMessageSpeed.Version || {};
Evaark.BattleLogMessageSpeed.Version.major = 0;
Evaark.BattleLogMessageSpeed.Version.minor = 3;
Evaark.BattleLogMessageSpeed.Version.patch = 0;
Evaark.BattleLogMessageSpeed.Version.preReleaseTag = "-alpha";
Evaark.BattleLogMessageSpeed.Version.semVer = Evaark.BattleLogMessageSpeed.Version.major + '.' +
                    Evaark.BattleLogMessageSpeed.Version.minor + '.' +
                    Evaark.BattleLogMessageSpeed.Version.patch +
                    Evaark.BattleLogMessageSpeed.Version.preReleaseTag;

Evaark.BattleLogMessageSpeed.params = PluginManager.parameters('EK_BattleLogMessageSpeed');

Evaark.BattleLogMessageSpeed.speed = Number(Evaark.BattleLogMessageSpeed.params['Velocidade'] || 1);
Evaark.BattleLogMessageSpeed.customSpeed = Number(Evaark.BattleLogMessageSpeed.params['Velocidade Personalizada']);

Evaark.BattleLogMessageSpeed.logSpeed = 0;
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
