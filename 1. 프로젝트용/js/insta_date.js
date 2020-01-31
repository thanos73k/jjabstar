function timeBefore(writeDay){
    console.log(writeDay);
    // 현재시간
    const now = new Date(); 
    console.log(now);
    // 글쓴 시간
    let minus;
    if(now.getFullYear() > writeDay.getFullYear()){
        minus = now.getFullYear()-writeDay.getFullYear();
        console.log(minus+"년 전");
        return minus+"년 전"
    }else if(now.getMonth() > writeDay.getMonth()){
        minus= now.getMonth()-writeDay.getMonth();
        console.log(minus+"달 전");
        return minus+"달 전"
    }else if(now.getDate() > writeDay.getDate()){
        minus= now.getDate()-writeDay.getDate();
        console.log(minus+"일 전");
        return minus+"일 전"
    }else if(now.getDate() == writeDay.getDate()){
        console.log("같은 날");
        const nowTime = now.getTime();
        const writeTime = writeDay.getTime();
        console.log(nowTime - writeTime)
        if(nowTime > writeTime){
            sec = parseInt(nowTime - writeTime) / 1000;
            day  = parseInt(sec/60/60/24);
            sec = (sec - (day * 60 * 60 * 24));
            hour = parseInt(sec/60/60);
            sec = (sec - (hour * 60 * 60));
            min = parseInt(sec/60);
            sec = parseInt(sec-(min*60));
            if(hour > 0){
                console.log(hour+"시간 전");
                return hour+"시간 전";
            }else if(min > 0){
                console.log(min+"분 전");
                return min+"분 전";
            }else if(sec > 0){
                console.log(sec+"초 전");
                return sec+"초 전";
            }
        }
    }
}

const date1 = new Date(2020, 0, 10, 11, 22, 17); // JavaScript에서 날짜 객체 생성할 때 달에 -1을 해줘야합니다.
const date2 = new Date(2020, 0, 7, 5, 12, 30);

document.getElementById("date1").innerHTML = timeBefore(date1);
document.getElementById("date2").innerHTML = timeBefore(date2);