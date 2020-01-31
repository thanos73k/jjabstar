// 댓글을 localStorage로 저장하고, 뒤이어 댓글을 html에 그려주는 함수
function writeComment(id) {
    // id값을 통해 통제할 element 지정
    const el = document.getElementById(id);
    // 별명과 댓글 모두 입력되었는지 검증
    // 엔터도 텍스트 노드로 판정되어서 0번째가 아니라 1번째, 2번째가 아니라 3번째 값을 받아야 함
    if (el.childNodes[1].value == "" || el.childNodes[3].value == "") {
        // [1] 별명, [3] 댓글
        alert("별명과 댓글을 모두 입력해주세요!")
        return 
    }
    // 등록시간, 별명, 댓글 내용을 array로 저장
    const data = [new Date().toLocaleString(), el.childNodes[1].value, el.childNodes[3].value];
    // 이후 form 태그 내용은 초기화
    el.childNodes[1].value = "";
    el.childNodes[3].value = "";
    // 로컬 스토리지에 저장된 해당 key값의 value가 null이다 = 기존 댓글 데이터가 없다
    if (!localStorage.getItem(id)) {
        console.log("데이터가 없습니다")
        // 배열.join() <= 배열을 합쳐서 문자열로 만들어주는 메소드
        localStorage.setItem(id, data.join("\t")) // 첫 댓글로 덮어씌워준다
        drawComment(id)
        return // 반환 (함수종료)
    }
    // 상단에 저장한 값을 추가해준다
    const comments_list = localStorage.getItem(id).split("\n"); // 개행값으로 구분
    comments_list.unshift(data.join("\t")); // 최신 데이터를 위에 두기 위해 unshift
    localStorage.setItem(id, comments_list.join("\n"));
    // string 값으로 저장되기 때문에 구분자들을 통해 합쳐줌
    // 변경된 데이터 기반으로 댓글 다시 그려주기
    drawComment(id);
}
// 댓글을 그려주는 함수(매개변수 아이디가 있는 곳에)
function drawComment(id) {
    // console.log("댓글 작성");
    // element.getElementsByClassName("클래스이름") 특정 클래스 값이 들어간 요소들을 모두 반환 받음. 그 중에 0번째
    el = document.getElementById(id).getElementsByClassName("comments")[0]
    // console.log(localStorage.getItem(id)) // 적재된 댓글이 있는지 확인
    // 아직 해당 글에 적재된 댓글 없을 경우
    if (localStorage.getItem(id) == null) {
        el.innerHTML = "※ 아직 댓글이 없습니다! 첫 댓글을 달아주세요!!"
        return // 반환 (함수종료)
    }
    // 로컬 저장소 데이터를 읽어 들여와서 보여준다
    const comments_list = localStorage.getItem(id).split("\n")
    let html = "";
    for(let comment of comments_list) {
        const c = comment.split("\t")
        html += "<b>" + c[1] + " </b>"
        html += `<span style="font-size: 0.7rem">` + c[0] + "</span>"
        html += "<p>" + c[2] + "</p><hr>"
    }
    el.innerHTML = html.substr(0, html.length-4) // 마지막에 붙는 hr 태그 제거
}

// 댓글 창을 그려준다
drawComment("comments1") // 첫 번째 댓글창
drawComment("comments2") // 두 번째 댓글창