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

define(function (require, exports, module) {
    "use strict";
    
    // load the modules from core Brackets that will be used in the extension
    var CommandManager      = brackets.getModule("command/CommandManager"),
        EditorManager       = brackets.getModule("editor/EditorManager"),
        PreferencesManager  = brackets.getModule("preferences/PreferencesManager"),
        Menus               = brackets.getModule("command/Menus");
    
    // requirejs loading of dependencies for this extension.  
    // @contributors: add your examples as dependencies below
    var dialogExample      = require("examples/dialogExample/dialogExample");
        
    // add the top-level menu for "Kitchen Sink" after the Navigate menu
    var topMenu             = Menus.addMenu("Kitchen Sink", "brackets-kitchen-sink", Menus.AFTER, Menus.AppMenuBar.NAVIGATE_MENU);
    // Register command(s) - which are UI-less objects associating an ids to a handlers
    // define the hello world command
    // use package-style naming to avoid collisions       
    var cmdHelloWorld       = "kitchensink.writehello",
        cmdToggleEnabled    = "kitchensink.toggleenabled",
        cmdShowDialog       = "kitchensink.showdialog";
    
    // grab the set of preferences associated with this extension
    var prefs               = PreferencesManager.getExtensionPrefs("brackets-kitchen-sink");
    
/*
 * Main code for the "Insert Hello World" example.
 * ===============================================
 * This example creates a command, adds a submenu item to the extension top-level menu
 * and then defines a function to handle the activation of the command by the menu item.
 * 
 * The handler function inserts the text "Hello, world!" at the cursor position in the 
 * current editor window.  If the editor window is not in focus, then nothing happens.
 * 
 */
        
    /**    
     * handles the cmdHelloWorld command and inserts text into the current document
     * at the current cursor position   
     */
    function handleHelloWorld() {
        var editor = EditorManager.getFocusedEditor(),
            insertionPos;
        if (editor) {
            insertionPos = editor.getCursorPos();
            editor.document.replaceRange("Hello, world!", insertionPos);
        }
    }
    
    CommandManager.register("Insert Hello World", cmdHelloWorld, handleHelloWorld);

    // Create a menu item bound to the hello world example command
    // The label of the menu item is the name we gave the command (see above)
    topMenu.addMenuItem(cmdHelloWorld, "Ctrl-Alt-h");

/*
 * Main code for the toggle of a preference example
 * ================================================
 * This example creates a command, adds a submenu item to the extension top-level menu
 * and the defines a function to handle the toggling of a preference called "enabled"
 * when the menu item is clicked.
 * 
 * The toggleEnabled() function does a simple boolean toggle of the preEnabled var then
 * set the preference in Brackets PreferencesManager and saves the value (which then writes
 * the change to the brackets.json preferences file).  Finally, the CommandManager is used
 * to set the checked state of the toggled preference which adds or removes a checkmark
 * beside the menu item.
 * 
 * Hint: to see this item in action, click on Debug->Open Preferences File and look for the
 * "brackets-kitchen-sink.enabled": preference.  As you toggle the menu item, you will see
 * the preference change from "true" to "false", etc...
 */

    // define pref(s) for preferences example
    prefs.definePreference("enabled", "boolean", false)
        .on("change", function () {
            CommandManager.get(cmdToggleEnabled).setChecked(prefs.get("enabled"));
        });
    
    
    
    /**    
     * toggle the preference "enabled" and add it to the menu    
     */
    function toggleEnabled() {
        var prefEnabled = prefs.get("enabled");
        prefs.set("enabled", !prefEnabled);
        prefs.save();
    }
    
    // register the command for the toggle of the "enabled" preference
    CommandManager.register("Toggle Enabled Preference", cmdToggleEnabled, toggleEnabled);
    // add a submenu item for the "cmdToggleEnabled" command
    topMenu.addMenuItem(cmdToggleEnabled);

/*
 * Dialog example
 * ==============
 * This is a very simple example of adding a modal dialog to your extension.
 * A menu item is created to trigger the display of the dialog.
 * 
 * This example also shows the separation of the examples into multiple modules
 * using the built-in requirejs library.  In this main.js, we register the command and the menuitem
 * and called the exported function "showDialog" from the dialogExample.js module.  This is somewhat arbitrary
 * as the menu and command could have been handled in the dialogExample module too.
*/
    
    /**    
     * Calls the showDialog() method of the dialogExample module to show the modal dialogExample
     * used in this example code.    
     */
    function showDialog() {
        // exported from the dialogExample module
        dialogExample.showDialog();
    }
    // register the command for the show dialog example
    CommandManager.register("Show Example Dialog", cmdShowDialog, showDialog);
    // add a submenu item for the "cmdShowDialog" command
    topMenu.addMenuItem(cmdShowDialog);
});
