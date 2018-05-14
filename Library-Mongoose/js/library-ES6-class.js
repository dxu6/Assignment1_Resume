// var Library = function() {
// 	this.myBookArray = new Array();
// 	this.myTaskArray = new Array(); // subArray for my temp task
// };
//
// var Book = function(title, author, numPages, pubDate, cover, action) {
// 	this.title = title;
// 	this.author = author;
// 	this.numPages = numPages;
// 	this.pubDate = new Date(pubDate);
// 	this.cover = cover; // additional to original BOOK constructor
// 	this.action = action; // additional to original BOOK constructor
// };
//
// (function(){
//   var singleton;
//   window.Library = function(){
//     if (singleton){
//       return singleton;
//     }
//     singleton = this;
//   }
// })();
var instance;

class Library {
        constructor(){
          // this.singletonName = singletonName;
          if(instance){return instance;}

        	this.myBookArray = [];
        	this.myTaskArray = []; // subArray for my temp task
          instance = this;
        }

        init(){
          this._getLocalStorage();
          this.myDistinctArray = [];
          this._bindEvents();
          debugger
          $("#id_dataTable").DataTable({
            data: this.myBookArray, // mapping DataTable to myBookArray
            columns: [
                        { data: "title" },
                        { data: "author" },
                        { data: "numPages" },
                        { data: "pubDate" },
                        { data: "cover" },
                        { data: "action" }
                     ]
          });

          $("#id_dataTableModal2").DataTable({
            data: this.myDistinctArray, // mapping DataTableModal2 to myDistinctArray
            columns: [{ data: "author" }]
          });
        }

        _bindEvents(){
          $("#id_topShowAllBtn").on("click", $.proxy(this._topShowAllBtnHandler, this)); //delegation
          $("#id_topRandomBookBtnModalInside").on("click",$.proxy(this._topRandomBookBtnModalInsideHandler, this));
          $("#id_topAddBookBtnModalInside").on("click",$.proxy(this._topAddBookBtnModalInsideHandler, this)	);

          $("#getAuthorsBtn").on("click",$.proxy(this._topDistAuthorBtnModalHandler, this));
          $("#deleteModal").on("click", $.proxy(this._deleteModalHandler, this));
          $("#saveModal").on("click",	$.proxy(this._saveChangeBtnModalInsideHandler, this));
          $("#id_footRemove").on("click", $.proxy(this._footRemoveHandler, this)); //delegation
          $("#id_footAddBook").on("click", $.proxy(this._footAddBookHandler, this));
        }

        _topAddBookBtnModalInsideHandler() {
        	this._addBook(
        		new Book(
        			$("#title_modal").val(),
        			$("#author_modal").val(),
        			$("#numPages_modal").val(),
        			$("#pubDate_modal").val(),
        			$("#cover_modal").val(),
        			"X"
        		)
        	);
        	this._tableDisplay();
        	$("#title_modal").val("");
        	$("#author_modal").val("");
        	$("#numPages_modal").val("");
        	$("#pubDate_modal").val("");
        	$("#cove_getr_modal").val("");
        }

        _saveChangeBtnModalInsideHandler() {
        	this._addBook(
        		new Book(
        			$("#title_modal").val(),
        			$("#author_modal").val(),
        			$("#numPages_modal").val(),
        			$("#pubDate_modal").val(),
        			$("#cover_modal").val(),
        			"X"
        		)
        	);
        	this._tableDisplay();
        	$("#title_modal").val("");
        	$("#author_modal").val("");
        	$("#numPages_modal").val("");
        	$("#pubDate_modal").val("");
        	$("#cover_modal").val("");
        }

        _topShowAllBtnHandler() {
        	this._tableDisplay();
        }

        _topRandomBookBtnModalInsideHandler() {
        	this._getRandomBook();
        }

        _topDistAuthorBtnModalHandler() {
        	this._getAuthors();
        	this._tableDisplayModal2();
        }

        _footRemoveHandler() {
        	//  $(e.currentTarget).parent("").parent("tr").remove();
        	var footTitle = $("#id_footTitle").val();
        	var footAuthor = $("#id_footAuthor").val();
        	if (footTitle !== null && footTitle !== "") {
        		this._removeBookByTitle(footTitle);
        	} else if (footAuthor !== null && footAuthor !== "") {
        		this._removeBookByAuthor(footAuthor);
        	}
        	this._tableDisplay();
        }

