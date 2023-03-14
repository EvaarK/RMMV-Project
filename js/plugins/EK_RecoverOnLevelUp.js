//=============================================================================
// EK_RecoverOnLevelUp.js
//=============================================================================

/*:
 * @target MV
 * @plugindesc Recupera HP e MP no LevelUp.
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
 * Versão 1.0.0:
 * - Lançamento Inicial.
 */

var Evaark = Evaark || {};
Evaark.RecoverOnLevelUp = Evaark.RecoverOnLevelUp || {};

Evaark.RecoverOnLevelUp.version = [1, 0, 0];

Evaark.RecoverOnLevelUp.Game_Actor_levelUp = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function() {
    Evaark.RecoverOnLevelUp.Game_Actor_levelUp.call(this);

    this.recoverAll();
    console.log('Recuperando ' + this.name() + '[' + this.level + ']' + ' no Level up');
}