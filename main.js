class TaskManager {
    tasks = [];
    lastId = 0;
    tagTasks = null;
    tagText = null;
    nameLabelStorage = 'tasks';

    constructor(tagTasks, tagText) {
        this.tagTasks = tagTasks;
        this.tagText = tagText;

        if(localStorage.getItem(this.nameLabelStorage) !== null) {
            this.tasks = JSON.parse(localStorage.getItem(this.nameLabelStorage));
            this.lastId = this.tasks.length > 0 ? this.tasks[this.tasks.length-1].id : 0;
            this.refresh();
        }
    }

    add() {
        if(!this.tagText.value) return;

        this.lastId++;
        this.tasks.push({
            id: this.lastId,
            text: this.tagText.value
        });

        localStorage.setItem(this.nameLabelStorage, JSON.stringify(this.tasks));

        this.tagText.value = "";
        this.tagText.focus();

        this.refresh();
    }

    refresh() {
        this.tagTasks.innerHTML = "";

        this.tasks.forEach(task => {
            let div = document.createElement('div');
            let divRemove = document.createElement('div');
            let buttonRemove = document.createElement('input');

            div.innerHTML = task.text;
            divRemove.className = 'remove_button';

            buttonRemove.value = 'X';
            buttonRemove.className = 'btn--danger';
            buttonRemove.type = 'button';
            buttonRemove.addEventListener('click', () => {
                this.remove(task.id);
            });

            divRemove.appendChild(buttonRemove);
            div.appendChild(divRemove);
            this.tagTasks.appendChild(div);
        });
    }

    remove(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        localStorage.setItem(this.nameLabelStorage, JSON.stringify(this.tasks));
        this.refresh();
    }
}