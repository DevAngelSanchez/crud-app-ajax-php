(() => {
    // const taskForm = document.getElementById('task-form');
    const search = document.getElementById('search');
    const addTaskForm = document.getElementById('task-form');
    getTasks();

    let edit = false;

    // ocultamos el div task-result mientras no se haya hecho una busqueda
    document.getElementById('task-result').style.display = "none";

    // search tasks
    search.addEventListener('keyup', () => {
        if (search.value) {
            // Obtenemos el valor del input y lo guardamos en una variable
            let value = search.value;
            console.log(value);
            // Instanciamos una variable del objeto FormData, y le agregamos el valor del input search
            let data = new FormData();
            data.append('search', value);
            // iniciamos la llamada ajax usando fetch
            fetch('./task-search.php', {
                method: 'POST',
                body: data
            })
                // recibimos la respuesta desde el backend
                .then((response => {
                    // si la respesta es exitosa, convierto el string en un JSON
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw "error en la llamada ajax";
                    }
                }))
                // recibo el objeto JSON con los datos de mi databse y procedo a usarlos
                .then(tasks => {
                    let template = '';
                    tasks.forEach(task => {
                        template += `<li>
                    ${task.name}
                </li>`;
                    });

                    document.getElementById('container').innerHTML = template;
                    document.getElementById('task-result').style.display = "block";
                })
                .catch(e => console.error(e));
        }
    });

    // add task
    addTaskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let taskName = document.getElementById('taskName');
        let taskDescription = document.getElementById('taskDescription');
        let taskId = document.getElementById('taskId');
        const postData = {
            name: taskName.value,
            description: taskDescription.value,
            id: taskId.value
        }

        let url = edit === false ? './task-add.php' : './task-edit.php';

        console.log(url);

        let data = new FormData();
        data.append('name', postData.name);
        data.append('description', postData.description);
        data.append('id', postData.id);
        fetch(url, {
            method: 'POST',
            body: data
        }).then(response => {
            addTaskForm.reset();
            if (!response.ok) {
                throw "Error al añadir los datos";
            } else {
                return response.text();
            }
        }).then(message => {
            // TODO: Crear un bloque div con el mensaje exitoso
            console.log(message);
            getTasks();
        })
    });

    // show tasks
    function getTasks() {
        fetch('./task-list.php').then(response => {
            return response.json();
        }).then(tasks => {
            console.log(task)
            let template = '';
            tasks.forEach(task => {
                template += /*html*/`
                    <tr taskId="${task.id}">
                        <td>${task.id}</td>
                        <td>
                            <a href="#" class="task-item">${task.name}</a>
                        </td>
                        <td>${task.description}</td>
                        <td>
                            <button class="btn btn-danger btn-delete">Delete</button>
                        </td>
                    </tr>
                `
            });

            const tasksElements = document.getElementById('tasks');
            tasksElements.innerHTML = template;

            const btnsDelete = document.getElementsByClassName('btn-delete');
            let btns = [].map.call(btnsDelete, (btn) => {
                return btn;
            });
            btns.forEach(btn => {
                btn.addEventListener('click', () => {
                    if (confirm('¿Estas seguro que desea elimnar esta tarea?')) {
                        let row = btn.parentElement.parentElement;
                        let id = row.getAttribute("taskId");
                        let data = new FormData();
                        data.append('id', id)
                        fetch('./task-delete.php', {
                            method: "POST",
                            body: data
                        }).then(response => {
                            if (!response.ok) {
                                throw "Error, no se pudo eliminar el elemento";
                            } else {
                                return response.text();
                            }
                        }).then(message => {
                            console.log(message);
                            getTasks();
                        }).catch(e => console.error(e));
                    }
                });
            });

            editTask();
        });

        function editTask() {
            let tasks = document.querySelectorAll('.task-item');
            tasks.forEach(task => {
                task.addEventListener('click', () => {
                    let id = task.parentElement.parentElement.getAttribute('taskId');
                    let data = new FormData();
                    data.append('id', id);
                    fetch('./task-single.php', {
                        method: 'POST',
                        body: data
                    }).then(response => {
                        // console.log(response.text());
                        if (response.ok) {
                            return response.json();
                        }
                    }).then(task => {
                        document.getElementById('taskName').value = `${task.name}`;
                        document.getElementById('taskDescription').value = `${task.description}`;
                        document.getElementById('taskId').value = `${task.id}`;
                        edit = true;
                    }).catch(e => console.error(e));
                });
            });
        }

    }
})();

