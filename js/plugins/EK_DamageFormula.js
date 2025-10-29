//=============================================================================
// EK_DamageFormula.js
//=============================================================================

/*:
 * @target MV
 * @plugindesc [2.0.0] Usa Nota para formula de dano.
 * @author EvaarK
 *
 * @help
 * ============================================================================
 * Sobre
 * ============================================================================
 * Plugin para RPG Maker MV 1.6.3.
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
 * [!] Requer EK_Core v1.x.x carregado antes.
 *
 * Este plugin não tem comandos.
 * 
 * ============================================================================
 * Changelog
 * ============================================================================
 * v2.0.0:
 * - Utilização do EK_Core.
 * - Código reescrito.
 * - Suporte a múltiplas tags <formula>.
 * - Função reloadFormulas() em runtime.
 *
 * Versão 1.1.0:
 * - Mudança teste no código.
 *
 * Versão 1.0.0:
 * - Lançamento Inicial.
 */
(function (global) {
  "use strict";

  if (!global.Evaark || !global.Evaark.Imported || !global.Evaark.Imported.Core) {
    throw new Error("Core não está instalado.");
  }

  const Evaark = global.Evaark;

  if (Evaark.version.major != 1) {
    throw new Error(
      `Core não está na versão correta. Versão esperado [v1.x.x], versão atual [${Evaark.version}]`
    );
  }

  /** @type {Evaark.DamageFormula} */
  const mod = Evaark.createModule("DamageFormula", new Evaark.Version(2, 0, 0, "beta"));

  mod.replaceVarToLet = function (text) {
    return text.replace(/var\s/gi, "let ");
  };

  mod.replaceSpaces = function (text) {
    let retorno = text
      .replace(/\r?\n|\r/g, "")
      .replace(/\s\s+/g, " ")
      .replace(/\t+/g, " ");

    return mod.replaceVarToLet(retorno);
  };

  mod.updateFormula = function (dataSkill) {
    const regex = /<formula>([\s\S]*?)<\/formula>/gi;
    let match;
    let formulaFinal = "";
    while ((match = regex.exec(dataSkill.note)) !== null) {
      formulaFinal += mod.replaceSpaces(match[1])
    }

    if (formulaFinal) {
      dataSkill.damage.formula = formulaFinal;
      Evaark.debug(mod.name, `Formula para '${dataSkill.name}': ${dataSkill.damage.formula}`);
    }
  };

  mod.createDamageFormula = function (dataSkills) {
    for (let i = 1; i < dataSkills.length; i++) {
      let dataSkill = dataSkills[i];
      if (dataSkill.meta.formula) {
        mod.updateFormula(dataSkill);
      }
    }
  };

  mod.reloadFormulas = function() {
    mod.createDamageFormula($dataSkills);
    Evaark.log(mod.name, "Formulas recarregadas");
  };

  const _DataManager_IsDatabaseLoaded = DataManager.isDatabaseLoaded;
  DataManager.isDatabaseLoaded = function () {
    const loaded = _DataManager_IsDatabaseLoaded.call(this);

    if (loaded && !mod.isLoadedEkDamageFormula) {
      mod.createDamageFormula($dataSkills);
      mod.isLoadedEkDamageFormula = true;
    }

    return loaded;
  };

  mod.main = function () {
    Evaark.log("DamageFormula", `Carregado com sucesso - ${mod.version}`);
  };

  console.time(`[EK_${mod.name}] Init Time`);
  mod.main();
  console.timeEnd(`[EK_${mod.name}] Init Time`);
})(window);
