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
	    {content :"lerning js", status : true},
	    {content :"Watch videos", status : false},
	    {content :"be strong", status : true},
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
		content.textContent = todo.content
		content.style.textDecoration = todo.status ? 'initial' : 'line-through'
		let deleteBtn = document.createElement("img")
		deleteBtn.src = "media/icon_trash.png"
		deleteBtn.className = "float-right"
		li.append(content)
		li.append(deleteBtn)
		todosList.append(li)


		deleteBtn.addEventListener("click", e =>{
			todos.splice(index, 1)
			localStorage.setItem("todos", JSON.stringify(todos))
			createTodo(todos)
		})
		content.addEventListener("click", e =>{
			todos[index].status = !todos[index].status
			localStorage.setItem("todos", JSON.stringify(todos))
			createTodo(todos)
		})
	});
}
createTodo(todos)


let clicks = document.querySelector('#clicks')
let forms = document.querySelector('#forms')


Array.from(clicks.children).forEach(action => {
	if (action.dataset.action == "add") {
		action.addEventListener("click", e => {
			forms.innerHTML = `
				<form id="add">
					<input class="form-control" name="add" placeholder="Add todo ..">
				</form>
			`
			createTodo(todos)
			let add = document.querySelector('#add')
			add.addEventListener("submit", e =>{
				e.preventDefault()
				if (add.add.value) {
					todos.push({content :add.add.value , status:true})
					localStorage.setItem("todos", JSON.stringify(todos))
			        createTodo(todos)
				}
			})
		})
	} else if (action.dataset.action == "search") {
		action.addEventListener("click", e => {
			forms.innerHTML = `
				<form id="search">
					<input class="form-control" name="search" placeholder="Search todos ..">
				</form>
			`
			let search = document.querySelector("#search")
			search.addEventListener("keyup", e =>{
				e.preventDefault()
				if (search.search.value) {
					let filterd_todos = todos.filter(
						todo => todo.content.toLowerCase().includes(search.search.value.toLowerCase())
						)
					createTodo(filterd_todos)
				}else {
					createTodo(todos)
				}
			})
		})
	}
})