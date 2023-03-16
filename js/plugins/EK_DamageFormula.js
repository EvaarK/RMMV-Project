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
 * Versão 1.1.0-alpha:
 * - Mudança teste no código.
 * 
 * Versão 1.0.0:
 * - Lançamento Inicial.
 */

var Evaark = Evaark || {};
Evaark.DamageFormula = Evaark.DamageFormula || {};

Evaark.DamageFormula.version = [1, 1, 0];
Evaark.DamageFormula.preRelese = "alpha1";

function EK_DamageFormula()
{
    this.initialize.apply(this, arguments);
}

EK_DamageFormula.updateFormula = function(dataSkill)
{
    let newNote = dataSkill.note.replace(/\r?\n|\r/g, '')
        .replace(/	+/g, ' ')
        .replace(/\  +/g, ' ');
    let formulaMatch = new RegExp('<formula>(.*?)<\\/formula>', 'i').exec(newNote);
    dataSkill.damage.formula = formulaMatch[1];
}

EK_DamageFormula.ekCreateDamageFormula = function(dataSkills)
{
    for (let i = 1; i < dataSkills.length; i++)
    {
        let dataSkill = dataSkills[i];
        if(dataSkill.meta.formula)
        {
            EK_DamageFormula.updateFormula(dataSkill);
            console.log('formula for ' + dataSkill.name + ': ' + dataSkill.damage.formula);
        }
    }
}

Evaark.DamageFormula.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function()
{
    Evaark.DamageFormula.DataManager_isDatabaseLoaded.call(this);

    if (!Evaark._isLoaded_EK_DamageFormula) {
        EK_DamageFormula.ekCreateDamageFormula($dataSkills);
        Evaark._isLoaded_EK_DamageFormula = true;
    }

    return true;
}
