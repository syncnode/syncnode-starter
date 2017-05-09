import { SyncNodeClient } from 'syncnode-client';
import { MainView, MainModel } from './views';

let mainView = new MainView();
document.body.appendChild(mainView.el);

let client = new SyncNodeClient();

let reload = client.subscribe('reload');
reload.on('reload', () => window.location.reload());

let todo = client.subscribe('todo');
todo.on('updated', () => {
    console.log('updated: ', todo.data);
    mainView.update(todo.data as MainModel);
});
