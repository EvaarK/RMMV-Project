//=============================================================================
// EK_HealOnLevelUp.js
//=============================================================================

/*:
 * @target MV
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
 * Versão 0.2.0-alpha:
 * - Alteração no código
 * 
 * Versão 0.1.0-alpha:
 * - Lançamento Inicial.
 */

var Evaark = Evaark || {};
Evaark.HealLevelUp = Evaark.HealLevelUp || {};

Evaark.HealLevelUp.Version = Evaark.HealLevelUp.Version || {};
Evaark.HealLevelUp.Version.major = 0;
Evaark.HealLevelUp.Version.minor = 2;
Evaark.HealLevelUp.Version.patch = 0;
Evaark.HealLevelUp.Version.preReleaseTag = "-alpha";
Evaark.HealLevelUp.Version.semVer = Evaark.HealLevelUp.Version.major + '.' +
                    Evaark.HealLevelUp.Version.minor + '.' +
                    Evaark.HealLevelUp.Version.patch +
                    Evaark.HealLevelUp.Version.preReleaseTag;

Evaark.HealLevelUp.Game_Actor_levelUp = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function() {
    Evaark.HealLevelUp.Game_Actor_levelUp.call(this);

    this.recoverAll();
    console.log("Curando Personagens no Level up");
}