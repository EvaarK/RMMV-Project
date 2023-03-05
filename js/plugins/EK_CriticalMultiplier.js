//=============================================================================
// EK_CriticalMultiplier.js
//=============================================================================

/*:
 * @target MV
 * @plugindesc Multiplicado de Dano Crítico.
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
 * Feito no RPG Maker MV 1.6.1.
 * Este plugin não tem comandos.
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Versão 0.2.0-alpha:
 * - Alteração no código
 * 
 * Versão 0.1.2-alpha:
 * - Suporta decimal.
 *
 * Versão 0.1.1-alpha:
 * - Pequena alteração no codigo.
 * 
 * Versão 0.1-alpha:
 * - Lançamento Inicial.
 */

var Evaark = Evaark || {};
Evaark.CriticalMultiplier = Evaark.CriticalMultiplier || {};

Evaark.CriticalMultiplier.Version = Evaark.CriticalMultiplier.Version || {};
Evaark.CriticalMultiplier.Version.major = 0;
Evaark.CriticalMultiplier.Version.minor = 2;
Evaark.CriticalMultiplier.Version.patch = 0;
Evaark.CriticalMultiplier.Version.preReleaseTag = "-alpha";
Evaark.CriticalMultiplier.Version.semVer = Evaark.CriticalMultiplier.Version.major + '.' +
                    Evaark.CriticalMultiplier.Version.minor + '.' +
                    Evaark.CriticalMultiplier.Version.patch +
                    Evaark.CriticalMultiplier.Version.preReleaseTag;

Evaark.CriticalMultiplier.params = PluginManager.parameters('EK_CriticalMultiplier');

Evaark.CriticalMultiplier.multiplier = Number(Evaark.CriticalMultiplier.params['Multiplicador'] || 3.00);

Game_Action.prototype.applyCritical = function(damage)
{
    if (Evaark.CriticalMultiplier.multiplier <= 0)
    {
        console.log(damage);
        return damage;
    }

    console.log(damage * Evaark.CriticalMultiplier.multiplier);
    return damage * Evaark.CriticalMultiplier.multiplier;
};
