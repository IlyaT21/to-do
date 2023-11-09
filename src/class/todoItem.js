class TodoItem {
  constructor(title, description, priority = 'low', dateAdded, completed = false, dateCompleted) {
    this.title = title;
		this.description = description;
		this.priority = priority;
		this.dateAdded = new Date();
		this.completed = completed;
		this.dateCompleted = dateCompleted
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