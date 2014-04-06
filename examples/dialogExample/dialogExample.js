/*
* This is free and unencumbered software released into the public domain.
* 
* Anyone is free to copy, modify, publish, use, compile, sell, or
* distribute this software, either in source code form or as a compiled
* binary, for any purpose, commercial or non-commercial, and by any
* means.
* 
* In jurisdictions that recognize copyright laws, the author or authors
* of this software dedicate any and all copyright interest in the
* software to the public domain. We make this dedication for the benefit
* of the public at large and to the detriment of our heirs and
* successors. We intend this dedication to be an overt act of
* relinquishment in perpetuity of all present and future rights to this
* software under copyright law.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
* IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
* OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
* ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
* 
* For more information, please refer to <http://unlicense.org>
* 
* Intended to be a learning extension to get new extension developers 
* familiar with the various core features and modules of Brackets
*/

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, brackets, $ */

define(function (require, exports) {
	'use strict';
    
    // Brackets module dependencies
    var Dialogs             = brackets.getModule("widgets/Dialogs"),
    // local module dependencies
        exDialog            = require("text!examples/dialogExample/exDialog.html");
    
    
    /**    
     * pop up the modal dialog, accept input in a text field and display the Text
     * in the console on OK being pressed in the dialog.
     */
    function showDialog() {
        // just drawing a simple HTML dialog.  Future examples will use Mustache templates
        var dialog = Dialogs.showModalDialogUsingTemplate(exDialog);
        // callback to act on OK button press
        dialog.done(function (buttonId) {
			if (buttonId === 'ok') {
                var dialogtxt = dialog.getElement().find("#dialogtxt").val();
                // trivial example but this was about the dialog not the aftermath ;)
                console.log(dialogtxt);
            }
        });
    }
    // exports to allow access from other modules
    exports.showDialog  = showDialog;
});