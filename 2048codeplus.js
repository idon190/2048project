// // // // //  변수 선언부 // // // // // 
let data = []; // 게임판(이중배열)
let newdata
const $table = document.createElement("table");
// const $tile = document.getElementById("tile");
const $tile00 = document.getElementById("tile00");
const $tile01 = document.getElementById("tile01");
const $tile02 = document.getElementById("tile02");
const $tile03 = document.getElementById("tile03");
const $tile10 = document.getElementById("tile10");
const $tile11 = document.getElementById("tile11");
const $tile12 = document.getElementById("tile12");
const $tile13 = document.getElementById("tile13");
const $tile20 = document.getElementById("tile20");
const $tile21 = document.getElementById("tile21");
const $tile22 = document.getElementById("tile22");
const $tile23 = document.getElementById("tile23");
const $tile30 = document.getElementById("tile30");
const $tile31 = document.getElementById("tile31");
const $tile32 = document.getElementById("tile32");
const $tile33 = document.getElementById("tile33");


// // // // //  함수 선언 및 동작부 // // // // // 
function startGame() { // 게임 시작 함수
  const $tiles = document.getElementsByClassName('tile');
  $tiles.style.display = 'none';
  const $fragment = document.createDocumentFragment(); // documentFragment 생성
  [1, 2, 3, 4].forEach(() => { // 4번 반복
    const rowData = []; // 가로줄 생성
    data.push(rowData); // data에 가로줄 추가
    const $tr = document.createElement('tr'); // tr 생성
    [1, 2, 3, 4].forEach(() => { // 4번 반복
      rowData.push(0); // 가로줄에 빈(0) 칸 생성
      const $td = document.createElement('td'); // td 생성
      $tr.appendChild($td); // tr에 td 삽입
    });
    $fragment.appendChild($tr); // documentFragment에 tr 삽입
  });
  $table.appendChild($fragment); // table에 documentFragment 삽입(불러오기)
  put2ToRandomCell(); // 2를 랜덤한 빈 칸에 생성하는 함수
}

function put2ToRandomCell() { // 2를 랜덤한 빈 칸에 생성하는 함수
  const emptyCells = []; // [[i1, j1], [i2, j2], [i3, j3]]
  data.forEach((rowData, i) => {
    rowData.forEach((cellData, j) => {
      if (!cellData) {
        emptyCells.push([i, j]);
      }
    });
  });
  // randomCell === [i, j]
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  newdata = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ];
  newdata[randomCell[0]][randomCell[1]] = 2;
  draw('random', newdata);
}
let random_result;
function draw(direction = null, newdata = null) { // 데이터를 표시하는 함수
  if (direction == 'random') {
    console.log(newdata);
    const random_result0 = newdata[0].indexOf(2);
    const random_result1 = newdata[1].indexOf(2);
    const random_result2 = newdata[2].indexOf(2);
    const random_result3 = newdata[3].indexOf(2);
    console.log(random_result0);
    console.log(random_result1);
    console.log(random_result2);
    console.log(random_result3);
    if (random_result0){
      if (random_result0 === 0) {
        random_result = $tile00;
      } else if (random_result0 === 1) {
        random_result = $tile01;
      } else if (random_result0 === 2) {
        random_result = $tile02;
      } else if (random_result0 === 3) {
        random_result = $tile03;
      }
    } else if (random_result1){
      if (random_result1 === 0) {
        random_result = $tile10;
      } else if (random_result1 === 1) {
        random_result = $tile11;
      } else if (random_result1 === 2) {
        random_result = $tile12;
      } else if (random_result1 === 3) {
        random_result = $tile13;
      }
    } else if (random_result2){
      if (random_result2 === 0) {
        random_result = $tile20;
      } else if (random_result2 === 1) {
        random_result = $tile21;
      } else if (random_result2 === 2) {
        random_result = $tile22;
      } else if (random_result2 === 3) {
        random_result = $tile23;
      }
    } else if (random_result3){
      if (random_result3 === 0) {
        random_result = $tile30;
      } else if (random_result3 === 1) {
        random_result = $tile31;
      } else if (random_result3 === 2) {
        random_result = $tile32;
      } else if (random_result3 === 3) {
        random_result = $tile33;
      }
    };
    console.log(random_result);
    random_result.style.display = 'unset';
    random_result.textContent = '2';
    random_result.className = 'color-2';
  }
}

