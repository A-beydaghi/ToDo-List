// get todos from localStorage
let todos = localStorage.getItem("todos")

// try parse data or null
try {
	todos = JSON.parse(todos)
	todos = todos.length ? todos : null
} catch(e) {
	todos = null
}

// set default value if todos == null
if (!todos) {
	todos = [
		"lerning js",
		"Watch videos",
		"be strong",
	]
	localStorage.setItem("todos", JSON.stringify(todos))
}

function createTodo(todos) {
	let todosList = document.querySelector("#todos-list")
	todosList.innerHTML = ""

	todos.forEach((todo ,index )=> {
		let li = document.createElement("li")
		li.className = "list-group-item"
		let content= document.createElement("span")
		content.textContent = todo
		let deleteBtn = document.createElement("img")
		deleteBtn.src = "media/delete.png"
		deleteBtn.className = "float-right"
		li.append(content)
		li.append(deleteBtn)
		todosList.append(li)


		deleteBtn.addEventListener("click", e =>{
			todos.splice(index, 1)
			localStorage.setItem("todos", JSON.stringify(todos))
			createTodo(todos)
		})
	});
}
createTodo(todos)