var host = location.origin.replace(/^http/, 'ws');
var ws = new WebSocket(host);

ws.onopen = function (event) {
  $('img').on('click', sendState);
};

var obj;

//gets state of switches from server
ws.onmessage = function (event) {
  obj = JSON.parse(event.data);
  $('#userCount').html(obj.users);
  var spinner = document.getElementById("spinner");
  spinner.style.display = "none";

  if (obj.temp) {
    $('#temp').html(obj.temp + "&#8451;");
    if (obj.fan) {
      $('#fan').html("Fan is On");
      spinner.style.display = "block";
    }
    else {
      $('#fan').html("Fan is Off");
    }
  }
  else {
    $('#fan').html("Device not Connected");
  }
  if (obj.humidity) {
    $('#humidity').html("Humidity : " + obj.humidity + "%");
  }
  else {
    $('#humidity').html("");
    $('#temp').html("");
  }
}
