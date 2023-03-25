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
 * let multiplicadorA = 4; //Importante usar ponto e vírgula
 * let multiplicadorB = 2;
 * a.atk * multiplicadorA - b.def * multiplicadorB;
 * </formula>
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Versão 1.1.0:
 * - Mudança teste no código.
 *
 * Versão 1.0.0:
 * - Lançamento Inicial.
 */

var Evaark = Evaark || {};
Evaark.Imported = Evaark.Imported || {};
Evaark.Imported.damageFormula = true;

Evaark.DamageFormula = Evaark.DamageFormula || {};

Evaark.DamageFormula.version = [1, 1, 0];
//Evaark.DamageFormula.preRelese = "alpha1";

let ek_DataManager_IsDatabaseLoaded = DataManager.isDatabaseLoaded;

function EkDamageFormula()
{
    this.initialize.apply(this, arguments);
}

EkDamageFormula.replaceVarToLet = function (text)
{
    return text.replace(/var\s/g, 'let ');
}

EkDamageFormula.replaceSpaces = function (text)
{
    let retorno = text.replace(/\r?\n|\r/g, '')
    .replace(/\s\s+/g, ' ')
    .replace(/\t+/g, ' ');
    
    return EkDamageFormula.replaceVarToLet(retorno);
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
            debugger;
            EkDamageFormula.updateFormula(dataSkill);
            console.log('formula for ' + dataSkill.name + ': ' + dataSkill.damage.formula);
        }
    }
}

DataManager.isDatabaseLoaded = function()
{
    ek_DataManager_IsDatabaseLoaded.call(this);

    if (!Evaark.isLoadedEkDamageFormula)
    {
        EkDamageFormula.createDamageFormula($dataSkills);
        Evaark.isLoadedEkDamageFormula = true;
    }

    return true;
}