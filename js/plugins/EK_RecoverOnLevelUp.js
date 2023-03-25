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
 * Versão 1.2.0:
 * - Mudança no código.
 * 
 * Versão 1.0.0:
 * - Lançamento Inicial.
 */

var Evaark = Evaark || {};
Evaark.Imported = Evaark.Imported || {};
Evaark.Imported.recoverOnLevelUp = true;

Evaark.RecoverOnLevelUp = Evaark.RecoverOnLevelUp || {};

Evaark.RecoverOnLevelUp.version = [1, 2, 0];
//Evaark.DamageFormula.preRelese = "alpha1";

Evaark.RecoverOnLevelUp.gameActor_LevelUp = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function()
{
    Evaark.RecoverOnLevelUp.gameActor_LevelUp.call(this);

    this.recoverAll();
    console.log('Recuperando ' + this.name() + '[' + this.level + ']' + ' no Level up');
}