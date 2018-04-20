
// // construct
// var questionA = function(){};
//
// //initializer
// questionA.prototype.init = function () {
//     this._setUpListeners();
// };
//
// //
// questionA.prototype._setUpListeners() =  function () {
//
// };
// //create object
// window.gQuestionA = new questionA();
// //initialize
// window.gQuestionA.init();


// construct
// var questionA = function(){};
//
//  //initializer
// questionA.prototype.init = function () {
//  this._sendBtn = document.querySelector(".send");
//
// for (var i = 1; i <=2; i++) {
//   // array[i];
//   this._answerBox[i]= document.querySelector(".question-[i]");
//   this._showAnswer[i] = document.querySelector(".answer-[i]");
// };
//
//  // this._answerBox[i]= document.querySelectorAll(".question-1")
//  // this._showAnswer[i] = document.querySelectorAll(".answer-2");
//  // this._answerBox1 = document.querySelector(".question-1")
//  // this._showAnswer1 = document.querySelector(".answer-1");
//  // this._answerBox2 = document.querySelector(".question-2")
//  // this._showAnswer2 = document.querySelector(".answer-2");
//  // console.log(this._sendBtn);
//  this._setupListners();
//
// };
//
//
// // bind events
// questionA.prototype._setupListners = function () {
//  var _self = this;
//   this._sendBtn.addEventListener("click", function(e){
//    // console.log(_self._answerBox.value);
//    // var yourAnswer1 = _self._answerBox1.value;
//    // _self._showAnswer1.innerText = yourAnswer1;
//    // var yourAnswer2 = _self._answerBox2.value;
//    // _self._showAnswer2.innerText = yourAnswer2;
//    // console.log(e);
//
//    var yourAnswer1 = _self._answerBox1.value;
//       if (yourAnswer1 === NULL || yourAnswer1=="") {
//           yourAnswer1 = "question box1 is blank";
//    }
//     _self._showAnswer1.innerText = yourAnswer1;
//
//     var yourAnswer2 = _self._answerBox2.value;
//        if (_self._answerBox2.value === NULL || yourAnswer1=="") {
//       yourAnswer2 = "question box2 is blank";
//     }
//      _self._showAnswer2.innerText = yourAnswer2;
//
//    console.log(e);
//
//  });
// };
//
//
// //instance
// window.gQuestionA = new questionA();
// //initialize wat I need for this instance
// window.gQuestionA.init();



//Construct
var questionAnswer = function(name){
  this.myVar = "this is a property";
  this.myName = name;
};
//initalizer
questionAnswer.prototype.init = function () {
  this._sendBtn = document.querySelector(".send");
  this._answerBox = document.querySelectorAll(".question");
  this._showAnswer = document.querySelectorAll(".answer");
  this._setUpListeners();
};
//Bind listeners
questionAnswer.prototype._setUpListeners = function () {
  var _self = this;
  this._sendBtn.addEventListener("click", function(e){
    for(i=0; i < _self._answerBox.length; i++){
      var myAnswer = _self._answerBox[i].value;
      _self._showAnswer[i].innerText = myAnswer ? myAnswer : "--";
    }
  });
};
//Instance
window.gQuestionOne = new questionAnswer("Kyle");
//Initialize what I need for this instance
window.gQuestionOne.init();
