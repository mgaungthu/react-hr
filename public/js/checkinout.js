$('#checkin_image').on('change', function () {

    // console.log($("#checkin_image").val());
    if ($("#checkin_image").val()) {
        $("#g_form").submit();
    }

});


var myMap;
var geocoder = new google.maps.Geocoder();
var infowindow = new google.maps.InfoWindow();
var marker;
var addr_comps = new Array();

initialize();
  


function initialize() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lgn = position.coords.longitude;
            // $("#latitude").val(lat);
            // $("#longitude").val(lgn);
            // alert(lat+','+lgn)
            mapServiceProvider(lat, lgn);
        }, errorHandler);
    } else {
        console.log('html 5 not support');
    }
} //end initialize

function errorHandler(error) {
    switch (error.code) {
        case error.TIMEOUT:
            console.log('TIMEOUT');
            break;
        case error.POSITION_UNAVAILABLE:
            console.log('POSITION_UNAVAILABLE');
            break;
        case error.PERMISSION_DENIED: //拒絕
        console.log('PERMISSION_DENIED');
            break;
        case error.UNKNOWN_ERROR:
            console.log('UNKNOWN_ERROR');
            break;
    }
} //end errorHandler

//reverse geocoding
function codeLatLng(latlng) {
    // reportLocation.reset();
    geocoder.geocode({
        'latLng': latlng
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                addr_comps = results[0].address_components;
                var content = "<div id='content' class='report-address-info-window'>" + results[0].formatted_address + "</div>"
                infowindow.setContent(content);
                infowindow.open(myMap, marker);
                //  $('input#location').val(results[0].formatted_address);

            } else {
                console.log("codeLatLng fail, no result found");
                //  notify("dwa", "error");
            }
        } else {
            console.log("codeLatLng failed due to: " + status);
            //    notify("wdawd", "error");
        }
    });
} //end codeLatLng

function mapServiceProvider(lat, lng) {

    var latlng = new google.maps.LatLng(lat, lng);
    // Create the map.
    const map = new google.maps.Map(document.getElementById("location-map"), {
        zoom: 18,
        center: latlng,
        mapTypeControl: false,
        disableDefaultUI: true,
        mapTypeId: "terrain",
    });

    var officeloc = new google.maps.LatLng(16.8160371,96.1292259);

    // console.log(google.maps.geometry.spherical.computeDistanceBetween(latlng, officeloc));
    if(google.maps.geometry.spherical.computeDistanceBetween(latlng, officeloc) > 100) {
        $(".check-btn").addClass("disabled");
    }

    // Add the circle for this city to the map.
    cityCircle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: { lat: 16.8160371, lng: 96.1292259 },
        radius: 100,
    });


    marker = new google.maps.Marker({
        position: latlng,
        map: map,
        icon:"frontend/images/focus.png",
        draggable: false,
    });


    map.setZoom(16.5);
    map.setCenter(marker.getPosition());
    codeLatLng(latlng);

    google.maps.event.addListener(marker, 'dragend', function () {
        var point = marker.getPosition();
        map.panTo(point);
        codeLatLng(point);
    });

}

// var span = document.getElementById('clock');

// function time() {
//     var d = new Date();
//     var s = d.getSeconds();
//     var m = d.getMinutes();
//     var h = d.getHours();
//     var h = h > 12 ? h - 12 : h;
//     var ampm = d.getHours() >= 12 ? ' PM' : ' AM';
//     span.textContent =
//         ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2) + ampm;
// }

// setInterval(time, 1000);

// function distance(lat1, lon1, lat2, lon2, unit) {
// 	if ((lat1 == lat2) && (lon1 == lon2)) {
// 		return 0;
// 	}
// 	else {
// 		var radlat1 = Math.PI * lat1/180;
// 		var radlat2 = Math.PI * lat2/180;
// 		var theta = lon1-lon2;
// 		var radtheta = Math.PI * theta/180;
// 		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
// 		if (dist > 1) {
// 			dist = 1;
// 		}
// 		dist = Math.acos(dist);
// 		dist = dist * 180/Math.PI;
// 		dist = dist * 60 * 1.1515;
// 		if (unit=="K") { dist = dist * 1.609344 }
// 		if (unit=="N") { dist = dist * 0.8684 }
// 		return dist;
// 	}
// }


// console.log(distance(16.81656979918036,96.12865803970058,16.8160371,96.1292259 ,"K"));

// var latlng1 = new google.maps.LatLng(16.81656979918036,96.12865803970058);
// var latlng2 = new google.maps.LatLng(16.8160371,96.1292259);

// console.log(google.maps.geometry.spherical.computeDistanceBetween(latlng1, latlng2));

