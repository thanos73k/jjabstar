// 하트 눌렀을 때 반응하는 함수
function touchLike(id) {
    // id값을 통해 통제할 element 지정
    const el = document.getElementById(id);
    // 등록시간, 별명, 댓글 내용을 array로 저장
    // 로컬 스토리지에 저장된 해당 key값의 value가 null이다 = 기존 댓글 데이터가 없다
    const countId = "count" + id.substr(id.length - 1);
    // localStroage에 클릭 여부를 저장 (하트 했으면 t, 안 했으면 f)
    if (!localStorage.getItem(id)) { // localStorage에 데이터가 없으면
        localStorage.setItem(id, "t");
        // 문자열 -> 숫자로 바꾸는 여러 방법 중, +를 앞에 붙이는 간단한 방법이 있음
        // cf) parseInt(), Number() ...
        localStorage.setItem(countId, +localStorage.getItem(countId) + 1);
    } else if (localStorage.getItem(id) == "f") { // 하트가 f 상태 일 때
        localStorage.setItem(id, "t"); // t로 바꿔줌
        localStorage.setItem(countId, +localStorage.getItem(countId) + 1); // 갯수 증가
    } else { // localStorage에 데이터도 있고, 하트가 t 상태임
        localStorage.setItem(id, "f"); // f로 바꿔줌
        localStorage.setItem(countId, +localStorage.getItem(countId) - 1); // 갯수 감소
    }
    drawLike(id);
}
// 하트 t, f 여부에 따라서 속성 바꿔주는 함수
function drawLike(id) {
    // console.log("좋아요 그립니다")
    el = document.getElementById(id);
    // 하트가 t이면
    if(localStorage.getItem(id) == "t") {
        // 차 있는 속성을 부여하고 비워 있는 class 속성을 지움
        document.getElementById(id).classList.add('like-full');
        document.getElementById(id).classList.remove('like-empty');
    } else {
        // 차 있는 속성을 지우고 비워 있는 class 속성을 부여
        document.getElementById(id).classList.add('like-empty');
        document.getElementById(id).classList.remove('like-full');        
    }
    // drawLike에 집어넣은 id에서 뒷자리를 추출하여 localStorage에 넣을 때 쓸 key를 탐색
    // slice는 substring과 유사하게 작동하지만 음수를 집어넣으면 뒤로부터 카운트해서 잘라줌
    likeCount("count" + id.slice(-1));
}

function likeCount(id, init) {
    // 좋아요 갯수를 조작하는 함수
    // setItem으로 집어넣어주는데, 최초로 localStorage가 비어 있을 때만을 위한 메소드를 오버라이딩으로 구현
    if (!localStorage.getItem(id)) localStorage.setItem(id, init);
    document.getElementById(id).innerHTML =
        // 세번째 자리수에 콤마 넣어주는 코드
        localStorage.getItem(id).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}

likeCount("count1", 341) // 341로 초기화 (한 번 생성되면 직접 지우기까지 삭제 안 됨)
likeCount("count2", 1157) // 1157로 초기화 (한 번 생성되면 직접 지우기까지 삭제 안 됨)
drawLike("like1")
drawLike("like2")