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
 * Versão 1.1.0:
 * - Mudança no código.
 * 
 * Versão 1.0.0:
 * - Lançamento Inicial.
 */

var Evaark = Evaark || {};
Evaark.Imported = Evaark.Imported || {};
Evaark.Imported.criticalMultiplier = true;

Evaark.CriticalMultiplier = Evaark.CriticalMultiplier || {};

Evaark.CriticalMultiplier.version = [1, 1, 0];

Evaark.CriticalMultiplier.params = PluginManager.parameters('EK_CriticalMultiplier');

Evaark.CriticalMultiplier.multiplier = Number(Evaark.CriticalMultiplier.params['Multiplicador'] || 3.00);

Game_Action.prototype.applyCritical = function(damage)
{
    console.log(damage * Evaark.CriticalMultiplier.multiplier);
    return damage * Evaark.CriticalMultiplier.multiplier;
};
