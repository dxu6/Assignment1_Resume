function init(){
  this._bindEvents();
}

function _bindEvents(){
  $("#compare").on("click",$.proxy(this._quesionHandler, this)); //delegation
}


function quesionHandler(){
                 var str1= $("#strName").val();
                 var str2 = str1;
                 res = false;
                 for(var i = 0; i < str1.length; i++) {
                         for(var j = i+1; j < str2.length; j++) {
                             if(Number(str1[i])+Number(str2[j]) === 10) {
                               if(str1.slice(i+1,j).split('?').length - 1 === 3) {
                                   res = true;
                                   break;
                               } else {
                                   alert("false");
                                   return false;
                               }
                             }
                     }
   }

   // alert("true");
   return res;
 }

 $(document).ready(function(){
      console.time("test");
      this.init();
      console.timeEnd("test");
      console.timeEnd("test") - console.time("test");
})
