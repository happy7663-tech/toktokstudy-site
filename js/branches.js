/* ============================================================
   와와학원 지점 목록 (js/branches.js)

   지점 페이지(branch/○○○.html)를 하나 만들 때마다
   아래 BRANCHES 목록 안에 한 덩어리씩 추가하세요.
   시/구/동 드롭다운은 이 목록을 보고 자동으로 만들어집니다.

   ▼ 복사해서 쓸 양식 (맨 앞의 // 는 지우고 쓰세요)
   // { si: "서울특별시", gu: "영등포구", dong: "당산동",
   //   name: "당산점", address: "서울 영등포구 ○○로 123, 3층",
   //   file: "dangsan" },

   - si / gu / dong : 시·구·동 이름 (같은 지역은 글자를 똑같이!)
   - name           : 지점 이름
   - address        : 주소 (목록에 보이는 용도)
   - file           : 지점 페이지 파일 이름 (.html 빼고)
   - 각 덩어리 끝의 쉼표(,)를 빠뜨리지 마세요
============================================================ */

const BRANCHES = [

  // ===== 부산광역시 =====
  { si: "부산광역시", gu: "북구", dong: "화명동", name: "화명점", address: "부산 북구 금곡대로285번길 19 리버사이드빌딩 504호", file: "hwamyeong" },
  { si: "부산광역시", gu: "동래구", dong: "사직동", name: "사직점", address: "부산 동래구 사직로 80 222동 311호 (사직쌍용예가아파트 상가)", file: "sajik" },
  { si: "부산광역시", gu: "동래구", dong: "온천동", name: "동래점", address: "부산 동래구 충렬대로 129-1 한아빌딩 3층", file: "dongnae" },
  { si: "부산광역시", gu: "해운대구", dong: "반여동", name: "반여점", address: "부산 해운대구 반여로 102 경성빌딩 501호", file: "banyeo" },
  { si: "부산광역시", gu: "해운대구", dong: "좌동", name: "좌동점", address: "부산 해운대구 좌동로 88 울트라타워 5층 508호", file: "jwadong" },

  // ===== 대구광역시 =====
  { si: "대구광역시", gu: "달서구", dong: "월성동", name: "신월성점", address: "대구 달서구 월성동 1848 그루타워 702호", file: "daegu-sinwolseong" },
  { si: "대구광역시", gu: "달서구", dong: "유천동", name: "진천점", address: "대구 달서구 조암남로 158 그랑에비뉴 301호", file: "daegu-jincheon" },
  { si: "대구광역시", gu: "달서구", dong: "이곡동", name: "이곡점", address: "대구 달서구 달구벌대로259길 33 제일빌딩 5층", file: "daegu-igok" },
  { si: "대구광역시", gu: "달서구", dong: "장기동", name: "대구장기점", address: "대구 달서구 장기로 252 장기협성휴포레 상가 2층 209·210호", file: "daegu-janggi" },
  { si: "대구광역시", gu: "동구", dong: "봉무동", name: "이시아폴리스점", address: "대구 동구 팔공로51길 33 A-503호", file: "daegu-isiapolis" },
  { si: "대구광역시", gu: "동구", dong: "율하동", name: "율하점", address: "대구 동구 율하동로 32 대은빌딩 4층", file: "daegu-yulha" },
  { si: "대구광역시", gu: "북구", dong: "구암동", name: "칠곡점", address: "대구 북구 구암로 149 6층", file: "daegu-chilgok" },
  { si: "대구광역시", gu: "북구", dong: "도남동", name: "대구도남점", address: "대구 북구 도남중앙로7길 20-3 위너프라자 402호", file: "daegu-donam" },
  { si: "대구광역시", gu: "북구", dong: "복현동", name: "복현점", address: "대구 북구 동북로 247 e편한세상복현 상가동 305호", file: "daegu-bokhyeon" },
  { si: "대구광역시", gu: "북구", dong: "침산동", name: "침산점", address: "대구 북구 침산남로 140 엠비프라자 901호", file: "daegu-chimsan" },
  { si: "대구광역시", gu: "수성구", dong: "대흥동", name: "알파시티점", address: "대구 수성구 알파시티2로 19 알파N시티 2층 201호", file: "daegu-alphacity" },
  { si: "대구광역시", gu: "수성구", dong: "만촌동", name: "수성만촌점", address: "대구 수성구 화랑로8길 11-11 7층", file: "daegu-suseong-manchon" },
  { si: "대구광역시", gu: "수성구", dong: "수성동2가", name: "수성2가점", address: "대구 수성구 명덕로 404 1동 404호", file: "daegu-suseong2ga" },
  { si: "대구광역시", gu: "중구", dong: "대봉동", name: "반월당점", address: "대구 중구 대봉로 253 3층", file: "daegu-banwoldang" },
  { si: "대구광역시", gu: "중구", dong: "수창동", name: "대구역점", address: "대구 중구 서성로 99 대구역센트럴자이 상가 302호(1관) · 203호(2관)", file: "daegu-station" },

  // ===== 광주광역시 =====
  { si: "광주광역시", gu: "광산구", dong: "선암동", name: "선운점", address: "광주 광산구 선운로20번길 55-1 402호", file: "gwangju-seonun" },
  { si: "광주광역시", gu: "광산구", dong: "수완동", name: "수완점", address: "광주 광산구 임방울대로 310 아이비타워 406호", file: "gwangju-suwan" },
  { si: "광주광역시", gu: "광산구", dong: "신창동", name: "신창점", address: "광주 광산구 신창로 129 상민빌딩 302호", file: "gwangju-sinchang" },
  { si: "광주광역시", gu: "광산구", dong: "월계동", name: "첨단점", address: "광주 광산구 월계로 191 첨단메디컬빌딩 404호", file: "gwangju-cheomdan" },
  { si: "광주광역시", gu: "남구", dong: "진월동", name: "진월점", address: "광주 남구 광복마을길 47 4층", file: "gwangju-jinwol" },
  { si: "광주광역시", gu: "서구", dong: "치평동", name: "치평점", address: "광주 서구 치평로 76 대한빌딩 403호", file: "gwangju-chipyeong" },

  // ===== 울산광역시 =====
  { si: "울산광역시", gu: "남구", dong: "삼산동", name: "삼산점", address: "울산 남구 돋질로 300 4층", file: "ulsan-samsan" },
  { si: "울산광역시", gu: "북구", dong: "송정동", name: "송정점", address: "울산 북구 화산로 123 골드테라스 404호", file: "ulsan-songjeong" },
  { si: "울산광역시", gu: "중구", dong: "남외동", name: "남외점", address: "울산 중구 남외3길 15 남외프라자 401호", file: "ulsan-namoe" },
  { si: "울산광역시", gu: "중구", dong: "복산동", name: "복산점", address: "울산 중구 번영로 461 B2동", file: "ulsan-boksan" },

];
