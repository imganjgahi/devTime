import * as vscode from 'vscode';
import {mangeTime} from './statusBar';
let remoteToken: string = vscode.workspace.getConfiguration("remoteId")["static.conf.nili.RemoteId"];

export const setRemoteToken = (_remoteId: string) => {
    remoteToken = _remoteId
}
const startTimer = () => {
    
    let canRestart = false;
    let keyStemps = 0;
    let timer: any;
    vscode.workspace.onDidChangeTextDocument(()=>{
        keyStemps++;
        if(!canRestart){
        timer = setInterval(async () => {
            clearInterval(timer);
            if(!remoteToken || remoteToken.length === 0){
                vscode.window.showInputBox({placeHolder: 'set your remote id'}).then((result) => {
                    if(result){
                        remoteToken = result;
                        vscode.workspace.getConfiguration("remoteId").update("static.conf.nili.RemoteId", result)
                    }

                })
            }
            vscode.workspace.findFiles('**/niliConfig.json', '**/node_modules/**', 1).then(result => {
                if(result.length > 0){
                 vscode.window.showWarningMessage("find: ", result[0].path)
                 vscode.workspace.fs.readFile(vscode.Uri.parse(result[0].path)).then(arr =>{
                    let str = "";
                    for (var i=0; i<arr.byteLength; i++) {
                      str += String.fromCharCode(arr[i]);
                    }
                    let message = JSON.parse(str);
                    console.log("msg:", message.name);
                 })
                }
            })
                vscode.window.showWarningMessage(`send to server:  ${keyStemps} : ${remoteToken}`);
                canRestart = false;
                keyStemps= 0;
                mangeTime();
            }, 3000);
        }
        canRestart = true;
        vscode.window.showInformationMessage(`start:  ${remoteToken}`)
    })

}

export default startTimer