        _deleteModalHandler() {
        	//  $(e.currentTarget).parent("").parent("tr").remove();
        	var modalTitle = $("#title_modal").val();
        	var modalAuthor = $("#author_modal").val();
        	if (modalTitle !== null && modalTitle !== "") {
        		this._removeBookByTitle(modalTitle);
        	} else if (modalAuthor !== null && modalAuthor !== "") {
        		this._removeBookByAuthor(modalAuthor);
        	}

        	this._tableDisplay();
        	$("#title_modal").val("");
        	$("#author_modal").val("");
        	$("#numPages_modal").val("");
        	$("#pubDate_modal").val("");
        	$("#cover_modal").val("");
        }

        _footAddBookHandler() {
        	this._addBook(
        		new Book(
        			$("#id_footTitle").val(),
        			$("#id_footAuthor").val(),
        			$("#id_footNumPages").val(),
        			$("#id_footPubDate").val(),
        			"img/learning.jpg",
        			"X"
        		)
        	);
        	this._tableDisplay();
        }

        _tableDisplay() {
        	$("#id_dataTable")
        		.dataTable()
        		.fnDestroy();
        	$("#id_dataTable").DataTable({
        		data: this.myBookArray, // mapping DataTable to myBookArray
        		columns: [
        			{ data: "title" },
        			{ data: "author" },
        			{ data: "numPages" },
        			{ data: "pubDate" },
        			{ data: "cover" },
        			{ data: "action" }
        		]
        	});
        }

        _tableDisplayModal2() {
        	$("#id_dataTableModal2")
        		.dataTable()
        		.fnDestroy();
        	this._getAuthors();
        	$("#id_dataTableModal2").DataTable({
        		data: this.myDistinctArray.map(value => {
        			return { author: value };
        		}), // mapping DataTableModal2 to myDistinctArray
        		columns: [{ data: "author" }]
        	});
        }

      _addBook(book) {

        	if (book == null) {
        		console.log("No Book Argument");
        		return false;
        	}
        	// add A book only


        	for (var i = 0; i < this.myBookArray.length; i++) {
        		if (
        			this.myBookArray[i].title.toUpperCase() === book.title.toUpperCase() &&
        			this.myBookArray[i].author.toUpperCase() === book.author.toUpperCase()
        		) {
        			return false;
        		}
        	}

        	this.myBookArray.push(book);
        	return true;
        }

      _removeBookByTitle(title) {
        	// remove all matched books by Title
        	// case insensitive
        	var status = false;
        	console.log("remove the book: " + title);
        	for (var i = 0; i < this.myBookArray.length; i++) {
        		if (this.myBookArray[i].title.toUpperCase() === title.toUpperCase()) {
        			this.myBookArray.splice(i, 1);
        			status = true;
        		}
        	}
        	console.log(this.myBookArray);
        	// this._getLocalStorage();
        	return status;
        }

        _removeBookByAuthor(authorName) {
        	// remove all matched books by AUthor authorNames
        	// case insensitive
        	var status = false;
        	// var origLength = this.myBookArray.length;
        	console.log("remove the authorname: " + authorName);
        	for (var i = 0; i < this.myBookArray.length; i++) {
        		if (this.myBookArray[i].author.toUpperCase() === authorName.toUpperCase()) {
        			this.myBookArray.splice(i, 1);
        			// return true;
        			status = true;
        		}
        	}
        	return status;
        }

      _getRandomBook() {
        	// generate a Random number [0, length]
        	// index of an array [0, lemgth-1]
        	console.log(this.myBookArray.length);

        	if (this.myBookArray.length == 0) {
        		return null;
        	} else if (this.myBookArray.length == 1) {
        		// return true;
        		console.log(this.myBookArray);
        	} else {
        		var i = Math.floor(Math.random() * (this.myBookArray.length - 1));
        		$("#title_modal").val(this.myBookArray[i].title);
        		$("#author_modal").val(this.myBookArray[i].author);
        		$("#numPages_modal").val(this.myBookArray[i].numPages);
        		$("#pubDate_modal").val(this.myBookArray[i].pubDate);
        		$("#cover_modal").val(this.myBookArray[i].cover);
        	}
        }

        _getBookByTitle(subTitle) {
        	// partially match by substring of subTitle
        	// case insensitive
        	// return matched array
        	this.myTaskArray = [];

        	for (var i = 0; i < this.myBookArray.length; i++) {
        		if (
        			this.myBookArray[i].title
        				.toUpperCase()
        				.indexOf(subTitle.toUpperCase()) !== -1
        		) {
        			console.log(this.myBookArray[i]);
        			this.myTaskArray.push(this.myBookArray[i]);
        		}
        	}
        	console.log(this.myTaskArray);
        }

