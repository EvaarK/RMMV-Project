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

  Evaark.Difficulty = function(name, playerMultiplier, enemyMultiplier) {
    this.name = name.trim().toLowerCase();
    this.playerMultiplier = playerMultiplier
    this.enemyMultiplier = enemyMultiplier
  }

  Evaark.parseDifficulties = function(mod, paramName) {
    const paramList = PluginManager.parameters(`EK_${mod.name}`)[paramName];

    try {
      const list = JSON.parse(paramList || "[]");
      return list.map(entry => {
        const data = JSON.parse(entry);

        const name = data["Nome"];
        const player = Number(data["Dano Jogador"]) || 1;
        const enemy = Number(data["Dano Inimigo"]) || 1;

        return new Evaark.Difficulty(name, player, enemy);
      });
    } catch (e) {
      console.error("[EK_Core] Falha ao parsear Lista de Dificuldades", e);
      return [];
    }
  };

  Evaark.DifficultyEnum = Object.freeze({
    EASY: "easy",
    NORMAL: "normal",
    HARD: "hard",
  });

  Evaark.version = new Evaark.Version(1, 0, 0, "beta");
  Evaark.name = "Core"

  Evaark.debug = function (name, message) {
    if (!console.debug) return;
    const prefixStyle = "color: #6c757d; font-weight: bold;";
    const textStyle = "color: inherit;";

    console.debug(`%c[EK_${name}] %c${message}`, prefixStyle, textStyle);
  };

  Evaark.log = function (name, message) {
    const prefixStyle = "color: #17a2b8; font-weight: bold;";
    const textStyle = "color: inherit;";
    
    console.log(`%c[EK_${name}] %c${message}`, prefixStyle, textStyle);
  };

  Evaark.warn = function (name, message) {
    const prefixStyle = "color: #ffc107; font-weight: bold;";
    const textStyle = "color: inherit;";

    console.warn(`%c[EK_${name}] %c${message}`, prefixStyle, textStyle);
  };

  Evaark.error = function (name, message) {
    const prefixStyle = "color: #dc3545; font-weight: bold;";
    const textStyle = "color: inherit;";

    console.error(`%c[EK_${name}] %c${message}`, prefixStyle, textStyle);
  };

  Evaark.createModule = function (name, version) {
    if (this[name]) {
      Evaark.warn("Core", `Módulo '${name}' já existe e não será sobrescrito.`);
      return this[name];
    }
    Evaark[name] = {};
    Evaark[name].version = version || new Evaark.Version(0, 0, 0);
    Evaark[name].name = name;
    Evaark.Imported[name] = true;
    return this[name];
  };

  Evaark.timesRun = function () {
    try {
      let vezesIniciado = Number(localStorage.getItem("EK-vezesIniciado")) || 0;
      localStorage.setItem("EK-vezesIniciado", JSON.stringify(vezesIniciado + 1));
    } catch (err) {
      Evaark.error("Core", "Não foi possível salvar 'vezesIniciado' no localStorage.");
    }
  };

  Evaark.parseParamNumber = function ({value, min = -Infinity, name = "", def = 0, module = ""}) {
    const num = Number(String(value).replace(',', '.'));
    if (isNaN(num) || num < min) {
      Evaark.warn(module, `${name} menor que ${min}, ajustado para ${def}`);
      return def;
    }

    return num;
  }

  Evaark.loadParamsNumber = function(mod, schema) {
    const params = PluginManager.parameters(`EK_${mod.name}`);
    for (const key in schema) {
      const conf = schema[key];
      mod[key] = Evaark.parseParamNumber({
        value: params[conf.param],
        min: conf.min,
        name: conf.param,
        def: conf.default,
        module: mod.name 
      });
    }
  }

  Evaark.loadStructArray = function(mod, paramName) {
    const raw = PluginManager.parameters(`EK_${mod.name}`)[paramName];
    if (!raw) return [];
    try {
      return JSON.parse(raw).map(item => JSON.parse(item));
    } catch (e) {
      Evaark.error(mod.name, `Falha ao carregar lista: ${paramName}`);
      return [];
    }
  };

  Evaark.normalizeString = function (text) {
    return text.trim().toLowerCase();
  }

  Evaark.main = function () {
    Evaark.timesRun();
    Evaark.log("Core", `Carregado com sucesso - ${Evaark.version}`);
  };

  console.time("[EK_Core] Init Time");
  Evaark.main();
  console.timeEnd("[EK_Core] Init Time");
})(window);
