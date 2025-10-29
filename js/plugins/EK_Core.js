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
 * 
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
(function (global) {
  "use strict";

  console.log("%c[EK_Core] %cIniciando...", "color: #17a2b8; font-weight: bold;", "color: inherit;");

  global.Evaark = global.Evaark || {};
  const Evaark = global.Evaark;

  Evaark.Imported = Evaark.Imported || {};
  Evaark.Imported.Core = true;

  Evaark.Version = function (major = 1, minor = 0, patch = 0, preRelease, build) {
    this.major = Number.isInteger(major) ? major : 1;
    this.minor = Number.isInteger(minor) ? minor : 0;
    this.patch = Number.isInteger(patch) ? patch : 0;

    if (preRelease) this.preRelease = `-${preRelease}`;
    if (build) this.build = `+${build}`;
  };

  Evaark.Version.prototype.toString = function () {
    let v = `v${this.major}.${this.minor}.${this.patch}`;
    if (this.preRelease) v += this.preRelease;
    if (this.build) v += this.build;
    return v;
  };

  Evaark.version = new Evaark.Version(1, 0, 0, "beta");
  Evaark.name = "Core"

  Evaark.debug = function (name, message) {
    if (console.debug) {
      console.debug(`%c[EK_${name}] %c${message}`, "color: #6c757d; font-weight: bold;", "color: inherit;");
    }
  };

  Evaark.log = function (name, message) {
    console.log(`%c[EK_${name}] %c${message}`, "color: #17a2b8; font-weight: bold;", "color: inherit;");
  };

  Evaark.warn = function (name, message) {
    console.warn(`%c[EK_${name}] %c${message}`, "color: #ffc107; font-weight: bold;", "color: inherit;");
  };

  Evaark.error = function (name, message) {
    console.error(`%c[EK_${name}] %c${message}`, "color: #dc3545; font-weight: bold;", "color: inherit;");
  };

  Evaark.createModule = function (name, version) {
    if (this[name]) {
      Evaark.warn("Core", `Módulo '${name}' já existe e não será sobrescrito.`);
      return this[name];
    }
    this[name] = {};
    this[name].version = version || new Evaark.Version(0, 0, 0);
    this[name].name = name;
    this.Imported[name] = true;
    return this[name];
  };

  Evaark.timesRun = function () {
    try {
      let vezesIniciado = Number(localStorage.getItem("EK-vezesIniciado")) || 0;
      localStorage.setItem("EK-vezesIniciado", vezesIniciado + 1);
    } catch (err) {
      Evaark.error("Core", "Não foi possível salvar 'vezesIniciado' no localStorage.");
    }
  };

  Evaark.main = function () {
    Evaark.timesRun();
    Evaark.log("Core", `Carregado com sucesso - ${Evaark.version}`);
  };

  console.time("[EK_Core] Init Time");
  Evaark.main();
  console.timeEnd("[EK_Core] Init Time");
})(window);
