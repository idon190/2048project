// // // // //  변수 선언부 // // // // // 
const $table = document.getElementById("table"); // 표 생성
let data = []; // 게임판(이중배열)
const $tile = document.getElementById("tile");

// // // // //  함수 선언 및 동작부 // // // // // 
function startGame() { // 게임 시작 함수
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
  draw(); // 데이터를 표시하는 함수
}

function put2ToRandomCell() { // 2를 랜덤한 빈 칸에 생성하는 함수
  const emptyCells = []; // 빈 칸 목록 생성
  data.forEach((rowData, i) => { // 각각의 가로줄에 대하여
    rowData.forEach((cellData, j) => { // 각각의 세로줄에 대하여 >>> 가로줄 안에서 세로줄을 찾으므로 한 칸씩 탐색됨(즉 각각의 칸에 대해서)
      if (!cellData) { // 칸에 값이 없으면(0이 있으면)
        emptyCells.push([i, j]); // 빈 칸 목록에 무슨 칸인지 등록 >>>> (i+1)번째 가로줄과 (j+1)번째 세로줄에 해당하는 칸
      }
    });
  });
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]; // 빈 칸 중에서 랜덤하게 한 칸을 추출
  data[randomCell[0]][randomCell[1]] = 2; //  추출된 칸의 데이터를 2로 설정
}

function draw() { // 데이터를 표시하는 함수
  data.forEach((rowData, i) => { // 각각의 가로줄에 대하여
    rowData.forEach((cellData, j) => { // 각각의 세로줄에 대하여 >>> 가로줄 안에서 세로줄을 찾으므로 한 칸씩 탐색됨(즉 각각의 칸에 대해서)
      const $target = $table.children[i].children[j]; // 표시할 대상 지정
      if (cellData) { // 칸에 값이 있으면(0이 아니면)
        $target.textContent = cellData; // 표시할 내용을 칸에 있는 값으로 설정
        $target.className = 'color-' + cellData; // 표시할 색을 칸에 있는 값에 해당하는 색으로 설정(html 파일 참조)
      } else { // 아니면(칸에 0이 있으면(비어 있으면))
        $target.textContent = ''; // 표시할 내용을 미지정
        $target.className = ''; // 표시할 색을 미지정
      }
    });
  });
}

