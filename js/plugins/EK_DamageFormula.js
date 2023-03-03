//=============================================================================
// EK_DamageFormula.js
//=============================================================================

var Imported = Imported || {};
Imported.EK_DamageFormula = true;

var Evaark = Evaark || {};
Evaark.DamageFormula = Evaark.DamageFormula || {};
Evaark.DamageFormula.version = 0.10;

/*:
 * @plugindesc Organiza melhor a formula de dano.
 * @author EvaarK
 * 
 * @help
 * ============================================================================
 * Sobre
 * ============================================================================
 * Feito no RPG Maker MV 1.6.1.
 * Este plugin não tem comandos.
 * 
 * Para usar o Note em Skills como formula de dano use:
 * <damage formula>
 * a.atk * 4 - b.def * 2;
 * </damage formula>
 * 
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Versão 1.0 - 18/01/2022:
 * - Lançamento Inicial.
 */

Evaark.DamageFormula.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    Evaark.DamageFormula.DataManager_isDatabaseLoaded.call(this);

    if (!Evaark._isLoaded_EK_DamageFormula) {
        this.readDamageTag($dataSkills);
        Evaark._isLoaded_EK_DamageFormula = true;
    }

    return true;
}

DataManager.readDamageTag = function(damageTag) {
    for (let i = 1; i < damageTag.length; i++) {
        var obj = damageTag[i];
        var noteData = obj.note.split(/[\r\n]+/);

        var isDamageFormula = false;
        obj.damage.custom = false;

        for (let ii = 0; ii < noteData.length; ii++) {
            var line = noteData[ii];

            if (line.match(/<(?:DAMAGE FORMULA)>/i)) {
                isDamageFormula = true;
                obj.damage.formula = "";
                obj.damage.custom = true;
            } else if (line.match(/<\/(?:DAMAGE FORMULA)>/i)) {
                isDamageFormula = false;
            } else if (isDamageFormula) {
                obj.damage.formula = obj.damage.formula + line + "\n";
            }
        }
    }
}
