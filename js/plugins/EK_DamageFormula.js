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
Evaark.Actives = Evaark.Actives || {};
Evaark.Actives.damageFormula = true;

Evaark.DamageFormula = Evaark.DamageFormula || {};

Evaark.DamageFormula.version = [1, 1, 0];
Evaark.DamageFormula.preRelese = "alpha3";

function EkDamageFormula()
{
    this.initialize.apply(this, arguments);
}

EkDamageFormula.replaceSpaces = function (text)
{
    return text.replace(/\r?\n|\r/g, '')
    .replace(/	+/g, ' ')
    .replace(/\  +/g, ' ');
}

EkDamageFormula.updateFormula = function(dataSkill)
{
    let formulaMatch = new RegExp('<formula>[\\r\\n]?(.*?)<\\/formula>', 'is').exec(dataSkill.note);
    let retorno = EkDamageFormula.replaceSpaces(formulaMatch[1]);
    dataSkill.damage.formula = retorno;
}

EkDamageFormula.createDamageFormula = function(dataSkills)
{
    for (let i = 1; i < dataSkills.length; i++)
    {
        let dataSkill = dataSkills[i];
        if(dataSkill.meta.formula)
        {
            EkDamageFormula.updateFormula(dataSkill);
            console.log('formula for ' + dataSkill.name + ': ' + dataSkill.damage.formula);
        }
    }
}

Evaark.DamageFormula.dataManagerIsDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function()
{
    Evaark.DamageFormula.dataManagerIsDatabaseLoaded.call(this);

    if (!Evaark.isLoadedEkDamageFormula) {
        EkDamageFormula.createDamageFormula($dataSkills);
        Evaark.isLoadedEkDamageFormula = true;
    }

    return true;
}
