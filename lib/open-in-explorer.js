'use babel';

import OpenInExplorerView from './open-in-explorer-view';
import {
    CompositeDisposable,
    BufferedProcess
} from 'atom';

export default {

    openInExplorerView: null,
    modalPanel: null,
    subscriptions: null,

    activate(state) {
        this.openInExplorerView = new OpenInExplorerView(state.openInExplorerViewState);
        this.modalPanel = atom.workspace.addModalPanel({
            item: this.openInExplorerView.getElement(),
            visible: false
        });

        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'open-in-explorer:toggle': () => this.toggle()
        }));
    },

    deactivate() {
        this.modalPanel.destroy();
        this.subscriptions.dispose();
        this.openInExplorerView.destroy();
    },

    serialize() {
        return {
            openInExplorerViewState: this.openInExplorerView.serialize()
        };
    },

    toggle() {
        let editor
        if (editor = atom.workspace.getActiveTextEditor()) {
            let filePath = "C:\\"
            let command = ""
            try {
                filePath = editor.getDirectoryPath();
            } catch (e) {
                //editor.insertText("File not found!")
            } finally {}

             try {
            command = 'explorer'
                args = [filePath]
            //editor.insertText(command)
            process = new BufferedProcess({
                    command
                    ,args
                })
                 } catch (e) {
                     //editor.insertText("\n openExplorer Failed!")
                 } finally {

                 }
        }
    }
};
