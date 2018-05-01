var Library =  function(){
  this.myBookArray = new Array();
  this.myTaskArray = new Array(); // subArray for my temp task
};

var Book = function(title, author, numPages, pubDate, cover, action){
  this.title =  title;
  this.author = author;
  this.numPages = numPages;
  this.pubDate = new Date(pubDate);
  this.cover = cover;   // additional to original BOOK constructor
  this.action = action; // additional to original BOOK constructor
};

$(document).ready(function(){
    window.gLib = new Library();
    var gLib = window.gLib;

    gLib.init();   // loading from localStorage

    $('#id_dataTable').DataTable({
      data: gLib.myBookArray,    // mapping DataTable to myBookArray
      columns: [
                  {data: 'title'},
                  {data: 'author'},
                  {data: 'numPages'},
                  {data: 'pubDate'},
                  {data: 'cover'},
                  {data: 'action'}
               ]
    });
});

// Bind listeners
Library.prototype.init = function () {
  // get localStorage as database to pre-load UI Application
  this._getLocalStorage();
  this._bindEvents();

  // #id_dataTable
  // #id_dataTableTitle
  // #id_dataTableAuthor
  // #id_dataTableNumPages
  // #id_dataTablePubDate
  // #id_dataTableImage
  // #id_dataTableRemove

  // #id_topRandomBookBtn
  // #id_topDistAuthorBtn

  // #id_footTitle
  // #id_footAuthor
  // #id_footNumPages
  // #id_footPubDate
  // #id_footImage
  //
  // #id_footAddBook
  // #id_footAddBooks
  // #id_footRename
  // #id_footRemove
  // this._setLocalStorage("DX");

};

//  function() from library.prototype
//       this._bindEvents();
//       this._footremoveHandler();
//       this._footAddBookHandler;
//       this._footAddBooksHandler;
//       this._showLibrary()

//       this._addBook(book);
//       this._addBooks(books);
//       this._removeBookByTitle(title);
//       this._removeBookByAuthor(authorName);

//       this._getBookByTitle(title);
//       this._getBooksByAuthor(authorName);

//       this._getRandomBook();
//       this._getAuthors();

//       this._setLocalStorage();
//       this._getLocalStorage();
// };

Library.prototype._bindEvents = function(){
  $("#id_footRemove").on("click", $.proxy(this._footRemoveHandler, this));  //delegation
  $("#id_footAddBook").on("click", $.proxy(this._footAddBookHandler, this));
  $("#id_topRandomBookBtn").on("click", $.proxy(this._topRandomBookBtnHandler, this));
  $("#id_topDistAuthorBtn").on("click", $.proxy(this._topDistAuthorBtnHandler, this));
};

Library.prototype._topRandomBookBtnHandler = function(e){
   this._getRandomBook();
     // this._tableDisplay();
};


Library.prototype._topDistAuthorBtnHandler = function(e){
  this._getAuthors();

   this._tableDisplay();
};

Library.prototype._footRemoveHandler = function(e){
   //  $(e.currentTarget).parent("").parent("tr").remove();
       var footTitle = $("#id_footTitle").val();
       var footAuthor = $("#id_footAuthor").val();
         if ((footTitle !== null) && (footTitle !== "")) {
           this._removeBookByTitle(footTitle);
         }
         else if ((footAuthor !== null) && (footAuthor !== "")){
          this._removeBookByAuthor(footAuthor);
         }

       this._tableDisplay();
};

Library.prototype._footAddBookHandler = function(){
   this._addBook(new Book(
                      $("#id_footTitle").val(),
                      $("#id_footAuthor").val(),
                      $("#id_footNumPages").val(),
                      $("#id_footPubDate").val(),
                      "img/learning.jpg",
                      "X"
                 )
              );
   this._tableDisplay();
};

Library.prototype._tableDisplay =  function(){
          $('#id_dataTable').dataTable().fnDestroy();
          $('#id_dataTable').DataTable({
          data: this.myBookArray,    // mapping DataTable to myBookArray
          columns: [
                      {data: 'title'},
                      {data: 'author'},
                      {data: 'numPages'},
                      {data: 'pubDate'},
                      {data: 'cover'},
                      {data: 'action'}
                   ]
         });
};

// Library.prototype._footAddBooksHandler = function(e){
//    //  $(e.currentTarget).parent("tr").remove();
//    //  $(e.currentTarget).remove();
//    var book = new Book([
//      {  title: $("#id_footTitle").val(),
//         author: $("#id_footAuthor").val(),
//         numPages: $("#id_footNumPages").val(),
//         pubDate: $("#id_footPubDate").val(),
//         cover: "",
//         action:""
//      }]);
//    e._addBook(book);
// };

Library.prototype._addBook =  function (book) {
  if (book == null) {
    console.log("No Book Argument");
    return false;
  }
  // add A book only
  for (i = 0; i < this.myBookArray.length; i++) {
    if ((this.myBookArray[i].title.toUpperCase() === book.title.toUpperCase()) &&
       (this.myBookArray[i].author.toUpperCase() === book.author.toUpperCase())) {
      return false;
    }
  }
       this.myBookArray.push(book);
       return true;
};

