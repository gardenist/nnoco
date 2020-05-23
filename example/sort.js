function row(id, url, path, label, count) {
    return {
        id, url, path, label, count
    }
}

function rowToHeadCells(row) {
    return Object.keys(row).map(key => {
        return {
            id: key,
            numeric: false,
            disablePadding: true,
            label: key
        }
    });
}

let submitData = [
    row(1, '/a/', '/a/b/c/', 'ABC', 0),
    row(2, '/b/', '/c/d/e', 'CDE', 10),
]

if(submitData && submitData.length) {
    let headCells = rowToHeadCells(submitData[0]);

    //console.dir(headCells);
    // keys => headCells

    // 음수 반환 -> a가 작은 (앞에 오는 경우)
    // 0 -> a와 b 같은 경우
    // 양수 -> a가 b보다 뒤에 사전순으로 뒤에 오는 경우
    let sortedHeadCells = headCells.sort((a, b, c) => {
        return a.label.localeCompare(b.label);
    })
    console.log('정렬 후');
    console.dir(sortedHeadCells);
}

