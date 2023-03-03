//=============================================================================
// EK_DifficultyControl.js
//=============================================================================

var Imported = Imported || {};
Imported.EK_DifficultyControl = true;

var Evaark = Evaark || {};
Evaark.DifficultyControl = Evaark.DifficultyControl || {};
Evaark.DifficultyControl.version = 1.0;

/*:
 * @plugindesc Controle de dificuldade.
 * @author EvaarK
 *
 * @param Fácil
 * @default
 * 
 * @param Dano Jogador Fácil
 * @type number
 * @decimals 2
 * @parent Fácil
 * @desc Define o multiplicador de dano do jogodor.
 * Padrão = 3
 * @default 3
 * 
 * @param Dano Inimigo Fácil
 * @type number
 * @decimals 2
 * @parent Fácil
 * @desc Define o multiplicador de dano do inimigo.
 * Padrão = 0.5
 * @default 0.5
 * 
 * @param Normal
 * @default
 * 
 * @param Dano Jogador Normal
 * @type number
 * @decimals 2
 * @parent Normal
 * @desc Define o multiplicador de dano do jogodor.
 * Padrão = 3
 * @default 3
 * 
 * @param Dano Inimigo Normal
 * @type number
 * @decimals 2
 * @parent Normal
 * @desc Define o multiplicador de dano do inimigo.
 * Padrão = 1
 * @default 1
 * 
 * @param Difícil
 * @default
 * 
 * @param Dano Jogador Difícil
 * @type number
 * @decimals 2
 * @parent Difícil
 * @desc Define o multiplicador de dano do jogodor.
 * Padrão = 2
 * @default 2
 * 
 * @param Dano Inimigo Difícil
 * @type number
 * @decimals 2
 * @parent Difícil
 * @desc Define o multiplicador de dano do inimigo.
 * Padrão = 2
 * @default 2
 * 
 * @param Variável
 * @type number
 * @min 1
 * @desc Define a variável usada.
 * Padrão = 1
 * @default 1
 * 
 * @help
 * ============================================================================
 * Sobre
 * ============================================================================
 * Feito no RPG Maker MV 1.6.1.
 * Este plugin não tem comandos.
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Versão 1.0:
 * - Lançamento Inicial.
 */

Evaark.Parameters = PluginManager.parameters('EK_DifficultyControl');
Evaark.Param = Evaark.Param || {};

Evaark.Param.PlayerMultiplierEasy = Number(Evaark.Parameters['Dano Jogador Fácil'] || 3);
Evaark.Param.EnemyMultiplierEasy = Number(Evaark.Parameters['Dano Inimigo Fácil'] || 0.5);
Evaark.Param.PlayerMultiplierNormal = Number(Evaark.Parameters['Dano Jogador Normal'] || 3);
Evaark.Param.EnemyMultiplierNormal = Number(Evaark.Parameters['Dano Inimigo Normal'] || 1);
Evaark.Param.PlayerMultiplierHard = Number(Evaark.Parameters['Dano Jogador Difícil'] || 2);
Evaark.Param.EnemyMultiplierHard = Number(Evaark.Parameters['Dano Inimigo Difícil'] || 2);
Evaark.Param.DifVariable = Number(Evaark.Parameters['Variável'] || 1);


Evaark.DifficultyControl.Scene_Load_onLoadSuccess = Scene_Load.prototype.onLoadSuccess;
Scene_Load.prototype.onLoadSuccess = function() {
    Evaark.DifficultyControl.Scene_Load_onLoadSuccess.call(this);

    EkDifficultyControl.ApplyDificulty(Evaark.Param.DifVariable);
}

function EkDifficultyControl() {
    this.initialize.apply(this, arguments);
}

EkDifficultyControl.ApplyDificulty = function (diffVar) {
    switch ($gameVariables.value(diffVar)) {
        case "EASY":
            Evaark.DifficultyControl.PlayerMultiplier = Evaark.Param.PlayerMultiplierEasy;
            Evaark.DifficultyControl.EnemyMultiplier = Evaark.Param.EnemyMultiplierEasy;
            break;
    
        case "NORMAL":
            Evaark.DifficultyControl.PlayerMultiplier = Evaark.Param.PlayerMultiplierNormal;
            Evaark.DifficultyControl.EnemyMultiplier = Evaark.Param.EnemyMultiplierNormal;
            break;

        case "HARD":
            Evaark.DifficultyControl.PlayerMultiplier = Evaark.Param.PlayerMultiplierHard;
            Evaark.DifficultyControl.EnemyMultiplier = Evaark.Param.EnemyMultiplierHard;
            break;

        default:
            Evaark.DifficultyControl.PlayerMultiplier = 3;
            Evaark.DifficultyControl.EnemyMultiplier = 1;
            break;
    }
};