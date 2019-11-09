import * as vscode from 'vscode';
let remoteToken: string = vscode.workspace.getConfiguration("remoteId")["static.conf.nili.RemoteId"];

export const setRemoteToken = (_remoteId: string) => {
    remoteToken = _remoteId
}
export default () => {
    
    let canRestart = false;
    let keyStemps = 0;
    let timer: any;
    vscode.workspace.onDidChangeTextDocument(()=>{
        keyStemps++;
        if(!canRestart){
        timer = setInterval(() => {
            clearInterval(timer);
            if(!remoteToken || remoteToken.length === 0){
                vscode.window.showInputBox({placeHolder: 'set your remote id'}).then((result) => {
                    if(result){
                        remoteToken = result;
                        vscode.workspace.getConfiguration("remoteId").update("static.conf.nili.RemoteId", result)
                    }

                })
            }
                vscode.window.showWarningMessage(`send to server:  ${keyStemps} : ${remoteToken}`);
                canRestart = false;
                keyStemps= 0;
            }, 3000);
        }
        canRestart = true;
        vscode.window.showInformationMessage(`start:  ${remoteToken}`)
    })

}