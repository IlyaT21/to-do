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
  const existingItems = JSON.parse(localStorage.getItem('todoItems')) || [];

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
					<input type="text" name="title" id="title" value="${todoItem.title}">
					<textarea name="description" id="description" cols="30" rows="10" placeholder="Add a Description">
						${todoItem.description}
					</textarea>
					<select name="priority" id="priority">
						<option value="low" ${todoItem.priority === 'low' ? 'selected' : ''}>Low</option>
						<option value="medium" ${todoItem.priority === 'medium' ? 'selected' : ''}>Medium</option>
						<option value="high" ${todoItem.priority === 'high' ? 'selected' : ''}>High</option>
					</select>
					<input type="datetime-local" name="dueDate" id="dueDate" value="${todoItem.dueDate}">
					<button id="completeTask" data-taskNumber="${index}">
						Mark Complete
					</button>
					<button id="deleteTask" data-taskNumber="${index}">
						Delete
					</button>
				</div>
			`;
		}
  });

  appendHtml(html);
}

function showCompletedTasks() {
  const existingItems = JSON.parse(localStorage.getItem('todoItems')) || [];

  let html = '<ul>';
  existingItems.forEach(todoItem => {
		if(todoItem.completed) {
			html += `
				<li>
					<strong>Title:</strong> ${todoItem.title}<br>
					<strong>Description:</strong> ${todoItem.description}<br>
					<strong>Priority:</strong> ${todoItem.priority}<br>
					<strong>Due Date:</strong> ${todoItem.dueDate}<br>
					<strong>Date Completed:</strong> ${todoItem.dateCompleted}<br>
				</li>
			`;
		}
  });

  html += '</ul>';
  appendHtml(html);
}


