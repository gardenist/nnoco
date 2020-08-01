const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const { User } = require('../models');

module.exports = (passport) => {
    // 사용자 정보 조회 -> 세션에다가 serialize

    // serialize => 메모리에 저장된 데이터를 다른 곳으로 저장
    // var list = ['준영', '뉴트']
    // => list.json
    // 데이터를 비트의 배열로 만들어 내는 일
    // 파일로 저장되거나, 다른 곳으로 데이터를 보내거나

    // 변수로 선언된 데이터 { } // 객체 같은 것
    // JSON으로 만드는 것: serialize

    // 결과적으로는 user.id를 세션에 저장
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // 세션에 있던 사용자 id -> 꺼내와서 user 테이블에서 user 정보를 조회
    passport.deserializeUser((id, done) => {
        User.find({ where: { id }})
            .then(user => done(null, user))
            .catch(err => done(err))
    });

    local(passport);
    kakao(passport);
}