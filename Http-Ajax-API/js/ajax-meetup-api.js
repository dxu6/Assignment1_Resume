
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
                        { data: "lat" },
                        { data: "lon" },
                        { data: "member_count"}
                     ]
          });
        }

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
                        { data: "lat" },
                        { data: "lon" },
                        { data: "member_count"}
                      ]
                    });
                } catch(e) {
                            alert("error");
                           }
        }

      _topSearchHandler(){
        this._getCity();
        // _getLatLon();
      }

      _getCity(){
                 var self = this;
                // const oArgs={zip:"80302",country: "US" ,city: "Boulder",state: "CO", ranking: , count:  };
                $.ajax({
                   url:"https://api.meetup.com/2/cities",
                  // url: "https://maps.googleapis.com/maps/api/geocode/json",
                   //url:"js/dir.js",

                    dataType: 'jsonp',
                    type:"GET",

                    // data: oArgs
                    data: {
                       country: $("#country").val(),
                      //country: self.country.val(),
                       state: $("#state").val(),
                      //state: self.state.val(),

                      //page: self.result.val()
                      page: $("#result").val(),
                      // latlng: '41.6149395,-88.1372692',
                      key: "7c4229a48321567839343716565844"
                    }
                  }).done(function(response){
                      // when success, inject to RespArray, display dataTable
                      // console.log('success', response.results[1].formatted_address);
                      // this._getRespArray();
                      // response.results;
                      self.myRespArray = response.results;
                      // debugger
                      self._tableDisplay();
                  }).fail(function(){
                      // when failure
                    alert("fail!");
                  })
                }
          
          // _getLatLon(){
          //   $.ajax({
          //       url: "https://maps.googleapis.com/maps/api/geocode/json",
          //       // method: "get",
          //       type: "GET",
          //       dataType: 'json',
          //       data: {
          //        latlng: '41.6149395,-88.1372692'
          //      }
          //   }).done(function(response){
          //           console.log('success: ', response.results[1].formatted_address);
          //   }).fail(function(e){
          //       console.log('error: ', e)
          //   })
          // }
}

  $(document).ready(function(){
 //$(function(){
       let gMeetUpAjaxAPI = new MeetUpAjaxAPI();
       gMeetUpAjaxAPI.init();
})
