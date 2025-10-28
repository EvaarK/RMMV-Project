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
 * v2.0.0:
 * - Utilização do EK_Core.
 * - Código reescrito.
 * - Melhoria na legibilidade.
 *
 * Versão 1.1.0:
 * - Mudança teste no código.
 *
 * Versão 1.0.0:
 * - Lançamento Inicial.
 */
(function () {
  try {
    if (!Evaark.Imported.Core) {
      throw new Error("Core não está instalado.");
    }

    if (Evaark.version.major != 1) {
      throw new Error(
        `Core não está na versão correta. Versão esperado [v1.x.x], versão atual [${Evaark.version}]`
      );
    }

    /** @type {Evaark.DamageFormula} */
    const mod = Evaark.createModule("DamageFormula", new Evaark.Version(2, 0, 0, "beta"));

    const _DataManager_IsDatabaseLoaded = DataManager.isDatabaseLoaded;

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
      let formulaMatch = /<formula>(?<formula>[\s\S]*?)<\/formula>/i.exec(dataSkill.note);
      let retorno = mod.replaceSpaces(formulaMatch.groups["formula"]);
      dataSkill.damage.formula = retorno;
    };

    mod.createDamageFormula = function (dataSkills) {
      for (let i = 1; i < dataSkills.length; i++) {
        let dataSkill = dataSkills[i];
        if (dataSkill.meta.formula) {
          mod.updateFormula(dataSkill);
          Evaark.debug("DamageFormula", `Formula para habilidade '${dataSkill.name}': ${dataSkill.damage.formula}`
          );
        }
      }
    };

    mod.main = function () {
      DataManager.isDatabaseLoaded = function () {
        _DataManager_IsDatabaseLoaded.call(this);

        if (!mod.isLoadedEkDamageFormula) {
          mod.createDamageFormula($dataSkills);
          mod.isLoadedEkDamageFormula = true;
        }

        return true;
      };

      Evaark.log("DamageFormula", `Carregado com sucesso - ${mod.version}`);
    };

    mod.main();
  } catch (err) {
    console.error(err);
  }
})();
