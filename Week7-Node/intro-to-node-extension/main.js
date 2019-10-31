const fetchCartoon = $.ajax({
    type: "GET",
    url: "https://cors-anywhere.herokuapp.com/http://localhost:5000/",
    dataType: "jsonp",
    headers: {
            'Access-Control-Allow-Origin': '*',
          },
    success: function(data) {
      console.log(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });

  $('#cartoonBtn').on('click', fetchCartoon)