Library.prototype._removeBookByTitle =  function (title) {
  // remove all matched books by Title
  // case insensitive
  var status = false;
  console.log("remove the book: " + title);
  for (i = 0; i < this.myBookArray.length; i++) {
    if (this.myBookArray[i].title.toUpperCase() === title.toUpperCase()) {
      this.myBookArray.splice(i,1);
      status = true;
    }
  }
       console.log(this.myBookArray);
       // this._getLocalStorage();
       return status;
};

Library.prototype._removeBookByAuthor =  function (authorName) {
 // remove all matched books by AUthor authorNames
 // case insensitive
   var status = false;
  // var origLength = this.myBookArray.length;
  console.log("remove the authorname: " + authorName);
  for (i = 0; i < this.myBookArray.length; i++) {
    if (this.myBookArray[i].author.toUpperCase() === authorName.toUpperCase()) {
      this.myBookArray.splice(i,1);
      // return true;
        status = true;
    }
  }
    return status;
};

Library.prototype._getRandomBook = function () {
  // generate a Random number [0, length]
  // index of an array [0, lemgth-1]
  console.log(this.myBookArray.length);

      if (this.myBookArray.length == 0) {
        return null;
      }
        else if (this.myBookArray.length == 1) {
          // return true;
             console.log(this.myBookArray);
        }
            else
                 {
                   var i =  Math.floor(Math.random() * (this.myBookArray.length - 1));
                   // console.log("the random number is: " + i);
                   // console.log(this.myBookArray[i]);
                   $('#id_dataTable').dataTable().fnDestroy();
                   $('#id_dataTable').DataTable({
                   data: this.myBookArray[i],    // mapping DataTable to myBookArray
                   columns: [
                               {data: 'title'},
                               {data: 'author'},
                               {data: 'numPages'},
                               {data: 'pubDate'},
                               {data: 'cover'},
                               {data: 'action'}
                            ]
                  });
                   }
};

  Library.prototype._getBookByTitle =  function (subTitle) {
    // partially match by substring of subTitle
    // case insensitive
    // return matched array
         this.myTaskArray = ([]);

         for (i = 0; i < this.myBookArray.length; i++) {
               if (this.myBookArray[i].title.toUpperCase().indexOf(subTitle.toUpperCase()) !== -1) {
                   console.log(this.myBookArray[i]);
                   this.myTaskArray.push(this.myBookArray[i]);
                  }
              }
         console.log(this.myTaskArray);
  };

  Library.prototype._getBooksByAuthor =  function (subAuthor) {
    // partially match by substring of author names
    // case insensitive
    // return matched array
         var subLength = subAuthor.length;
         this.myTaskArray = ([]);
         for (i = 0; i < this.myBookArray.length; i++) {
                  var authorLength = this.myBookArray[i].author.length;
                  for (j = 0; j < authorLength; j++) {
                    if (this.myBookArray[i].author.toUpperCase().substr(j, subLength) == subAuthor.toUpperCase()) {
                        console.log(this.myBookArray[i]);
                        this.myTaskArray.push(this.myBookArray[i]);
                       }
                   }
           }
        console.log(this.myTaskArray);
  };

  Library.prototype._addBooks =  function (booksList) {
    //booksList is an array with multiple books
    // call addBook() for single book by FOR loop
    this.myTaskArray = ([]);
    var count = 0;
    if (booksList.length < 1) {
      console.log("error: need books!");
      return null;
    }
    else {
              for (i = 0; i < booksList.length; i++)
                {
                 this._addBook(booksList[i]);
                 this.myTaskArray.push(booksList[i]);
                  count = count + 1;
                 }
            }
          console.log(count);
          console.log(this.myTaskArray);
  };

  Library.prototype._getAuthors =  function () {
    // get authors by  complete names
    // case insensitive
    // return matched array
    // $(".auth").each(function(i,v){
    //   distinctArray.push($(v).text());
    // });
    //   alert(distinctArray.join(","));

        var distinctArray = [];
        if (this.myBookArray.length == 0) {
          return "null -- No books exist!";
        }

        for (i = 0; i < this.myBookArray.length; i++)
          {distinctArray.push(this.myBookArray[i].author);
          }
        console.log(distinctArray);
        for (i = 0; i < distinctArray.length; i++)
          {
                   for (j = i+1; j < distinctArray.length; j++)
                   { console.log(distinctArray[i]);
                     if (distinctArray[i].toUpperCase() === distinctArray[j].toUpperCase())
                     { console.log(distinctArray[j]);
                       distinctArray.splice(j,1);
                     }
                 }
          }
              console.log(distinctArray);
};

  Library.prototype._getRandomAuthorName =  function () {
    // get the entire Author Name by random
        var distinctAuthors = [];
        if (this.myBookArray.length == 0) {
          return "null -- No books exist!";
        }
        else if (this.myBookArray.length == 1) {
          console.log(this.myBookArray[0].author);
        }
          else {
             var i =  Math.floor((Math.random() * (this.myBookArray.length - 1)));
              console.log(this.myBookArray[i].author);
            }
  };

  // Bonus parts
  Library.prototype._setLocalStorage =  function () {
        try{
           localStorage.setItem("DX", JSON.stringify(this.myBookArray));
           return true;
         } catch (exception) {
           return false;
         }
  };

  Library.prototype._getLocalStorage = function() {
      // return this.myBookArray = JSON.parse(localStorage.getItem(instanceKey));
      // this.myBookArray = JSON.parse(localStorage.getItem("DX"));
      // if (this.myBookArray === null) {this._addBook(); // need change}
      // return this.myBookArray;
        try {
          var myJSON = JSON.parse(localStorage.getItem("DX"));
          console.log( myJSON );
              // myJSON.forEach(function(book) {
              // myJSON.forEach(book) {
              //this._addBook(book);
              // alert("123");
              for (var i=0; i<myJSON.length; i++) {
                 this._addBook(new Book(
                   myJSON[i].title,
                   myJSON[i].author,
                   myJSON[i].numPages,
                   myJSON[i].pubDate,
                   myJSON[i].cover,
                   // myJSON[i].action
                   "X"
                 ));
               };
            return true;  // able to get library from local storage
            }  catch (exception) {
               return false;
               }
  };

  // search options either by Title or Authors
  Library.prototype._search =  function (filterString) {
     // search the Title or Author fields to match filterString
    // no usin filter() pre-defined functions

    var myTaskArray = ([]);
    for (i = 0; i < this.myBookArray.length; i++){
        if ((this.myBookArray[i].title.toUpperCase().indexOf(filterString.toUpperCase()) !== -1) ||
            (this.myBookArray[i].author.toUpperCase().indexOf(filterString.toUpperCase()) !== -1))
            {
              //this.getBookByTitle(filterString); // all partilly matches
              myTaskArray.push(this.myBookArray[i]);
            }
    }
      console.log(myTaskArray);
  };

