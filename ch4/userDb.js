// USER 테이블에서 데이터를 조회하는 역할

// ID PASSWORD NAME NICKNAME
// MySQL 대체 
// Data source
const users = {
    "nnoco": {
        id: "nnoco",
        pw: "12341234",
        name: "이준영",
        nickname: "껍던씸"
    },
}

function login(id, pw) {
    // id, pw 일치하면 데이터를 반환
    let user = users[id];

    if(user) {
        // ID가 일치하는 것까지는 확인이 된 상태
        // PWD 일치하는지 확인
        if(user.pw === pw) {
            return user;
        }
    }
}

exports.login = login;