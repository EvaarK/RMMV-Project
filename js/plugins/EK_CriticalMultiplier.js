//=============================================================================
// EK_CriticalMultiplier.js
//=============================================================================

var Imported = Imported || {};
Imported.EK_CriticalMultiplier = true;

var Evaark = Evaark || {};
Evaark.CriticalMult = Evaark.CriticalMult || {};
Evaark.CriticalMult.version = 1.02;

/*:
 * @plugindesc Multiplicado de Dano Crítico.
 * @author EvaarK
 *
 * @param Multiplicador
 * @type number
 * @decimals 2
 * @min 1
 * @desc Define o multiplicador de dano crítico.
 * Default: 3
 * @default 3
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
 * Versão 1.0.2:
 * - Suporta decimal.
 *
 * Versão 1.0.1:
 * - Pequena alteração no codigo.
 * 
 * Versão 1.0:
 * - Lançamento Inicial.
 */

Evaark.Parameters = PluginManager.parameters('EK_CriticalMultiplier');
Evaark.Param = Evaark.Param || {};

Evaark.Param.CriticalMultiplier = Number(Evaark.Parameters['Multiplicador'] || 3);

Game_Action.prototype.applyCritical = function(damage) {
    return damage * Evaark.Param.CriticalMultiplier;
};
