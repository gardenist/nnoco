// 객체 <- Object
// 모델링: 실세계의 것들을 프로그래밍 객체로 만들는 것
// 그림: 정밀화 / 추상화 Abstract

// 코드 -> 리모컨 내부의 회로 
// 외부에 있는 버튼들 Interface

// 리모컨 -- 적외선 --> TV 적외선 수신부 -> TV 조작
let tv = {
    turnOn() {
        console.log('TV 켜짐');
    }
}

let rc = {
    turnOn() {
        // TV 적외선 수신부에 TV 켜라고 전달
        tv.turnOn();
    }
}

