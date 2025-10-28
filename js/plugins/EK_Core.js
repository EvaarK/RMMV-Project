//=============================================================================
// EK_Core.js
//=============================================================================

/*:
 * @target MV
 * @plugindesc [1.0.0] Núcleo base para plugins Evaark (versões, logs, utilitários)
 * Carregue ele primeiro.
 * @author EvaarK
 *
 * @help
 * ============================================================================
 * Sobre
 * ============================================================================
 * Plugin para RPG Maker MV 1.6.3.
 * Este plugin deve ser carregado antes de qualquer outro plugin Evaark.
 *
 * Não possui comandos de plugin.
 * ============================================================================
 * Changelog
 * ============================================================================
 * v1.0.0:
 * - Lançamento Inicial.
 * ============================================================================
 */
(function () {
  try {
    console.log(`[EK_Core] Iniciando...`);

    window.Evaark = window.Evaark || {};
    const Evaark = window.Evaark;

    Evaark.Imported = Evaark.Imported || {};
    Evaark.Imported.Core = true;

    Evaark.Version = function (major, minor, patch) {
      this.major = major || 1;
      this.minor = minor || 0;
      this.patch = patch || 0;
    };

    Evaark.Version.prototype.toString = function () {
      return `v${this.major}.${this.minor}.${this.patch}`;
    };

    Evaark.version = new Evaark.Version(1, 0, 0);

    Evaark.debug = function (name, message) {
      console.debug(`[EK_${name}] DEBUG: ${message}`);
    };

    Evaark.log = function (name, message) {
      console.log(`[EK_${name}] ${message}`);
    };

    Evaark.error = function (name, message) {
      console.error(`[EK_${name}] ERRO: ${message}`);
    };

    Evaark.createModule = function (name, version) {
      this[name] = this[name] || {};
      this[name].version = version || new Evaark.Version(0, 0, 0);
      this.Imported[name] = true;
      return this[name];
    };

    Evaark.timesRun = function () {
      let vezesIniciado = Number(localStorage.getItem("EK-vezesIniciado"));
      if (!vezesIniciado || isNaN(vezesIniciado)) vezesIniciado = 0;
      localStorage.setItem("EK-vezesIniciado", ++vezesIniciado);
    };

    Evaark.main = function () {
      Evaark.timesRun();
      Evaark.log("Core", `Carregado com sucesso - ${Evaark.version}`);
    };

    Evaark.main();
  } catch (err) {
    console.error(err);
  }
})();
