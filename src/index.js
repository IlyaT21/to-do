import './styles.scss';
import TodoItem from './class/todoItem';

const display = document.getElementById('main-display');
const pendingTasks = document.getElementById('pendingTasks');
const completedTasks = document.getElementById('completedTasks');
const addNewTask = document.getElementById('addNewTask');

document.addEventListener('DOMContentLoaded', () => {
  showAddNewTask();
});

pendingTasks.addEventListener('click', () => {
	showPendingTasks();
})
addNewTask.addEventListener('click', () => {
	showAddNewTask();
})
completedTasks.addEventListener('click', () => {
	showCompletedTasks();
})

function appendHtml (html) {
	display.innerHTML = html;
}

function addDeleteTaskEventListeners() {
  const deleteButtons = document.querySelectorAll('#deleteTask');

  deleteButtons.forEach(button => {
    button.addEventListener('click', function () {
      const taskNumber = this.getAttribute('data-taskNumber');
      deleteTask(taskNumber);
    });
  });
}

function addCompleteTaskEventListeners() {
  const completeButtons = document.querySelectorAll('#completeTask');

  completeButtons.forEach(button => {
    button.addEventListener('click', function () {
      const taskNumber = this.getAttribute('data-taskNumber');
      completeTask(taskNumber);
    });
  });
}


function deleteTask(index) {
  const existingItems = JSON.parse(localStorage.getItem('todoItems')) || [];
  existingItems.splice(index, 1);
  localStorage.setItem('todoItems', JSON.stringify(existingItems));
  showPendingTasks();
}

function completeTask(index) {
  const existingItems = JSON.parse(localStorage.getItem('todoItems')) || [];
  existingItems[index].completed = !existingItems[index].completed;
	existingItems[index].dateCompleted = new Date();
  localStorage.setItem('todoItems', JSON.stringify(existingItems));
  showPendingTasks();
}

// May be finished in the future
// function sortItemsByDateHandler(items) {
//   return function() {
//     const sortedItems = sortItemsByDate(items);
//     showPendingTasksWithSortedItems(sortedItems);
//   };
// }

// function sortItemsByPriorityHandler(items) {
//   return function() {
//     const sortedItems = sortItemsByPriority(items);
//     showPendingTasksWithSortedItems(sortedItems);
//   };
// }

// function showPendingTasksWithSortedItems(sortedItems) {
//   localStorage.setItem('todoItems', JSON.stringify(sortedItems));
//   showPendingTasks();
// }

function showAddNewTask () {
	let html = `
		<form action="" id="addTaskForm">
			<input type="text" name="title" id="title" placeholder="Title" required>
			<textarea name="description" id="description" placeholder="Description"></textarea>
			<select name="priority" id="priority">
				<option value="low">Low</option>
				<option value="medium">Medium</option>
				<option value="high">High</option>
			</select>
			<input type="datetime-local" name="dueDate" id="dueDate">
			<input type="submit" value="Add">
		</form>
	`;

	appendHtml(html);

	document.getElementById('addTaskForm').addEventListener('submit', function (event) {
		event.preventDefault();
	
		const title = document.getElementById('title').value;
		const description = document.getElementById('description').value;
		const priority = document.getElementById('priority').value;
		const dueDate = document.getElementById('dueDate').value;
	
		const newTodoItem = new TodoItem(title, description, priority, dueDate);
		const existingItems = JSON.parse(localStorage.getItem('todoItems')) || [];
		existingItems.push(newTodoItem);
		localStorage.setItem('todoItems', JSON.stringify(existingItems));
		event.target.reset();
	
		alert('Task added successfully!');
	});
}

function showPendingTasks() {
  let existingItems = JSON.parse(localStorage.getItem('todoItems')) || [];
  let html = `
				<nav class="sort-options">
					<button id="sortDate" class="active">
						Date
					</button>
					<button id="sortPriority">
						Priority
					</button>
				</nav>
			`;
  existingItems.forEach((todoItem, index) => {
		if(!todoItem.completed) {
			html += `
				<div class="tasks-list">
					<strong>Title:</strong> ${todoItem.title}<br>
					<strong>Description:</strong> ${todoItem.description}<br>
					<strong>Priority:</strong> ${todoItem.priority}<br>
					<strong>Due Date:</strong> ${todoItem.dueDate}<br>
					<button id="completeTask" data-taskNumber="${index}">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="black">
							<path d="M20 6L9 17l-5-5 1.5-1.5L9 14l10.5-10.5L20 6z"/>
						</svg>				
					</button>
					<button id="deleteTask" data-taskNumber="${index}">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="black">
							<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
						</svg>
					</button>
				</div>
			`;
		}
  });

  appendHtml(html);
	addDeleteTaskEventListeners();
	addCompleteTaskEventListeners();

  document.getElementById('sortDate').addEventListener('click', sortItemsByDateHandler(existingItems));
  document.getElementById('sortPriority').addEventListener('click', sortItemsByPriorityHandler(existingItems));
}

function showCompletedTasks() {
  let existingItems = JSON.parse(localStorage.getItem('todoItems')) || [];

  let html = '';
  existingItems.forEach(todoItem => {
		if(todoItem.completed) {
			html += `
				<div class="tasks-list">
					<strong>Title:</strong> ${todoItem.title}<br>
					<strong>Description:</strong> ${todoItem.description}<br>
					<strong>Priority:</strong> ${todoItem.priority}<br>
					<strong>Due Date:</strong> ${todoItem.dueDate}<br>
					<strong>Date Completed:</strong> ${todoItem.dateCompleted}<br>
				</div>
			`;
		}
  });

  appendHtml(html);
}


