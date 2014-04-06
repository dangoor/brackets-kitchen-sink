## Brackets "Kitchen Sink" Example Extension
This extension isn't intended to be useful to end users.  It's intended to be an example extension that shows as many features and modules as possible in a working extension so that potential extension authors can see Brackets in action.

The extension is very open to Pull Requests as I intend it to be a collaborative effort with the already terrific community of Brackets and Brackets extension authors.

The basic rules for submitting a Pull Request are as follows:

* New functionality is typically driven off the top-level menu for the extension.  If your example is command driven, add a submenu item to the main extension menu.
* Code should be well documented.
* Code should be free of Linting problems.  Please edit the jslint directives if needed.
* Only use current Brackets APIs.  Consider submitting a new PR if you know your prior contribution has been altered by a Brackets API change.
* If your example demonstrates specific text formatting, consider including a sample document which you load with appropriate text/code that illustrates your example.
* Make sure any code you do not own the copyright to is properly attrbuted and/or complies with the license of the source.

**Note**: the extension is only just a beginning and doesn't have many examples... *for now*.  Until it has a little more *meat* I am not going to upload it to the Brackets Extension Registry.  In the meantime you can import the extension into Brackets from URL: 

1. Open `Extension Manager` in Brackets
1. Click the `Import from URL...` button in the lower-left corner
1. Enter the URL of this repo: `https://github.com/m0j0r1s1ng/brackets-kitchen-sink`


Feel free to log issues, submit pull requests or email me (email address is in the package.json) with questions, additions or ideas for this extension.

### Progress to date:
* **Hello World example** which inserts "Hello, world!" into the current editor at current cursor position
* **Toggle Preferences example** which toggles the state of an extension preference with a menu item
* **Simple Modal Dialog example** which opens a modal dialog from an HTML file and accepts input (added Apr 6,2014)
