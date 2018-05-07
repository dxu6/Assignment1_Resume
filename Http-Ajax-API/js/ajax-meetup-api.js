
var instance;

class MeetUpAPI {
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

        _tableDisplay() {
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
        }

      _topSearchHandler() {
                    // const oArgs={zip:"80302",country: "US" ,city: "Boulder",state: "CO", ranking: , count:  };
                    $.ajax({
                        dataType: 'jsonp',
                        type:"GET",
                        url:"https://api.meetup.com/2/cities",
                        // data: oArgs
                        data: {
                          // zip: zip,
                          country: this.country.val(),
                          // city: city,
                          // ranking: ranking,
                          state: this.state.val(),
                          // count: count,
                          result: this.result.val()
                        }
                      }).done(function(response){
                          // when success, inject to RespArray, display dataTable
                          debugger
                          // this._getRespArray();
                          // for (var i = 0; i < array.length; i++) {
                          //   array[i]
                          // }
                          // response.results;
                          this.myRespArray = response.results;
                          this._tableDisplay();
                      }).fail(function(){
                          // when failure
                        alert("fail!");
                      })
                }

          // _getRespArray() {
          //         try {
          //           var myJSON = JSON.parse(localStorage.getItem("DX"));
          //           // console.log(myJSON);
          //           // myJSON.forEach(function(book) {
          //           // myJSON.forEach(book) {
          //
          //           for (var i = 0; i < myJSON.length; i++) {
          //             this._addBook(
          //               new MeetUpAjaxAPI(
          //                 myJSON[i].zip,
          //                 myJSON[i].country,
          //                 myJSON[i].city,
          //                 myJSON[i].ranking,
          //                 myJSON[i].state,
          //                 myJSON[i].count
          //               )
          //             );
          //           }
          //           return true; // able to get library from local storage
          //         } catch (exception) {
          //           return false;
          //         }
          // }

  $(document).on(ready, function(){
// $(function(){
       let gMeetUpAjaxAPI = new MeetUpAjaxAPI();
       gMeetUpAjaxAPI.init();
});
