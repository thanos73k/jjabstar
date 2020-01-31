let score = 0
let name = ""

function nextPage(id, data) {
    if(!data.value) {
        alert("빈 칸을 채워주세요!")
        return;
    } else {
        if(id != "p1") {
            score += Number(data.value);
            console.log(score)
        } else {
            name = data.value;
        }
    }
    if(id != "") {
        document.getElementById(id).style.display='none';
        const id2 = 'p' + (Number(id.substr(1)) + 1);
        document.getElementById(id2).style.display='block';
        console.log("다음 페이지")
    }
}

function drawPage(id) {
    function ptag(text) {
        return "<p>" + text + "</p>"
    }
    let newHTML = ""
    newHTML += ptag("<b>이름</b> : " + name)
    newHTML += ptag("<b>점수</b> : " + score + "점")
    let explain;
    if(score <= 10) {
        explain  = `남들이 보는 당신은 소심하고 우유부단합니다.<br>
        본인의 일도 누군가가 대신해서 결정해줘야만하고,<br>
        타인이나 어떤 일에 연루되는 것을 피하는 사람입니다.<br>
        또한, 걱정을 사서하는 타입입니다.`
    } else if (score > 10 && score <= 15) {
        explain = `남들이 보는 당신은 현명하고 신중하며 현실적입니다.<br>
        사람을 사귈 때 급하거나 가볍게 접근하지 않으며<br>
        가까워진 사람에게는 매우 잘해주며 자신도 같은 대우를 해주기를 기대합니다.<br>
        당신의 참 모습을 아는 사람들은 당신의 신뢰를 흔드는 것이 어렵다는 것과<br>
        그 신뢰가 무너지면 다시 되돌리기 어렵다는 것을 알고 있을 겁니다.`
    } else if (score > 15 && score <= 20) {
        explain = `남들이 보는 당신은 집요하며 깐깐한 사람으로 <br>
        신중하고 조심스러워하며 느리지만 발전하는 편입니다.<br>
        당신은 무슨일인가 충동적으로 하는 모습을 본다면 친구들이 충격을 받을지도 모릅니다. <br>
        무슨일이든 꼼꼼히 계획하며 다음 결정을 하는 것을 선호합니다.`
    } else if (score > 20 && score <= 25) {
        explain = `남들이 보는 당신은 매우 매력있는 타입이기도하며,<br>
        때로는 이성적이면서도 즐거운 사람이라고 생각합니다.<br>
        주의의 이목을 사로잡는 사람이지만 적당한 눈치도 있으며 <br>
        교만해지지 않는 사람이기도 합니다. 또한 다정하며 친절하고, 이해심이 많아<br>
        다른 사람을 도울 줄 아는 분위기 메이커 역할을 하기도 합니다.`
    } else if (score > 25 && score <= 30) {
        explain = `남들이 보는 당신은 변덕스러우며, 충동적인 사람이라고 생각합니다.<br>
        또한 리더형으로 빠른 결정을 내릴 줄 아는 사람이기도 합니다.<br>
        무엇이든 시도해볼 줄 아는 과감한 모험형 타입으로<br>
        겁이 없으며 호기심이 매우 많습니다.`
    } else if (score > 30) {
        explain = `남들이 보는 당신은 취급 주의형이라고 생각하며<br>
        약간의 허영심이 있고 남을 지배하고 싶은 욕구가 강합니다.<br>
        남이 해주는 칭찬에 약하지만 막상 본인은 남들에게 <br>
        칭찬을 잘 해주지 못하는 양면의 성격이 있습니다.<br>
        의외로 당신의 당당한 성격을 부러워하고 우러러보는 사람들이 있지만<br>
        당신은 그러한 사람들은 잘 보지 못합니다.`
    } 
    newHTML += ptag(explain)
    newHTML += `<button class="w3-btn w3-hover-black insta-bg w3-round-large"
                    onclick="location.href='insta_quiz.html'">다시 하러 가기</button>
                    <br><br>`
    document.getElementById(id).innerHTML = newHTML
}