function moveCells(direction) { // 각 칸의 데이터들을 정렬하고 병합하는 함수
  switch (direction) { // direction에 대하여
    case 'left': { // left이면
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
      const newData = [[], [], [], []]; // 정렬을 위한 배열 생성
      data.forEach((rowData, i) => { // 각각의 가로줄에 대하여
        rowData.forEach((celLData, j) => { // 각각의 세로줄에 대하여 >>> 가로줄 안에서 세로줄을 찾으므로 한 칸씩 탐색됨(즉 각각의 칸에 대해서)
          if (rowData[3-j]) { // 칸에 값이 있으면(0이 아니면) >>> 오른쪽부터(거꾸로) 감지해야 하므로 왼쪽부터인 cellData 대신 rowData[3-j]를 사용
            if (newData[i][newData[i].length - 1] === rowData[3-j]) { //  새로 정렬된 가로줄의 제일 오른쪽 데이터(이전에 정렬된 값)과 현재 칸의 값이 같으면(즉 같은 줄에 빈 칸을 제외하고 같은 숫자가 연속으로 있다면) >>> 오른쪽이 아닌 왼쪽 정렬로 저장(순서 반대)
              newData[i][newData[i].length - 1] *= -2; // 새로 정렬된 가로줄의 제일 오른쪽 데이터(이전에 정렬된 값)에 -2를 곱함(병합 처리가 중복되는 것을 방지하기 위함) >>> 현재 칸의 값은 newData에 삽입하지 않으므로 이전 값에 병합되고 사라진다.
            } else { // 아니면(새로 정렬된 가로줄의 제일 오른쪽 데이터(이전에 정렬된 값)과 현재 칸의 값이 같지 않으면, 즉 같은 줄에 빈 칸을 제외하고 같은 숫자가 연속으로 있지 않다면)
              newData[i].push(rowData[3-j]); // 해당 칸의 새로운 가로줄 데이터에 칸의 데이터를 삽입 >>> 오른쪽이 아닌 왼쪽 정렬로 저장(순서 반대)
            }
          }
        });
      });
      [1, 2, 3, 4].forEach((rowData, i) => { // 4번 반복
        [1, 2, 3, 4].forEach((cellData, j) => { // 4번 반복
          data[i][3-j] = Math.abs(newData[i][j]) || 0; // newData에 왼쪽과 오른쪽의 순서가 반대로 저장되었기 때문에 적용하는 것도 순서를 반대로 해 줌(원상 복귀)
        });
      });
      break;
    }
    case 'up': { // up이면
      const newData = [[], [], [], []]; // 정렬을 위한 배열 생성
      data.forEach((rowData, i) => { // 각각의 가로줄에 대하여
        rowData.forEach((cellData, j) => { // 각각의 세로줄에 대하여 >>> 가로줄 안에서 세로줄을 찾으므로 한 칸씩 탐색됨(즉 각각의 칸에 대해서)
          if (cellData) { // 칸에 값이 있으면(0이 아니면)
            if (newData[j][newData[j].length - 1] === cellData) { //  새로 정렬된 세로줄의 제일 오른쪽 데이터(이전에 정렬된 값)과 현재 칸의 값이 같으면(즉 같은 줄에 빈 칸을 제외하고 같은 숫자가 연속으로 있다면) >>> 가로줄과 세로줄이 바뀌어 저장
              newData[j][newData[j].length - 1] *= -2; // 새로 정렬된 세로줄의 제일 오른쪽 데이터(이전에 정렬된 값)에 -2를 곱함(병합 처리가 중복되는 것을 방지하기 위함) >>> 현재 칸의 값은 newData에 삽입하지 않으므로 이전 값에 병합되고 사라진다.
            } else { // 아니면(새로 정렬된 가로줄의 제일 오른쪽 데이터(이전에 정렬된 값)과 현재 칸의 값이 같지 않으면, 즉 같은 줄에 빈 칸을 제외하고 같은 숫자가 연속으로 있지 않다면)
              newData[j].push(cellData); // 해당 칸의 새로운 세로줄 데이터에 칸의 데이터를 삽입 >>> 가로줄과 세로줄이 바뀌어 저장
            }
          }
        });
      });
      [1, 2, 3, 4].forEach((cellData, i) => { // 4번 반복
        [1, 2, 3, 4].forEach((rowData, j) => { // 4번 반복
          data[j][i] = Math.abs(newData[i][j]) || 0; // newData에 가로줄과 세로줄이 바뀌어 저장되었기 때문에 적용하는 것도 가로줄과 세로줄을 반대로 해 줌(원상 복귀)
        });
      });
      break;
    }
    case 'down': { // down이면
      const newData = [[], [], [], []]; // 정렬을 위한 배열 생성
      data.forEach((rowData, i) => { // 각각의 가로줄에 대하여
        rowData.forEach((cellData, j) => { // 각각의 세로줄에 대하여 >>> 가로줄 안에서 세로줄을 찾으므로 한 칸씩 탐색됨(즉 각각의 칸에 대해서)
          if (data[3-i][j]) { // 칸에 값이 있으면(0이 아니면) >>> 아래쪽부터(거꾸로) 감지해야 하므로 왼쪽부터인 cellData 대신 data[3-i][j]를 사용
            if (newData[j][newData[j].length - 1] === data[3-i][j]) { // 새로 정렬된 세로줄의 제일 오른쪽 데이터(이전에 정렬된 값)과 현재 칸의 값이 같으면(즉 같은 줄에 빈 칸을 제외하고 같은 숫자가 연속으로 있다면) >>> 가로줄과 세로줄, 왼쪽과 오른쪽이 반대로 저장
              newData[j][newData[j].length - 1] *= -2; // 새로 정렬된 세로줄의 제일 오른쪽 데이터(이전에 정렬된 값)에 -2를 곱함(병합 처리가 중복되는 것을 방지하기 위함) >>> 현재 칸의 값은 newData에 삽입하지 않으므로 이전 값에 병합되고 사라진다.
            } else { // 아니면(새로 정렬된 가로줄의 제일 오른쪽 데이터(이전에 정렬된 값)과 현재 칸의 값이 같지 않으면, 즉 같은 줄에 빈 칸을 제외하고 같은 숫자가 연속으로 있지 않다면)
              newData[j].push(data[3-i][j]); // 해당 칸의 새로운 세로줄 데이터에 칸의 데이터를 삽입 >>> 가로줄과 세로줄, 왼쪽과 오른쪽이 반대로 저장
            }
          }
        });
      });
      [1, 2, 3, 4].forEach((cellData, i) => { // 4번 반복
        [1, 2, 3, 4].forEach((rowData, j) => { // 4번 반복
          data[3-j][i] = Math.abs(newData[i][j]) || 0; // newData에 가로줄과 세로줄이 바뀌어 저장되었기 때문에 적용하는 것도 가로줄과 세로줄을 반대로 해 줌(원상 복귀)
        });
      });
      break;
    }
  }
  put2ToRandomCell(); // 2를 랜덤한 빈 칸에 생성하는 함수
  draw(); // 데이터를 표시하는 함수
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
