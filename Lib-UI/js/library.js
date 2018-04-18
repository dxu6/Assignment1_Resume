var Library =  function(){
  this.myBookArray = new Array();
  this.myTaskArray = new Array();
};

var Book = function(title, author, numPages, pubDate){
  this.title =  title;
  this.author = author;
  this.numPages = numPages;
  this.publishDate = new Date(pubDate);
};

Library.prototype.addBook =  function (book) {
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

Library.prototype.removeBookByTitle =  function (title) {
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

Library.prototype.removeBookByAuthor =  function (authorName) {
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

Library.prototype.getRandomBook = function () {
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

  Library.prototype.getBookByTitle =  function (subTitle) {
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

  Library.prototype.getBooksByAuthor =  function (subAuthor) {
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

  Library.prototype.addBooks =  function (booksList) {
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
                 this.addBook(booksList[i]);
                 this.myTaskArray.push(booksList[i]);
                  count = count + 1;
                 }
            }
          console.log(count);
          console.log(this.myTaskArray);
  };

  Library.prototype.getAuthors =  function () {
    // get authors by  complete names
    // case insensitive
    // return matched array

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

  Library.prototype.getRandomAuthorName =  function () {
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
  Library.prototype.setLocalStorage =  function (instanceKey) {
          localStorage.setItem(instanceKey, JSON.stringify(this.myBookArray));
  };

  Library.prototype.getLocalStorage = function(instanceKey) {
      // return this.myBookArray = JSON.parse(localStorage.getItem(instanceKey));
      this.myBookArray = JSON.parse(localStorage.getItem(instanceKey));
      if (this.myBookArray === null) {this.addBook();}
      return this.myBookArray;
  };

  // search options either by Title or Authors
  Library.prototype.search =  function (filterString) {
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

//    library.prototype.init = function () {
//         this.addBook(book); //
//         this.removeBookByTitle(title);
//         this.removeBookByAuthor(authorName);
//         this.getRandomBook();
//         this.getBookByTitle(title);
//         this.getBooksByAuthor(authorName);
//         this.addBooks(books);
//         this.getAuthors();
//         this.getRandomAuthorName();
//         this.setLocalStorage();
//         this.getLocalStorage();
//         this.search();
//   };
//

//Lib instance
var gLib = new Library();
// window.gLib.init();


// book instances
// toUpperCase()
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