// book instances
// var gIt0 = new Book({title: "IT", author: "S King", numPages: 800, pubDate: "Decembher 17, 1995 03:24:00"}); // problem
// var gIt0 = new Book("IT","S King",800,"Decembher 17, 1995 03:24:00","","");
var gIt1 = new Book("IT","Stephen King",800, "Decembher 17, 1995 03:24:00","","remove");
var gCatcher2 = new Book("Catcher In the Rye","JD Salinger",600, "December 2, 2005 04:24:00","", "remove");
var gBootStrap3 = new Book("BootStrap","KristineV",400, "May 5, 2018 16:50:00","", "remove");
var gJavaScript4 = new Book("JavaScript201","Kyle Brothis",200, "April 5, 2018 16:50:00","", "remove");
var gHtmlCss5 = new Book("HTMLCSS","DavidX",100, "January 1, 2018 6:50:00","", "remove");
var gHtmlCss6 = new Book("Java201","KristineV",100, "January 1, 2018 6:50:00","", "remove");
var gBootStrap7 = new Book("Boot","Kyle Brothis",400, "May 5, 2018 16:50:00","", "remove");

// var allBooks = ([gHtmlCss5, gHtmlCss6, gBootStrap7]);
// books[gIT1, gCatcher2, gBootStrap3, gJavascript4, gHtmlCss5];
// booksTitles["IT","Catcher In the Rye", "BootStrap","Kritine", "JavaScript201", "HTMLCSS" ]
// authorNames["Stephen King","JD Salinger", "KristineV", "Kyle Brothis", "DavidX" ]

var allBooks = ([
  { title: "IT",
    author: "Stephen King",
    numPages: 800,
    pubDate: "Decembher 17, 1995 03:24:00",
    cover: "",
    action:"X"
  },

  {title: "Catcher In the Rye",
  author: "JD Salinger",
  numPages: 600,
  pubDate: "December 2, 2005 04:24:00",
  cover: "",
  action:"X"
  },

  {title: "BootStrap",
    author: "KristineV",
    numPages: 400,
    pubDate: "May 5, 2018 16:50:00",
    cover: "",
    action:"X"
  },

  {title: "JavaScript201",
  author:"Kyle Brothis",
  numPages:200,
  pubDate: "April 5, 2018 16:50:00",
  cover: "",
  action:"X"
  },

  {title: "HTMLCSS",
    author:"DavidX",
    numPages:100,
    pubDate: "January 1, 2018 6:50:00",
    cover: "",
    action:"X"
  },

  {title: "Java201",
    author:"KristineV",
    numPages:100,
    pubDate: "January 1, 2018 6:50:00",
    cover: "",
    action:"X"
  },

  {title:"Boot",
  author:"Kyle Brothis",
  numPages:400,
  pubDate: "May 5, 2018 16:50:00",
  cover: "",
  action:"X"
  }
]);
