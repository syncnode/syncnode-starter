import { SyncNode } from "syncnode-common";
import { SyncView, SyncList, SyncUtils } from "syncnode-client";


export class TodoItemModel extends SyncNode {
  text: string;
  complete: boolean;
}

export class MainModel extends SyncNode {
  todoItems: SyncNode;
}

export class TodoItem extends SyncView<TodoItemModel> {
	text = this.add('div', {"innerHTML":"","className":" div_text_style"});
	addBtn = this.add('button', {"innerHTML":"X","className":""});
	constructor(options: any = {}) {
		super(SyncUtils.mergeMap(options, { tag: 'li' }));
		this.el.className += ' ';
		this.text.addEventListener('click', () => {  this.data.set('complete', !this.data.complete);  });
		this.addBinding('text', 'innerHTML', 'data.text');
		this.addBtn.addEventListener('click', () => {  this.data.parent.remove(this.data.key);  });
	}
	render() {
        this.text.style.textDecoration = this.data.complete ? 'line-through' : 'none';
    }
}

SyncView.addGlobalStyle('.div_text_style', ` display: inline-block; width: 15em; `);
export class MainView extends SyncView<MainModel> {
	title = this.add('h1', {"innerHTML":"Todo List","className":""});
	newTodo = this.add('input', {"innerHTML":"","className":""});
	addBtn = this.add('button', {"innerHTML":"Add Todo","className":""});
	list = this.addView(new SyncList({ item: TodoItem, tag: 'ul' }), ' SyncList_list_style');
	constructor(options: any = {}) {
		super(SyncUtils.mergeMap(options, {}));
		this.el.className += ' ';
		this.el.className += ' MainView_style';
		this.addBtn.addEventListener('click', () => { 
            this.data.todoItems.setItem({ text: this.newTodo.value, complete: false });
            this.newTodo.value = '';
         });
		this.addBinding('list', 'update', 'data.todoItems');
	}
}

SyncView.addGlobalStyle('.SyncList_list_style', ` margin-top: 1em `);
SyncView.addGlobalStyle('.MainView_style', ` padding: 1em `);
