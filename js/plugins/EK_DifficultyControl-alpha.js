//=============================================================================
// EK_DifficultyControl.js
//=============================================================================

/*:
 * @target MV
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
 * @desc Define a variável do RPG Maker que será usada.
 * Padrão = 0001
 * @default 0001
 * 
 * @help
 * ============================================================================
 * Sobre
 * ============================================================================
 * Feito no RPG Maker MV 1.6.1.
 * Este plugin não tem comandos.
 * 
 * Ainda não sei como aplicar no jogo sem chamar o script
 * Preciso de ajuda.
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Versão 0.1.0-alpha
 */

var Evaark = Evaark || {};
Evaark.Imported = Evaark.Imported || {};
Evaark.Imported.difficultyControl = true;

Evaark.DifficultyControl = Evaark.DifficultyControl || {};

Evaark.DifficultyControl.version = [0, 1, 0];
Evaark.DifficultyControl.preRelese = "alpha5";

Evaark.DifficultyControl.params = PluginManager.parameters('EK_DifficultyControl');

Evaark.DifficultyControl.playerMultiplierEasy = Number(Evaark.DifficultyControl.params['Dano Jogador Fácil'] || 3);
Evaark.DifficultyControl.enemyMultiplierEasy = Number(Evaark.DifficultyControl.params['Dano Inimigo Fácil'] || 0.5);
Evaark.DifficultyControl.playerMultiplierNormal = Number(Evaark.DifficultyControl.params['Dano Jogador Normal'] || 3);
Evaark.DifficultyControl.enemyMultiplierNormal = Number(Evaark.DifficultyControl.params['Dano Inimigo Normal'] || 1);
Evaark.DifficultyControl.playerMultiplierHard = Number(Evaark.DifficultyControl.params['Dano Jogador Difícil'] || 2);
Evaark.DifficultyControl.enemyMultiplierHard = Number(Evaark.DifficultyControl.params['Dano Inimigo Difícil'] || 2);
Evaark.DifficultyControl.difficultyVariable = Number(Evaark.DifficultyControl.params['Variável'] || 0001);

Evaark.DifficultyControl.playerMultiplier = Evaark.DifficultyControl.playerMultiplierEasy;
Evaark.DifficultyControl.enemyMultiplier = Evaark.DifficultyControl.enemyMultiplierEasy;

Evaark.DifficultyControl.sceneLoadOnLoadSuccess = Scene_Load.prototype.onLoadSuccess;
Scene_Load.prototype.onLoadSuccess = function()
{
    console.log('Chamando DifficultyControl');
    Evaark.DifficultyControl.sceneLoadOnLoadSuccess.call(this);

    EkDifficultyControl.applyDifficulty(Evaark.DifficultyControl.difficultyVariable);
}

function EkDifficultyControl()
{
    this.initialize.apply(this, arguments);
}

EkDifficultyControl.applyDifficulty = function (variable)
{
    switch ($gameVariables.value(variable)) {
        case 'EASY':
            Evaark.DifficultyControl.playerMultiplier = Evaark.DifficultyControl.playerMultiplierEasy;
            Evaark.DifficultyControl.enemyMultiplier = Evaark.DifficultyControl.enemyMultiplierEasy;
            break;
    
        case 'NORMAL':
            Evaark.DifficultyControl.playerMultiplier = Evaark.DifficultyControl.playerMultiplierNormal;
            Evaark.DifficultyControl.enemyMultiplier = Evaark.DifficultyControl.enemyMultiplierNormal;
            break;

        case 'HARD':
            Evaark.DifficultyControl.playerMultiplier = Evaark.DifficultyControl.playerMultiplierHard;
            Evaark.DifficultyControl.enemyMultiplier = Evaark.DifficultyControl.enemyMultiplierHard;
            break;

        default:
            Evaark.DifficultyControl.playerMultiplier = 3;
            Evaark.DifficultyControl.enemyMultiplier = 1;
            break;
    }

    console.log('Valor da Variavel \'' + variable + '\': ' + $gameVariables.value(variable) + '\r\n' +
        'Multiplicador do jogador: ' + Evaark.DifficultyControl.playerMultiplier + '\r\n' +
        'Multiplicador do inimigo: ' + Evaark.DifficultyControl.enemyMultiplier);
};