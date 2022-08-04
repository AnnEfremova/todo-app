(function () {

    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.setAttribute('disabled', 'disabled');
        button.textContent = 'Добавить дело';

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return {
            form,
            input,
            button
        };

    }

    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem(name) {
        let item = document.createElement('li');
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = name;

        buttonGroup.classList.add('btn-group', 'button-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        return {
            item,
            doneButton,
            deleteButton,
        };
    }

    function createTodoApp(container, title, storageKey, tasks) {
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();
        let storageArray = [];

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        todoItemForm.input.addEventListener('input', function () {
            todoItemForm.button.removeAttribute('disabled');

            if (todoItemForm.input.value == '') {
                todoItemForm.button.setAttribute('disabled', 'disabled');
            }
        });

        todoItemForm.form.addEventListener('submit', function (e) {
            e.preventDefault();

            todoItemForm.button.setAttribute('disabled', 'disabled');

            if (!todoItemForm.input.value) {
                return;
            }

            let todoItem = createTodoItem(todoItemForm.input.value);
            let storageTask = { name: todoItemForm.input.value, done: 'false' };

            storageArray.push(storageTask);
            console.log(storageArray);
            localStorage.setItem(storageKey, JSON.stringify(storageArray));

            todoItem.doneButton.addEventListener('click', function () {
                todoItem.item.classList.toggle('list-group-item-success');
                if (todoItem.item.classList.contains('list-group-item-success')) {
                    storageArray[storageArray.indexOf(storageTask)].done = 'true';
                    console.log(storageArray);
                    localStorage.setItem(storageKey, JSON.stringify(storageArray));
                }
                else {
                    storageArray[storageArray.indexOf(storageTask)].done = 'false';
                    console.log(storageArray);
                    localStorage.setItem(storageKey, JSON.stringify(storageArray));
                }
            });

            todoItem.deleteButton.addEventListener('click', function () {
                if (confirm('Вы уверены?')) {
                    todoItem.item.remove();
                    storageArray.splice(storageArray.indexOf(storageTask));
                    localStorage.setItem(storageKey, JSON.stringify(storageArray));
                }
            });

            todoList.append(todoItem.item);

            todoItemForm.input.value = '';


        });
        
        if (JSON.parse(localStorage.getItem(storageKey)) == null) {
            storageArray = [];
        }
        else {
            storageArray = JSON.parse(localStorage.getItem(storageKey));
        }

        if (storageArray == []) {
            return;
        }
        else {

            for (let i = 0; i < storageArray.length; i++) {
                let taskItem = createTodoItem(storageArray[i].name);

                if (storageArray[i].done == 'true') {
                    taskItem.item.classList.toggle('list-group-item-success');
                }

                taskItem.doneButton.addEventListener('click', function () {
                    taskItem.item.classList.toggle('list-group-item-success');
                    if (taskItem.item.classList.contains('list-group-item-success')) {
                        storageArray[i].done = 'true';
                        console.log(storageArray);
                        localStorage.setItem(storageKey, JSON.stringify(storageArray));
                    }
                    else {
                        storageArray[i].done = 'false';
                        console.log(storageArray);
                        localStorage.setItem(storageKey, JSON.stringify(storageArray));
                    }
                });

                taskItem.deleteButton.addEventListener('click', function () {
                    if (confirm('Вы уверены?')) {
                        taskItem.item.remove();
                        storageArray.splice(i);
                        localStorage.setItem(storageKey, JSON.stringify(storageArray));
                    }
                });

                todoList.append(taskItem.item);
            }

        };



        if (!tasks) {
            return;
        };

        for (let i = 0; i < tasks.length; i++) {
            let taskItem = createTodoItem(tasks[i].name);

            if (tasks[i].done == 'true') {
                taskItem.item.classList.toggle('list-group-item-success');
            }

            taskItem.doneButton.addEventListener('click', function () {
                taskItem.item.classList.toggle('list-group-item-success');
            });

            taskItem.deleteButton.addEventListener('click', function () {
                if (confirm('Вы уверены?')) {
                    taskItem.item.remove();
                }
            });

            todoList.append(taskItem.item);
        }



    }

    window.createTodoApp = createTodoApp;
})();



