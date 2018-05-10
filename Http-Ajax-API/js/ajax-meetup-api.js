
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
                        { data: "member_count"},
                        { data: "lat" },
                        { data: "lon" },
                        { data: "id" }
                     ]
          });
        }

        _bindEvents(){
          $("#id_topSearch").on("click",$.proxy(this._topSearchHandler, this)); //delegation
          // $("#id_dataTableID").on("click",$.proxy(this._cityMapHandler, this));
          // $("#id_dataTableID").addEventListener("mouseover", event => {
          //      console.log("Mouse over");
          //});
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
                        { data: "member_count"},
                        { data: "lat" },
                        { data: "lon" },
                        { data: "id" }
                      ]
                    });
                } catch(e) {
                            alert("error");
                           }
        }

      _topSearchHandler(){
        this._getCityData();
      }
      // _CityMapHandler(){
      //   this._getCityMap();
      // }

      _getCityData(){
                 var self = this;
                // const oArgs={zip:"80302",country: "US" ,city: "Boulder",state: "CO", ranking: , count:  };
                $.ajax({
                    url:"https://api.meetup.com/2/cities",
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
                       self.myRespArray = response.results;
                      // debugger
                      self._tableDisplay();
                  }).fail(function(){
                      // when failure
                    alert("fail!");
                  })
                }

      //     _getCityMap(){
      //     // id="map" MAP-API
      //     var map;
      //     function initMap() {
      //       map = new google.maps.Map(document.getElementById('map'), {
      //         // City of Boulder, CO
      //         // Goole Map API -- lat + lng
      //         // Meetup API -- lat + lon
      //         // center: {lat: 40.04999923706055, lng:-105.20999908447266},
      //         // center: {lat: this.myRespArray.lat, lng: this.myRespArray.lon},
      //         // center: {lat: this.myRespArray.lat, lng: this.myRespArray.lon},
      //         for (var i = 0; i < this.myRespArray.length; i++) {
      //           // self.myRespArray[i] = "RowID:" + i + ", "+ response.results;
      //           center: {lat: this.myRespArray[i].lat, lng: this.myRespArray[i].lon},
      //         }
      //         zoom: 8
      //       });
      //     }
      // }
   }

  $(document).ready(function(){
 //$(function(){
       let gMeetUpAjaxAPI = new MeetUpAjaxAPI();
       gMeetUpAjaxAPI.init();
})
