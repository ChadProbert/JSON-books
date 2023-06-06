// This variable "types" is to access the books in sessionStorage
let types = JSON.parse(sessionStorage.getItem("persons")) || [];
let form = document.getElementById("form");
let btn = document.getElementById("btnValue");

function addComment() {
	// Capture the values of the input fields
	let name = document.getElementById("Name").value;
	let author = document.getElementById("author").value;
	let title = document.getElementById("title").value;
	let genre = document.getElementById("genre").value;
	let review = document.getElementById("review").value;
	let newPerson = { name, author, title, genre, review };

	// Add the new book to the array
	types.push(newPerson);
	// Update the session storage with the new array
	sessionStorage.setItem("persons", JSON.stringify(types));
	// Display the updated list of books
	showUs();
	// This resets the form to be empty.
	form.reset();
}

function showUs() {
	// Where the books will be displayed
	let bookList = document.getElementById("bookList");
	// Clears the list of books before adding new ones
	bookList.innerHTML = " ";

	types.forEach((book, index) => {
		let li = document.createElement("li");
		// Edit button wasn't showing because it was missing a closing quotation at the end of data-index
		li.innerHTML = `
        <span>Book Name: ${book.name}</span>
        <br>
        <span>Author: ${book.author}</span>
        <br>
        <span>Book Title: ${book.title}</span>
        <br>
        <span>Book genre: ${book.genre}</span>
        <br>
        <span>Book review: ${book.review}</span>
        <br>
        <button class="edit" data-index="${index}">Edit</button>
        <button class="remove" data-index="${index}">Remove</button>`;

		bookList.appendChild(li);
	});

	// Remove button functionality
	const removeButton = document.querySelectorAll(".remove");
	// This code is to loop through the remove buttons and add an event listener to each of them
	removeButton.forEach(function (buttonRemove) {
		buttonRemove.addEventListener("click", function (e) {
			//e.target.dataset.index targets the attribute of the remove button which is the index of the book.
			let index = e.target.dataset.index;
			// This code is to remove the book from the array using the index
			types.splice(index, 1);
			// This code is to update the session storage with the new array after removing the book
			sessionStorage.setItem("persons", JSON.stringify(types));
			// Display the updated list of books
			showUs();
		});
	});
}
showUs();

// Edit button functionality
bookList.addEventListener("click", function (event) {
	// Checks if the button clicked has a class name of edit
	if (event.target.classList.contains("edit")) {
		// This code is to get the index of the book using the data-index attribute
		const index = event.target.dataset.index;
		// This code is to get the book selected to edit using the index
		const book = types[index];

		// This code is to display the book details in the form
		document.getElementById("Name").value = book.name;
		document.getElementById("title").value = book.title;
		document.getElementById("author").value = book.author;
		document.getElementById("genre").value = book.genre;
		document.getElementById("review").value = book.review;

		// Remove the old book from the array
		types.splice(index, 1);
	}
});
