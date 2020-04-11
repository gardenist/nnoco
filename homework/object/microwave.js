// 전자기기 디자인

// 버튼 함수
/*
- 30초 더하기
- 1분 더하기
- 시작
- 정지
*/

// 디스플레이: 타이머 <- 남은 시간
// 남은 초
// 전등

let microwave = {
    // 남은 초
    restSeconds: 0,
    
    // 돌고 있는지 상태
    isRunning: false,

    add30Seconds() {
        this.restSeconds += 30
    },

    add1Minute() {
        this.restSeconds += 60
    },

    start() {
        // 시작
        this.isRunning = true;

        let interval = setInterval(() => {
            if(this.restSeconds > 0 && this.isRunning) {
                // 매초마다 출력
                console.log(this.restSeconds);
                this.restSeconds--;
            } else {
                console.log('끝!');
                this.isRunning = false;
                clearInterval(interval);
            }
        }, 1000);
    }
}

