////////// 변수 선언부 //////////
const $table = document.getElementById("table"); //표 생성
let data = []; //게임판(이중배열)


////////// 함수 선언부 //////////
function startGame() { //게임 시작 함수
  const $fragment = document.createDocumentFragment(); //documentFragment 생성
  [1, 2, 3, 4].forEach(() => { //4번 반복
    const rowData = []; //가로줄 생성
    data.push(rowData); //data에 가로줄 추가
    const $tr = document.createElement('tr'); //tr 생성
    [1, 2, 3, 4].forEach(() => { //4번 반복
      rowData.push(0); //가로줄에 빈(0) 칸 생성
      const $td = document.createElement('td'); //td 생성
      $tr.appendChild($td); //tr에 td 삽입
    });
    $fragment.appendChild($tr); //documentFragment에 tr 삽입
  });
  $table.appendChild($fragment); //table에 documentFragment 삽입(불러오기)
  put2ToRandomCell(); //2를 랜덤한 칸에 생성하는 함수
  draw(); //데이터를 표시하는 함수
}

function put2ToRandomCell() { //2를 랜덤한 칸에 생성하는 함수
  const emptyCells = []; //빈 칸 목록 생성
  data.forEach((rowData, i) => { //각각의 가로줄에 대하여
    rowData.forEach((cellData, j) => { //각각의 세로줄에 대하여 >>> 가로줄 안에서 세로줄을 찾으므로 한 칸씩 탐색됨(즉 각각의 칸에 대해서)
      if (!cellData) { //칸에 값이 없으면(0이 있으면)
        emptyCells.push([i, j]); //빈 칸 목록에 무슨 칸인지 등록 >>>> (i+1)번째 가로줄과 (j+1)번째 세로줄에 해당하는 칸
      }
    });
  });
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]; //빈 칸 중에서 랜덤하게 한 칸을 추출
  data[randomCell[0]][randomCell[1]] = 2; // 추출된 칸의 데이터를 2로 설정
}

function draw() { //데이터를 표시하는 함수
  data.forEach((rowData, i) => { //각각의 가로줄에 대하여
    rowData.forEach((cellData, j) => { //각각의 세로줄에 대하여 >>> 가로줄 안에서 세로줄을 찾으므로 한 칸씩 탐색됨(즉 각각의 칸에 대해서)
      const $target = $table.children[i].children[j]; //표시할 대상 지정
      if (cellData) { //칸에 값이 있으면(0이 아니면)
        $target.textContent = cellData; //표시할 내용을 칸에 있는 값으로 설정
        $target.className = 'color-' + cellData; //표시할 색을 칸에 있는 값에 해당하는 색으로 설정(html 파일 참조)
      } else { //아니면(칸에 0이 있으면(비어 있으면))
        $target.textContent = ''; //표시할 내용을 미지정
        $target.className = ''; //표시할 색을 미지정
      }
    });
  });
}




////////// 실행부 //////////
startGame();