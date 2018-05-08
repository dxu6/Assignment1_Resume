
var instance;

class MeetUpAjaxAPI {
        constructor(){
          // this.singletonName = singletonName;
          if(instance){return instance;}
            instance = this;
            this.myRespArray = [];
            var country = $("#country");
            var state= $("#state");
            var result = $("#result");
          }

        init(){
          // this._getLocalStorage();
          this._bindEvents();

          $("#id_dataTable").DataTable({
            data: this.myRespArray, // mapping DataTable to myBookArray
            columns: [
                        { data: "zip" },
                        { data: "country" },
                        { data: "city" },
                        { data: "ranking" },
                        { data: "state" },
                        { data: "member_count" }
                     ]
          });}

        _bindEvents(){
          $("#id_topSearch").on("click",$.proxy(this._topSearchHandler, this)); //delegation
        }

        _tableDisplay(e) {
              try{
                     $("#id_dataTable")
                      .dataTable()
                      .fnDestroy();
                    $("#id_dataTable").DataTable({
                      data: this.myRespArray, // mapping DataTable to myBookArray
                      columns: [
                        { data: "zip" },
                        { data: "country" },
                        { data: "city" },
                        { data: "ranking" },
                        { data: "state" },
                        { data: "member_count"}
                      ]
                    });
                } catch(e) {
                            alert("error");
                           }
        }

      _topSearchHandler() {
                     var self = this;
                    // const oArgs={zip:"80302",country: "US" ,city: "Boulder",state: "CO", ranking: , count:  };
                    $.ajax({
                        dataType: 'jsonp',
                        type:"GET",
                        url:"https://api.meetup.com/2/cities",
                         //url:"js/dir.js",

                        // data: oArgs
                        data: {
                           country: $("#country").val(),
                          //country: self.country.val(),
                           state: $("#state").val(),
                          //state: self.state.val(),

                          //page: self.result.val()
                          page: $("#result").val(),
                          key: "7c4229a48321567839343716565844"
                        }
                      }).done(function(response){
                          // when success, inject to RespArray, display dataTable
                          // this._getRespArray();
                          // for (var i = 0; i < array.length; i++) {
                          //   array[i]
                          // }
                          // response.results;
                          self.myRespArray = response.results;
                          // debugger
                          self._tableDisplay();
                      }).fail(function(){
                          // when failure
                        alert("fail!");
                      })
                }
}

  $(document).ready(function(){
 //$(function(){
       let gMeetUpAjaxAPI = new MeetUpAjaxAPI();
       gMeetUpAjaxAPI.init();
      // this.myRespArray = gMeetUpAjaxAPI.myRespArray;
      // debugger
      // this._tableDisplay();
});
