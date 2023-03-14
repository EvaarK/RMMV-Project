//=============================================================================
// EK_DamageFormula.js
//=============================================================================

/*:
 * @target MV
 * @plugindesc Usa Nota para formula de dano.
 * @author EvaarK
 * 
 * @help
 * ============================================================================
 * Sobre
 * ============================================================================
 * Feito no RPG Maker MV 1.6.1.
 * Este plugin não tem comandos.
 * 
 * Para usar a Nota em Habilidades como formula de dano use:
 * <formula>
 * a.atk * 4 - b.def * 2
 * </formula>
 * 
 * Também suporta códigos em JavaScript:
 * <formula>
 * var multiplicadorA = 4; //Importante usar ponto e vírgula
 * var multiplicadorB = 2;
 * a.atk * multiplicadorA - b.def * multiplicadorB;
 * </formula>
 * 
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Versão 1.0.0:
 * - Lançamento Inicial.
 */

var Evaark = Evaark || {};
Evaark.DamageFormula = Evaark.DamageFormula || {};

Evaark.DamageFormula.version = [1, 0, 0];

Evaark.DamageFormula.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function()
{
    Evaark.DamageFormula.DataManager_isDatabaseLoaded.call(this);

    if (!Evaark._isLoaded_EK_DamageFormula) {
        this.ekCreateDamageFormula($dataSkills);
        Evaark._isLoaded_EK_DamageFormula = true;
    }

    return true;
}

DataManager.ekCreateDamageFormula = function(dataSkills)
{
    for (let i = 1; i < dataSkills.length; i++)
    {
        var dataSkill = dataSkills[i];
        if(dataSkill.meta.formula != true)
        {
            break;
        }

        var noteSplited = dataSkill.note.split(/[\r\n]+/);
        var isFormulaMode = false;
        for (let ii = 0; ii < noteSplited.length; ii++)
        {
            var line = noteSplited[ii];
            if (line.match(/<formula>/i))
            {
                isFormulaMode = true;
                dataSkill.damage.formula = '';
            }
            else if (line.match(/<\/formula>/i))
            {
                isFormulaMode = false;
                break;
            }
            else if (isFormulaMode)
            {
                dataSkill.damage.formula = dataSkill.damage.formula + line + '\r\n';
            }
        }

        console.log('formula for ' + dataSkills[i].name + ': ' + dataSkill.damage.formula);
    }
}