        _getBooksByAuthor(subAuthor) {
        	// partially match by substring of author names
        	// case insensitive
        	// return matched array
        	var subLength = subAuthor.length;
        	this.myTaskArray = [];
        	for (var i = 0; i < this.myBookArray.length; i++) {
        		var authorLength = this.myBookArray[i].author.length;
        		for (var j = 0; j < authorLength; j++) {
        			if (
        				this.myBookArray[i].author.toUpperCase().substr(j, subLength) ==
        				subAuthor.toUpperCase()
        			) {
        				console.log(this.myBookArray[i]);
        				this.myTaskArray.push(this.myBookArray[i]);
        			}
        		}
        	}
        	console.log(this.myTaskArray);
        }

        _addBooks(booksList) {
        	//booksList is an array with multiple books
        	// call addBook() for single book by FOR loop
        	this.myTaskArray = [];
        	var count = 0;
        	if (booksList.length < 1) {
        		console.log("error: need books!");
        		return null;
        	} else {
        		for (var i = 0; i < booksList.length; i++) {
        			this._addBook(booksList[i]);
        			this.myTaskArray.push(booksList[i]);
        			count = count + 1;
        		}
        	}
        	console.log(count);
        	console.log(this.myTaskArray);
        }

        _getAuthors() {
        	// get authors by  complete names
        	// case insensitive
        	// return matched array
        	// $(".auth").each(function(i,v){
        	//   distinctArray.push($(v).text());
        	// });
        	//   alert(distinctArray.join(","));
        	this.myDistinctArray = [];
        	if (this.myBookArray.length == 0) {
        		return "null -- No books exist!";
        	}

        	for (var i = 0; i < this.myBookArray.length; i++) {
        		this.myDistinctArray.push(this.myBookArray[i].author);
        	}
        	// console.log(myDistinctArray);
        	for (var i = 0; i < this.myDistinctArray.length; i++) {
        		for (var j = i + 1; j < this.myDistinctArray.length; j++) {
        			//console.log(myDistinctArray[i]);
        			if (
        				this.myDistinctArray[i].toUpperCase() ===
        				this.myDistinctArray[j].toUpperCase()
        			) {
        				//console.log(myDistinctArray[j]);
        				this.myDistinctArray.splice(j, 1);
        			}
        		}
        	}
        	// console.log(myDistinctArray);
        }

        _getRandomAuthorName() {
        	// get the entire Author Name by random
        	var distinctAuthors = [];
        	if (this.myBookArray.length == 0) {
        		return "null -- No books exist!";
        	} else if (this.myBookArray.length == 1) {
        		console.log(this.myBookArray[0].author);
        	} else {
        		var i = Math.floor(Math.random() * (this.myBookArray.length - 1));
        		console.log(this.myBookArray[i].author);
        	}
        }

        // Bonus parts
        _setLocalStorage() {
        	try {
        		localStorage.setItem("DX", JSON.stringify(this.myBookArray));
        		return true;
        	} catch (exception) {
        		return false;
        	}
        }

        _getLocalStorage() {
        	// return this.myBookArray = JSON.parse(localStorage.getItem(instanceKey));
        	// this.myBookArray = JSON.parse(localStorage.getItem("DX"));
        	// if (this.myBookArray === null) {this._addBook(); // need change}
        	// return this.myBookArray;
        	try {
        		var myJSON = JSON.parse(localStorage.getItem("DX"));
        		console.log(myJSON);
        		// myJSON.forEach(function(book) {
        		// myJSON.forEach(book) {
        		//this._addBook(book);
        		// alert("123");
        		for (var i = 0; i < myJSON.length; i++) {
        			this._addBook(
        				new Book(
        					myJSON[i].title,
        					myJSON[i].author,
        					myJSON[i].numPages,
        					myJSON[i].pubDate,
        					myJSON[i].cover,
        					// myJSON[i].action
        					"X"
        				)
        			);
        		}
        		return true; // able to get library from local storage
        	} catch (exception) {
        		return false;
        	}
        }

