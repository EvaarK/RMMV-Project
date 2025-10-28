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
(() => {
  console.log(`[EK_Core] Carregando...`);

  window.Evaark = window.Evaark || {};
  const Evaark = window.Evaark;

  Evaark.Version = function (major, minor, patch) {
    this.major = major || 1;
    this.minor = minor || 0;
    this.patch = patch || 0;
  };

  Evaark.Version.prototype.toString = function () {
    return `v${this.major}.${this.minor}.${this.patch}`;
  };

  Evaark.debug = function (name, message) {
    console.debug(`[EK_${name}] DEBUG: ${message}`);
  };

  Evaark.log = function (name, message) {
    console.log(`[EK_${name}] ${message}`);
  };

  Evaark.error = function (name, message) {
    console.error(`[EK_${name}] ERRO: ${message}`);
  };

  Evaark.version = new Evaark.Version(1, 0, 0);

  Evaark.Imported = Evaark.Imported || {};
  Evaark.Imported.Core = true;

  Evaark.createModule = function (name, version) {
    this[name] = this[name] || {};
    this[name].version = version || [0, 0, 0];
    this.Imported[name] = true;
    return this[name];
  };

  Evaark.log("Core",`Carregado com sucesso - ${Evaark.version}`);
})();
