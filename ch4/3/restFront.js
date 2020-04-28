// fetch를 이용해서 GET /users 해오는 함수
function getUsers() {
    return fetch('/users')
}

function editUser(key, name) {
    return fetch('/users/' + key, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
    })
}

function deleteUser(key) {
    return fetch('/users/' + key, {
        method: 'DELETE'
    });
}

// list를 만들고 받아온 데이터를 html로 그려내는 것

// 이름을 표시하는 부분 HTML 생성하기
function createLabel(label) {
    let span = document.createElement('span');
    span.textContent = label;
    return span;
}

// 수정 버튼 생성하기
function createEdit(key) {
    let edit = document.createElement('button');
    edit.textContent = '수정';

    edit.addEventListener('click', function () { // 수정 버튼 클릭
        var name = prompt('바꿀 이름을 입력하세요');
        if (!name) {
            return alert('이름을 반드시 입력하셔야 합니다');
        }

        // 수정 API 호출하기
        editUser(key, name).then(response => {
            console.log('수정 완료 - ' + key + ', ' + name);
            getAndRenderUsers();
        });
    });

    return edit;
}

// 삭제 버튼 생성하기
function createRemove(key) {
    let remove = document.createElement('button');
    remove.textContent = '삭제';
    remove.addEventListener('click', function () { // 삭제 버튼 클릭
        if(confirm('진짜로 삭제하시겠습니까?')) {
            deleteUser(key).then(response => {
                console.log('삭제 완료 - ' + key);
                getAndRenderUsers();
            })
        }
    });

    return remove;
}


function getAndRenderUsers() { // 로딩 시 사용자 가져오는 함수
    // AJAX
    // asynchronous javascript a? XML
    getUsers().then(response => {
        return response.json()
    }).then(users => {
        console.log(users);

        var list = document.getElementById('list');
        list.innerHTML = '';
        Object.keys(users).map(function (key) {
            var userDiv = document.createElement('div');

            var span = createLabel(users[key]);

            var edit = createEdit(key);

            var remove = createRemove(key);

            userDiv.appendChild(span);
            userDiv.appendChild(edit);
            userDiv.appendChild(remove);
            list.appendChild(userDiv);
        })
    })


    
  }


window.onload = getAndRenderUsers; // 로딩 시 getUser 호출

function saveNewUser(name) {
    return fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
    });
}

// 폼 제출
document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = e.target.username.value;
    if (!name) {
        return alert('이름을 입력하세요');
    }
   
    saveNewUser(name).then(() => {
        getAndRenderUsers();
    })

    e.target.username.value = '';
});