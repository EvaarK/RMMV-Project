//=============================================================================
// EK_VolumeOffset.js
//=============================================================================

/*:
 * @target MV
 * @plugindesc Altera o valor que modifica o volume.
 * @author EvaarK
 *
 * @param Valor
 * @type number
 * @min 1
 * @desc Define o valor que modifica o volume.
 * Padrão: 20
 * @default 20
 * 
 * @param Valor Shift
 * @type decimal
 * @min 1
 * @desc Define o multiplicador com shift apertado.
 * Padrão: 1.00
 * @default 1.00
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
 * Versão 1.1.0:
 * - Mudança no código.
 * 
 * Versão 1.0.0:
 * - Lançamento Inicial.
 */

var Evaark = Evaark || {};
Evaark.Imported = Evaark.Imported || {};
Evaark.Imported.volumeOffset = true;

Evaark.VolumeOffset = Evaark.VolumeOffset || {};

Evaark.VolumeOffset.version = [1, 1, 0];

Evaark.VolumeOffset.params = PluginManager.parameters('EK_VolumeOffset');

Evaark.VolumeOffset.value = Number(Evaark.VolumeOffset.params['Valor'] || 20);
Evaark.VolumeOffset.multiplier = Number(Evaark.VolumeOffset.params['Valor Shift'] || 1.00);

Window_Options.prototype.volumeOffset = function()
{
    if (Input.isPressed(Input.keyMapper[16]))
    {
        let returno = Evaark.VolumeOffset.value * Evaark.VolumeOffset.multiplier;
        console.log((returno) + " " + Input.isPressed(Input.keyMapper[16]));
        return returno;
    }
    
    console.log(Evaark.VolumeOffset.value + " " + Input.isPressed(Input.keyMapper[16]));
    return Evaark.VolumeOffset.value;
}