        // search options either by Title or Authors
        _search(filterString) {
        	// search the Title or Author fields to match filterString
        	// no usin filter() pre-defined functions

        	var myTaskArray = [];
        	for (var i = 0; i < this.myBookArray.length; i++) {
        		if (
        			this.myBookArray[i].title
        				.toUpperCase()
        				.indexOf(filterString.toUpperCase()) !== -1 ||
        			this.myBookArray[i].author
        				.toUpperCase()
        				.indexOf(filterString.toUpperCase()) !== -1
        		) {
        			//this.getBookByTitle(filterString); // all partilly matches
        			myTaskArray.push(this.myBookArray[i]);
        		}
        	}
        	console.log(myTaskArray);
        }

}


class Book {
      constructor(title, author, numPages, pubDate, cover, action) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.pubDate = new Date(pubDate);
        this.cover = cover; // additional to original BOOK constructor
        this.action = action; // additional to original BOOK constructor
      }


}
//
// class Book exteneds Library {
// consructor(){super(Libraray);
// }
//
// }

// (function(){
//   var singleton;
//   window.Library = function(){
//     if (singleton){
//       return singleton;
//     }
//     singleton = this;
//   }
// })();

// no $(document).on(ready, function(){}

$(function(){
  // var instance = "Boulder";
   // var instance = new Library("Boulder");
   // var gLib = window.gLib;
   var glib = new Library();
   glib.init();
   // (new Library()).init(); // loading from localStorage
   // var myBookArray = new BookArray[];
   // var myTaskArray = new TaskArray[];
});

// book instances
// var gIt0 = new Book({title: "IT", author: "S King", numPages: 800, pubDate: "Decembher 17, 1995 03:24:00"}); // problem
// var gIt0 = new Book("IT","S King",800,"Decembher 17, 1995 03:24:00","","");
var gIt1 = new Book(
	"IT",
	"Stephen King",
	800,
	"Decembher 17, 1995 03:24:00",
	"",
	"remove"
);
var gCatcher2 = new Book(
	"Catcher In the Rye",
	"JD Salinger",
	600,
	"December 2, 2005 04:24:00",
	"",
	"remove"
);
var gBootStrap3 = new Book(
	"BootStrap",
	"KristineV",
	400,
	"May 5, 2018 16:50:00",
	"",
	"remove"
);
var gJavaScript4 = new Book(
	"JavaScript201",
	"Kyle Brothis",
	200,
	"April 5, 2018 16:50:00",
	"",
	"remove"
);
var gHtmlCss5 = new Book(
	"HTMLCSS",
	"DavidX",
	100,
	"January 1, 2018 6:50:00",
	"",
	"remove"
);
var gHtmlCss6 = new Book(
	"Java201",
	"KristineV",
	100,
	"January 1, 2018 6:50:00",
	"",
	"remove"
);
var gBootStrap7 = new Book(
	"Boot",
	"Kyle Brothis",
	400,
	"May 5, 2018 16:50:00",
	"",
	"remove"
);

// var allBooks = ([gHtmlCss5, gHtmlCss6, gBootStrap7]);
// books[gIT1, gCatcher2, gBootStrap3, gJavascript4, gHtmlCss5];
// booksTitles["IT","Catcher In the Rye", "BootStrap","Kritine", "JavaScript201", "HTMLCSS" ]
// authorNames["Stephen King","JD Salinger", "KristineV", "Kyle Brothis", "DavidX" ]

var allBooks = [
	{
		title: "IT",
		author: "Stephen King",
		numPages: 800,
		pubDate: "Decembher 17, 1995 03:24:00",
		cover: "",
		action: "X"
	},

	{
		title: "Catcher In the Rye",
		author: "JD Salinger",
		numPages: 600,
		pubDate: "December 2, 2005 04:24:00",
		cover: "",
		action: "X"
	},

	{
		title: "BootStrap",
		author: "KristineV",
		numPages: 400,
		pubDate: "May 5, 2018 16:50:00",
		cover: "",
		action: "X"
	},

	{
		title: "JavaScript201",
		author: "Kyle Brothis",
		numPages: 200,
		pubDate: "April 5, 2018 16:50:00",
		cover: "",
		action: "X"
	},

	{
		title: "HTMLCSS",
		author: "DavidX",
		numPages: 100,
		pubDate: "January 1, 2018 6:50:00",
		cover: "",
		action: "X"
	},

	{
		title: "Java201",
		author: "KristineV",
		numPages: 100,
		pubDate: "January 1, 2018 6:50:00",
		cover: "",
		action: "X"
	},

	{
		title: "Boot",
		author: "Kyle Brothis",
		numPages: 400,
		pubDate: "May 5, 2018 16:50:00",
		cover: "",
		action: "X"
	}
];
