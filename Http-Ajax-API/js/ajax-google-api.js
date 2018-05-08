// $(document).ready(function($){

//     $('a').on('click', function(e){
//     console.log('I am clicked');
//   })
//  });


$(document).ready(function($){

    $('a').on('click', function(e){
    console.log('I am clicked');
    getCity();
  })

  function getCity(){
//      $.ajax({
//      url: "https://maps.googleapis.com/maps/api/geocode/json",
//      method: "get",
//      dataType: 'json',
//      data: {
//       latlng: '41.6149395,-88.1372692'
//     },

//      success: function(r){
//         console.log('success', r.results[1].formatted_address);
//     },

//      error: function(e){
//         console.log('error', e);
//     }
//   })
$.ajax({
    url: "https://maps.googleapis.com/maps/api/geocode/json",
    // method: "get",
    type: "get",
    dataType: 'json',
    data: {
     latlng: '41.6149395,-88.1372692'
   }
//     success: function(r){
//        console.log('success', r.results[1].formatted_address);
//    }
//     error: function(e){
//        console.log('error', e);
//    }

}).done(function(response){
        console.log('success', response.results[1].formatted_address);
}).fail(function(e){
    console.log('error',e)
})

}
});
