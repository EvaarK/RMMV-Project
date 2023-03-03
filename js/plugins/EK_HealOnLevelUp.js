//=============================================================================
// EK_HealOnLevelUp.js
//=============================================================================

var Imported = Imported || {};
Imported.EK_HealOnLevelUp = true;

var Evaark = Evaark || {};
Evaark.HealLevelUp = Evaark.HealLevelUp || {};
Evaark.HealLevelUp.version = 1.0;

/*:
 * @plugindesc Retaura o HP e MP quando da LevelUp.
 * @author EvaarK
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
 * Versão 1.0:
 * - Lançamento Inicial.
 */

Evaark.HealLevelUp.Game_Actor_levelUp = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function() {
    Evaark.HealLevelUp.Game_Actor_levelUp.call(this);

    this.recoverAll();
}