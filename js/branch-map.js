// 와와학원 지점 페이지: 카카오 지도 표시
// 지점 페이지의 <div class="branch-map" data-address="도로명 주소" data-name="지점명"> 에 지도를 그립니다.
(function () {
  var KAKAO_JS_KEY = "820bad12b2beeb458356e61a4b3c2057";
  var box = document.querySelector(".branch-map");
  if (!box) return;

  function fail() { box.hidden = true; }

  var s = document.createElement("script");
  s.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=" + KAKAO_JS_KEY + "&libraries=services&autoload=false";
  s.onerror = fail;
  s.onload = function () {
    if (!window.kakao || !kakao.maps) return fail();
    kakao.maps.load(function () {
      var address = box.dataset.address;
      var name = box.dataset.name || "와와학원";
      new kakao.maps.services.Geocoder().addressSearch(address, function (result, status) {
        if (status !== kakao.maps.services.Status.OK || !result.length) return fail();
        var pos = new kakao.maps.LatLng(result[0].y, result[0].x);
        var map = new kakao.maps.Map(box, { center: pos, level: 3 });
        map.setZoomable(false); // 스크롤하다 지도가 확대·축소되지 않게
        map.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);
        new kakao.maps.Marker({ map: map, position: pos });
        var label = document.createElement("div");
        label.className = "branch-map-label";
        label.textContent = name;
        new kakao.maps.CustomOverlay({ map: map, position: pos, content: label, yAnchor: 2.6 });
        window.addEventListener("resize", function () { map.relayout(); map.setCenter(pos); });
      });
    });
  };
  document.head.appendChild(s);
})();
