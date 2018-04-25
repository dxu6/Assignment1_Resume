var Library =  function(){
  this.myBookArray = new Array();
  this.myTaskArray = new Array();
};

var Book = function(title, author, numPages, pubDate, image){
  this.title =  title;
  this.author = author;
  this.numPages = numPages;
  this.publishDate = new Date(pubDate);
  this.image = image;
};


// Bind listeners
Libray.prototype.init = function () {
  // #id_topSearchText
  // #id_topSearchButton
  //
  // #id_dataTable
  // #id_dataTableTitle
  // #id_dataTableAuthor
  // #id_dataTableNumPages
  // #id_dataTablePubDate
  // #id_dataTableImage
  // #id_dataTableRemove
  //
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

// this.$myDataTable = $("#id_dataTable");
this.libURL = "www.techtonicgroup.com";

this._bindEvents();
this._setLocalStorage("DX");
this._getLocalStorage("DX");
this._renderTable();
};


Libray.prototype._bindEvents = function(){
  $("#id_dataTable").on("click", ".remove", $.proxy(this._removeHandler, this)); //delegation
  $("#id_getAuthors").on("click", $.proxy(this._getAuthors, this));
  $("#id_getAuthors").on("click", $.proxy(this._getAuthors, this));
  $("#id_getAuthors").on("click", $.proxy(this._getAuthors, this));
};

library.prototype._removeHandler = function(e){
  $(e.currentTarget).parent("tr").remove();
};

library.prototype._renderTable = function(){
  for(var i=0; i < this.myBookArray.length; i++){
    this._renderRow(i, this.myBookArray[i]);
  }
};

library.prototype._renderRow = function(index, book){
  $("#id_dataTable").append("<tr data-id='"+index+"'><th scope='row'>"+index+"</th><td>"+book.title+"</td><td>"+book.auth+"</td><td>"+book.numPages+"</td><td class='remove'>Remove</td>
                          </tr>");
};


//  library.prototype.    function () {
//       this._addBook(book); //
//       this._removeBookByTitle(title);
//       this._removeBookByAuthor(authorName);
//       this._getRandomBook();
//       this._getBookByTitle(title);
//       this._getBooksByAuthor(authorName);
//       this._addBooks(books);
//       this._getAuthors();
//       this._getRandomAuthorName();
//       this._successBookAdded();
//       this._setLocalStorage();
//       this._getLocalStorage();
//       this._search();
//       this._bindEvents();
//       this._renderTable();
//       this._renderRow();
//       this._removeHandler();
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
       localStorage.setItem("DX", JSON.stringify(this.myBookArray))

       //Ajax post to add books
       $.post(this.libURI, book, $.proxy(this._successBookAdded, this), "json");

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
       return status;
};

