export default class TodoItem {
  constructor(title, description, priority, dueDate) {
    this.title = title;
    this.description = description;
    this.priority = priority;
		this.dateAdded = new Date();
    this.dueDate = dueDate;
    this.completed = false;
    this.dateCompleted = null;
  }

  toggle() {
    this.completed = !this.completed;

		if(this.completed == true) {
			this.dateCompleted = new Date();
		} else {
			this.dateCompleted = '';
		}
  }
}