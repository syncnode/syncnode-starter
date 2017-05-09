import { SyncNodeClient } from 'syncnode-client';
//import { MainView } from './views';

//let mainView = new MainView();
//document.body.appendChild(mainView.el);

let client = new SyncNodeClient();

let reload = client.subscribe('reload');
reload.on('reload', () => window.location.reload());

let todo = client.subscribe('todo');
console.log('yay8!');
//todo.on('updated', () => {
//    console.log('updated: ', todo.data);
//    mainView.update(todo.data);
//});