function moveCells(direction) { // 각 칸의 데이터들을 정렬하고 병합하는 함수
  switch (direction) { // direction에 대하여
    case 'left': { // left이면
      positionnumber1 = Number($tile00.className.slice(-1))-1;
      if (positionnumber1 < 0) {
        positionnumber1 = 0;
      };
      positionnumber2 = Number($tile00.className.slice(-2).slice(0, 1));
      $tile00.className = "position"+positionnumber2+positionnumber1;
      console.log($tile00);
      const newData = [[], [], [], []]; // 정렬을 위한 배열 생성
      data.forEach((rowData, i) => { // 각각의 가로줄에 대하여
        rowData.forEach((cellData, j) => { // 각각의 세로줄에 대하여 >>> 가로줄 안에서 세로줄을 찾으므로 한 칸씩 탐색됨(즉 각각의 칸에 대해서)
          if (cellData) { // 칸에 값이 있으면(0이 아니면)
            if (newData[i][newData[i].length - 1] === cellData) { //  새로 정렬된 가로줄의 제일 오른쪽 데이터(이전에 정렬된 값)과 현재 칸의 값이 같으면(즉 같은 줄에 빈 칸을 제외하고 같은 숫자가 연속으로 있다면)
              newData[i][newData[i].length - 1] *= -2; // 새로 정렬된 가로줄의 제일 오른쪽 데이터(이전에 정렬된 값)에 -2를 곱함(병합 처리가 중복되는 것을 방지하기 위함) >>> 현재 칸의 값은 newData에 삽입하지 않으므로 이전 값에 병합되고 사라진다.
            } else { // 아니면(새로 정렬된 가로줄의 제일 오른쪽 데이터(이전에 정렬된 값)과 현재 칸의 값이 같지 않으면, 즉 같은 줄에 빈 칸을 제외하고 같은 숫자가 연속으로 있지 않다면)
              newData[i].push(cellData); // 해당 칸의 새로운 가로줄 데이터에 칸의 데이터를 삽입
            }
          } // 각 칸에 대하여 위의 코드가 실행되는 순서는 왼쪽에서 오른쪽이므로 비어있지 않은 칸들은 먼저 감지된 순서대로(왼쪽에 있는 순서대로) newData에 쌓이게 되고 밑의 코드에서 부족한 데이터 수만큼 0을 삽입(예: 1번째 가로줄이 [0, 2, 0, 4]라면 왼쪽에 있는 0이 아닌 값부터 쌓여 newData[0]이 [2, 4]가 되고 밑의 코드에서 부족한 데이터 수(2개)만큼 0을 삽입하여 newData[0]은 최종적으로 [2, 4, 0, 0]이 되어 왼쪽으로 정렬된다.) 
        });
      });
      [1, 2, 3, 4].forEach((rowData, i) => { // 4번 반복(가로줄)
        [1, 2, 3, 4].forEach((cellData, j) => { // 4번 반복(세로줄)
          data[i][j] = Math.abs(newData[i][j]) || 0; //  각 칸에 대하여 newData에 값이 있으면 data(게임판, 실제 데이터)에 절댓값을 씌워 적용(위에서 -2를 곱했으므로), 값이 없다면 0을 적용(예: newData[0]이 [2, 4]라면 2번째, 3번째 인덱스에 해당하는 값이 없으므로 그 수(부족한 수)만큼 0을 적용히여 data[0]은 [2, 4, 0, 0]이 됨)
        });
      });
      break;
    }
    case 'right': { // right이면
      positionnumber1 = Number($tile00.className.slice(-1))+1;
      if (positionnumber1 > 3) {
        positionnumber1 = 3;
      };
      positionnumber2 = Number($tile00.className.slice(-2).slice(0, 1));
      $tile00.className = "position"+positionnumber2+positionnumber1;
      console.log($tile00);
      const newData = [[], [], [], []]; // 정렬을 위한 배열 생성
      data.forEach((rowData, i) => { // 각각의 가로줄에 대하여
        rowData.forEach((cellData, j) => { // 각각의 세로줄에 대하여 >>> 가로줄 안에서 세로줄을 찾으므로 한 칸씩 탐색됨(즉 각각의 칸에 대해서)
          if (cellData) { // 칸에 값이 있으면(0이 아니면)
            if (newData[i][newData[i].length - 1] === cellData) { //  새로 정렬된 가로줄의 제일 오른쪽 데이터(이전에 정렬된 값)과 현재 칸의 값이 같으면(즉 같은 줄에 빈 칸을 제외하고 같은 숫자가 연속으로 있다면)
              newData[i][newData[i].length - 1] *= -2; // 새로 정렬된 가로줄의 제일 오른쪽 데이터(이전에 정렬된 값)에 -2를 곱함(병합 처리가 중복되는 것을 방지하기 위함) >>> 현재 칸의 값은 newData에 삽입하지 않으므로 이전 값에 병합되고 사라진다.
            } else { // 아니면(새로 정렬된 가로줄의 제일 오른쪽 데이터(이전에 정렬된 값)과 현재 칸의 값이 같지 않으면, 즉 같은 줄에 빈 칸을 제외하고 같은 숫자가 연속으로 있지 않다면)
              newData[i].push(cellData); // 해당 칸의 새로운 가로줄 데이터에 칸의 데이터를 삽입
            }
          } // 각 칸에 대하여 위의 코드가 실행되는 순서는 왼쪽에서 오른쪽이므로 비어있지 않은 칸들은 먼저 감지된 순서대로(왼쪽에 있는 순서대로) newData에 쌓이게 되고 밑의 코드에서 부족한 데이터 수만큼 0을 삽입(예: 1번째 가로줄이 [0, 2, 0, 4]라면 왼쪽에 있는 0이 아닌 값부터 쌓여 newData[0]이 [2, 4]가 되고 밑의 코드에서 부족한 데이터 수(2개)만큼 0을 삽입하여 newData[0]은 최종적으로 [2, 4, 0, 0]이 되어 왼쪽으로 정렬된다.) 
        });
      });
      [1, 2, 3, 4].forEach((rowData, i) => { // 4번 반복(가로줄)
        [1, 2, 3, 4].forEach((cellData, j) => { // 4번 반복(세로줄)
          data[i][j] = Math.abs(newData[i][j]) || 0; //  각 칸에 대하여 newData에 값이 있으면 data(게임판, 실제 데이터)에 절댓값을 씌워 적용(위에서 -2를 곱했으므로), 값이 없다면 0을 적용(예: newData[0]이 [2, 4]라면 2번째, 3번째 인덱스에 해당하는 값이 없으므로 그 수(부족한 수)만큼 0을 적용히여 data[0]은 [2, 4, 0, 0]이 됨)
        });
      });
      break;
    }
    case 'up': { // up이면
      positionnumber1 = Number($tile00.className.slice(-1));
      positionnumber2 = Number($tile00.className.slice(-2).slice(0, 1))-1;
      if (positionnumber2 < 0) {
        positionnumber2 = 0;
      };
      $tile00.className = "position"+positionnumber2+positionnumber1;
      console.log($tile00);
      const newData = [[], [], [], []]; // 정렬을 위한 배열 생성
      data.forEach((rowData, i) => { // 각각의 가로줄에 대하여
        rowData.forEach((cellData, j) => { // 각각의 세로줄에 대하여 >>> 가로줄 안에서 세로줄을 찾으므로 한 칸씩 탐색됨(즉 각각의 칸에 대해서)
          if (cellData) { // 칸에 값이 있으면(0이 아니면)
            if (newData[i][newData[i].length - 1] === cellData) { //  새로 정렬된 가로줄의 제일 오른쪽 데이터(이전에 정렬된 값)과 현재 칸의 값이 같으면(즉 같은 줄에 빈 칸을 제외하고 같은 숫자가 연속으로 있다면)
              newData[i][newData[i].length - 1] *= -2; // 새로 정렬된 가로줄의 제일 오른쪽 데이터(이전에 정렬된 값)에 -2를 곱함(병합 처리가 중복되는 것을 방지하기 위함) >>> 현재 칸의 값은 newData에 삽입하지 않으므로 이전 값에 병합되고 사라진다.
            } else { // 아니면(새로 정렬된 가로줄의 제일 오른쪽 데이터(이전에 정렬된 값)과 현재 칸의 값이 같지 않으면, 즉 같은 줄에 빈 칸을 제외하고 같은 숫자가 연속으로 있지 않다면)
              newData[i].push(cellData); // 해당 칸의 새로운 가로줄 데이터에 칸의 데이터를 삽입
            }
          } // 각 칸에 대하여 위의 코드가 실행되는 순서는 왼쪽에서 오른쪽이므로 비어있지 않은 칸들은 먼저 감지된 순서대로(왼쪽에 있는 순서대로) newData에 쌓이게 되고 밑의 코드에서 부족한 데이터 수만큼 0을 삽입(예: 1번째 가로줄이 [0, 2, 0, 4]라면 왼쪽에 있는 0이 아닌 값부터 쌓여 newData[0]이 [2, 4]가 되고 밑의 코드에서 부족한 데이터 수(2개)만큼 0을 삽입하여 newData[0]은 최종적으로 [2, 4, 0, 0]이 되어 왼쪽으로 정렬된다.) 
        });
      });
      [1, 2, 3, 4].forEach((rowData, i) => { // 4번 반복(가로줄)
        [1, 2, 3, 4].forEach((cellData, j) => { // 4번 반복(세로줄)
          data[i][j] = Math.abs(newData[i][j]) || 0; //  각 칸에 대하여 newData에 값이 있으면 data(게임판, 실제 데이터)에 절댓값을 씌워 적용(위에서 -2를 곱했으므로), 값이 없다면 0을 적용(예: newData[0]이 [2, 4]라면 2번째, 3번째 인덱스에 해당하는 값이 없으므로 그 수(부족한 수)만큼 0을 적용히여 data[0]은 [2, 4, 0, 0]이 됨)
        });
      });
      break;
    }
    case 'down': { // down이면
      positionnumber1 = Number($tile00.className.slice(-1));
      positionnumber2 = Number($tile00.className.slice(-2).slice(0, 1))+1;
      if (positionnumber2 > 3) {
        positionnumber2 = 3;
      };
      $tile00.className = "position"+positionnumber2+positionnumber1;
      console.log($tile00);
      const newData = [[], [], [], []]; // 정렬을 위한 배열 생성
      data.forEach((rowData, i) => { // 각각의 가로줄에 대하여
        rowData.forEach((cellData, j) => { // 각각의 세로줄에 대하여 >>> 가로줄 안에서 세로줄을 찾으므로 한 칸씩 탐색됨(즉 각각의 칸에 대해서)
          if (cellData) { // 칸에 값이 있으면(0이 아니면)
            if (newData[i][newData[i].length - 1] === cellData) { //  새로 정렬된 가로줄의 제일 오른쪽 데이터(이전에 정렬된 값)과 현재 칸의 값이 같으면(즉 같은 줄에 빈 칸을 제외하고 같은 숫자가 연속으로 있다면)
              newData[i][newData[i].length - 1] *= -2; // 새로 정렬된 가로줄의 제일 오른쪽 데이터(이전에 정렬된 값)에 -2를 곱함(병합 처리가 중복되는 것을 방지하기 위함) >>> 현재 칸의 값은 newData에 삽입하지 않으므로 이전 값에 병합되고 사라진다.
            } else { // 아니면(새로 정렬된 가로줄의 제일 오른쪽 데이터(이전에 정렬된 값)과 현재 칸의 값이 같지 않으면, 즉 같은 줄에 빈 칸을 제외하고 같은 숫자가 연속으로 있지 않다면)
              newData[i].push(cellData); // 해당 칸의 새로운 가로줄 데이터에 칸의 데이터를 삽입
            }
          } // 각 칸에 대하여 위의 코드가 실행되는 순서는 왼쪽에서 오른쪽이므로 비어있지 않은 칸들은 먼저 감지된 순서대로(왼쪽에 있는 순서대로) newData에 쌓이게 되고 밑의 코드에서 부족한 데이터 수만큼 0을 삽입(예: 1번째 가로줄이 [0, 2, 0, 4]라면 왼쪽에 있는 0이 아닌 값부터 쌓여 newData[0]이 [2, 4]가 되고 밑의 코드에서 부족한 데이터 수(2개)만큼 0을 삽입하여 newData[0]은 최종적으로 [2, 4, 0, 0]이 되어 왼쪽으로 정렬된다.) 
        });
      });
      [1, 2, 3, 4].forEach((rowData, i) => { // 4번 반복(가로줄)
        [1, 2, 3, 4].forEach((cellData, j) => { // 4번 반복(세로줄)
          data[i][j] = Math.abs(newData[i][j]) || 0; //  각 칸에 대하여 newData에 값이 있으면 data(게임판, 실제 데이터)에 절댓값을 씌워 적용(위에서 -2를 곱했으므로), 값이 없다면 0을 적용(예: newData[0]이 [2, 4]라면 2번째, 3번째 인덱스에 해당하는 값이 없으므로 그 수(부족한 수)만큼 0을 적용히여 data[0]은 [2, 4, 0, 0]이 됨)
        });
      });
      break;
    }
  }
  put2ToRandomCell(); // 2를 랜덤한 빈 칸에 생성하는 함수
  // draw(); // 데이터를 표시하는 함수
}

window.addEventListener('keyup', (event) => { // 키보드 키가 뗴질 때
  if (event.key === 'ArrowUp' || event.key === 'w') { // 떼진 키가 위쪽 화살표 또는 w라면
    moveCells('up'); // 위쪽 정렬 및 병합
  } else if (event.key === 'ArrowDown' || event.key === 's') { // 떼진 키가 아래쪽 화살표 또는 s라면
    moveCells('down'); // 아래쪽 정렬 및 병합
  } else if (event.key === 'ArrowLeft' || event.key === 'a') { // 떼진 키가 왼쪽 화살표 또는 a라면
    moveCells('left'); // 왼쪽 정렬 및 병합
  } else if (event.key === 'ArrowRight' || event.key === 'd') { // 떼진 키가 오른쪽 화살표 또는 d라면
    moveCells('right'); // 오른쪽 정렬 및 병합
  }
});


// // // // //  실행부 // // // // // 
startGame();