Library.prototype._removeBookByAuthor =  function (authorName) {
 // remove all matched books by AUthor authorNames
 // case insensitive
  var origLength = this.myBookArray.length;
  console.log("remove the authorname: " + authorName);
  for (i = 0; i < this.myBookArray.length; i++) {
    if (this.myBookArray[i].author.toUpperCase() === authorName.toUpperCase()) {
      this.myBookArray.splice(i,1);
      // return true;
    }
  }
    if (this.myBookArray.length < origLength) {
            console.log(this.myBookArray);
            return true;
    }
     else { return false;
     }
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
                   console.log("the random number is: " + i);
                   console.log(this.myBookArray[i]);
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
  Library.prototype._successBookAdded =  function (Book) {
          this.myBookArray.push(Book);
          this._setLocalStorage();
  };

  Library.prototype._setLocalStorage =  function () {
          localStorage.setItem("DX", JSON.stringify(this.myBookArray));
  };

  Library.prototype._getLocalStorage = function() {
      // return this.myBookArray = JSON.parse(localStorage.getItem(instanceKey));
      this.myBookArray = JSON.parse(localStorage.getItem("DX"));
      if (this.myBookArray === null) {this.addBook();}
      return this.myBookArray;
  };

  // search options either by Title or Authors
  Library.prototype._search =  function (filterString) {
     // search the Title or Author fields to match filterString
    // no usin filter() pre-defined functions

    var searchArray = ([]);
    for (i = 0; i < this.myBookArray.length; i++){
        if ((this.myBookArray[i].title.toUpperCase().indexOf(filterString.toUpperCase()) !== -1) ||
            (this.myBookArray[i].author.toUpperCase().indexOf(filterString.toUpperCase()) !== -1))
            {
              //this.getBookByTitle(filterString); // all partilly matches
              searchArray.push(this.myBookArray[i]);
            }
    }
      console.log(searchArray);
  };


  Library.prototype._origLibray = function(){
        var origLibraryData = [];
        for (var i = 0; i < this.myBookArray.length; i++){
          origLibarayData = "<tr>" +
                            "<td>" +this.myBookArray[i].title + "</td>" +
                            "<td>" +this.myBookArray[i].author + "</td>" +
                            "<td>" +this.myBookArray[i].numPages + "</td>" +
                            "<td>" +this.myBookArray[i].pubDate + "</td>" +
                            "<td>" +this.myBookArray[i].image + "</td>" +
                            // "<td>" +this.myBookArray[i].update + "</td>" +
                            "</tr>";
        $("#id_dataTable").append(origLibraryData);
      };
};

Library.prototype._showLibrary = function(){
        var origLibraryData = [];
        for (var i = 0; i < this.myBookArray.length; i++){
          origLibarayData = this.myBookArray[i].title + " " +
                            this.myBookArray[i].author + " " +
                            this.myBookArray[i].numPages + " " +
                            this.myBookArray[i].pubDate + " " +
                            this.myBookArray[i].image;
                            // this.myBookArray[i].image + " " +
                            // this.myBookArray[i].update;
          $("#id_dataTable tr").append("<td>origLibraryData</td>");
        };
};

Library.prototype._sortLibrary = function(){
        switch ("#id_dataTable th") {

                case ("#id_dataTableTitle"):
                    $('#id_dataTable').DataTable( {
                      "order": [[0, "desc" ]]
                  });
                break;

                case ("#id_dataTableAuthor"):
                      $('#id_dataTable').DataTable( {
                        "order": [[1, "desc" ]]
                    });
                break;

                case ("#id_dataTableNumPages"):
                        $('#id_dataTable').DataTable( {
                          "order": [[2, "desc" ]]
                      });
                break;

                case ("#id_dataTablePubDate"):
                          $('#id_dataTable').DataTable( {
                            "order": [[2, "desc" ]]
                        });
                break;

                default:
                        $('#id_dataTable').DataTable( {
                                  "order": [[0, "asc" ], [1, "asc" ], [2, "asc" ], [3, "asc" ]]
                          // "order": [[0, "asc" ], [1, "asc" ], [2, "asc" ], [3, "asc" ], [4, "asc" ]]
                      });
      }
};

/////////////////////////////////////////////////////////////////////////
    $("#id_topSearchButton").on("click", function()
            { // var passingval= $("textarea").val(); alert(passingval);
                  //addABook
                  var searchVal = $("#id_topSearchText").val();
                  if (searchVal !== null) {
                      Library.prototype.search(searchVal);
                 }
                      Library.prototype.showLibrary();
            }

    );

    $("#id_topSearchButton").on("click", function()
            { // var passingval= $("textarea").val(); alert(passingval);

            }

    );
/////////////////////////////////////////////////////////////////////////




//Lib instance
    $(document).ready(function(){
        window.gLib = new Library();
        var gLib = window.gLib;


        gLib.init();
        // var instanceKey = "dx";
        // gLib.addBooks(allBooks);
        // gLib.addBook(gIt1);

        $('#id_dataTable').DataTable({
          data: gLib.myBookArray,
          columns: [
                      {data: 'title'},
                      {data: 'author'},
                      {data: 'numPages'},
                      {data: 'pubDate'},
                      {data: 'image'}
                   ]
        });
});

// book instances
// var gIt0 = new Book({title: "IT", author: "S King", numPages: 800, pubDate: "Decembher 17, 1995 03:24:00"}); // problem
var gIt0 = new Book("IT","S King",800,"Decembher 17, 1995 03:24:00");
var gIt1 = new Book("IT","Stephen King",800, "Decembher 17, 1995 03:24:00");
var gCatcher2 = new Book("Catcher In the Rye","JD Salinger",600, "December 2, 2005 04:24:00");
var gBootStrap3 = new Book("BootStrap","KristineV",400, "May 5, 2018 16:50:00");
var gJavaScript4 = new Book("JavaScript201","Kyle Brothis",200, "April 5, 2018 16:50:00");
var gHtmlCss5 = new Book("HTMLCSS","DavidX",100, "January 1, 2018 6:50:00");
var gHtmlCss6 = new Book("Java201","KristineV",100, "January 1, 2018 6:50:00");
var gBootStrap7 = new Book("Boot","Kyle Brothis",400, "May 5, 2018 16:50:00");

// var allBooks = ([gHtmlCss5, gHtmlCss6, gBootStrap7]);
// books[gIT1, gCatcher2, gBootStrap3, gJavascript4, gHtmlCss5];
// booksTitles["IT","Catcher In the Rye", "BootStrap","Kritine", "JavaScript201", "HTMLCSS" ]
// authorNames["Stephen King","JD Salinger", "KristineV", "Kyle Brothis", "DavidX" ]

var allBooks = ([
  {title: "IT",
     author: "S King",
     numPages: 800,
     pubDate: "Decembher 17, 1995 03:24:00"
  },

  {title: "IT",
    author: "Stephen King",
    numPages: 800,
    pubDate: "Decembher 17, 1995 03:24:00"
  },

  {title: "Catcher In the Rye",
  author: "JD Salinger",
  numPages: 600,
  pubDate: "December 2, 2005 04:24:00"
  },

  {title: "BootStrap",
    author: "KristineV",
    numPages: 400,
    pubDate: "May 5, 2018 16:50:00"
  },

  {title: "JavaScript201",
  author:"Kyle Brothis",
  numPages:200,
  pubDate: "April 5, 2018 16:50:00"
  },

  {title: "HTMLCSS",
    author:"DavidX",
    numPages:100,
    pubDate: "January 1, 2018 6:50:00"
  },

  {title: "Java201",
    author:"KristineV",
    numPages:100,
    pubDate: "January 1, 2018 6:50:00"
  },

  {title:"Boot",
  author:"Kyle Brothis",
  numPages:400,
  pubDate: "May 5, 2018 16:50:00"
  }
]);
