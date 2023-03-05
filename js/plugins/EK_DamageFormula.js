//=============================================================================
// EK_DamageFormula.js
//=============================================================================

/*:
 * @target MV
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
 * <formula>
 * a.atk * 4 - b.def * 2;
 * </formula>
 * 
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Versão 0.2.2-alpha
 * - Correção no texto
 * 
 * Versão 0.2.1-alpha
 * - console.log removido.
 * 
 * Versão 0.2.0-alpha
 * - Alteração no código.
 * 
 * Versão 0.1.0-alpha - 18/01/2022:
 * - Lançamento Inicial.
 */

var Evaark = Evaark || {};
Evaark.DamageFormula = Evaark.DamageFormula || {};

Evaark.DamageFormula.Version = Evaark.DamageFormula.Version || {};
Evaark.DamageFormula.Version.major = 0;
Evaark.DamageFormula.Version.minor = 2;
Evaark.DamageFormula.Version.patch = 2;
Evaark.DamageFormula.Version.preReleaseTag = "-alpha";
Evaark.DamageFormula.Version.semVer = Evaark.DamageFormula.Version.major + '.' +
                    Evaark.DamageFormula.Version.minor + '.' +
                    Evaark.DamageFormula.Version.patch +
                    Evaark.DamageFormula.Version.preReleaseTag;

Evaark.DamageFormula.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function()
{
    Evaark.DamageFormula.DataManager_isDatabaseLoaded.call(this);

    if (!Evaark._isLoaded_EK_DamageFormula) {
        this.readDamageTag($dataSkills);
        Evaark._isLoaded_EK_DamageFormula = true;
    }

    return true;
}

DataManager.readDamageTag = function(damageTag)
{
    for (let i = 1; i < damageTag.length; i++)
    {
        var obj = damageTag[i];
        var noteData = obj.note.split(/[\r\n]+/);

        var isDamageFormula = false;
        obj.damage.custom = false;

        for (let ii = 0; ii < noteData.length; ii++)
        {
            var line = noteData[ii];

            if (line.match(/<formula>/i))
            {
                isDamageFormula = true;
                obj.damage.formula = "";
                obj.damage.custom = true;
            }
            else if (line.match(/<\/formula>/i))
            {
                isDamageFormula = false;
            }
            else if (isDamageFormula)
            {
                obj.damage.formula = obj.damage.formula + line + "\n";
            }
        }
        
        //console.log("formula for " + damageTag[i].name + ": " + obj.damage.formula);
    }
}
