
import React, { useEffect, useRef, ReactElement } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

 


const  MapContainer = (props) => {

  let marker;
  let addr_comps = new Array();
  
      function codeLatLng(latlng, map) {
      
        const geocoder = new google.maps.Geocoder();
        const infowindow = new google.maps.InfoWindow();
        // reportLocation.reset();
        geocoder.geocode({
          'latLng': latlng
        }, function (results, status) {
      
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
      
              addr_comps = results[0].address_components;
              // console.log(results[0].formatted_address);
              var content = "<div id='content' class='report-address-info-window'>" + results[0].formatted_address + "</div>"
              infowindow.setContent(content);
              infowindow.open(map, marker);
              //  $('input#location').val(results[0].formatted_address);
      
            } else {
              console.log("codeLatLng fail, no result found");
      
            }
          } else {
            console.log("codeLatLng failed due to: " + status);
          }
        });
      }


      
      function MyMapComponent({
        center,
        zoom,
      }: {
        center: google.maps.LatLngLiteral;
        zoom: number;
      }) {
        const ref = useRef();

        useEffect(() => {
          
          let officeloc = new google.maps.LatLng(16.8160371, 96.1292259);
          // console.log(center);
          const map = new window.google.maps.Map(ref.current, {
            center: center,
            zoom,
            disableDefaultUI: true,
          });

          new google.maps.Circle({
            strokeColor: "#FF0000",
            strokeOpacity: 0,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            map,
            center: officeloc,
            radius: 100,
          });

          marker = new google.maps.Marker({
            position: center,
            map: map,
            icon:"images/focus.png",
            draggable: false,
          });

        //   if(google.maps.geometry.spherical.computeDistanceBetween(center, officeloc) > 100) {
        //     // $(".check-btn").addClass("disabled");
        // }


          // map.setCenter(marker.getPosition());
          // console.log(center.lat);
          if(center.lat) {
            codeLatLng(center, map);
          }

        });

        return <div style={{ height: "300px", width: "100%" }} ref={ref} id="map" />;
      }

      const render = (status: Status): ReactElement => {
        if (status === Status.LOADING) return <p>{status} ..</p>;
        if (status === Status.FAILURE) return <p>{status} ...</p>;
        return null;
      };


  const center = { lat:  props.Lat , lng: props.Lng };
  const zoom = 17.2;

    return (
      <>

      <Wrapper style={{height:"300px",background:"#ccc"}} apiKey="AIzaSyAuHrmGf12qmQuByAxEXCHtG1HBdPEHtag" render={render}>
        <MyMapComponent center={center} zoom={zoom} />
      </Wrapper>
      </>
    );
}

export default MapContainer;