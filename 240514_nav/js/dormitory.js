//초기 설정에 필요한 모든 데이터: 세탁기, 시간, 호실
let allData;
//미리 정해진 요일별 예약 데이터
let weeklyReservations;
// 사용자가 새롭게 지금 입력하는 예약 정보
let newReservation;
// 사용자가 예약한 정보들의 덩어리
let reservations;


// selection-item 요소들 가져오자
const selectionItemDivs = document.getElementsByClassName("selection-item");

// 네 개의 페이지 요소 가져오자.
const calendarDiv = document.getElementById("calendar");
const selectionWashingmachineTimeDiv = document.getElementById("selection-washingmachine-time");
const washingmachineTimeDiv = document.getElementById("washingmachine");
const timeSelect = document.getElementById("time");
const selectionRoomNameDiv = document.querySelector("#selection-room-name");
const boardDiv = document.querySelector("#board");


// console.log(calendarDiv);
// console.log(selectionWashingmachineTimeDiv);
// console.log(selectionRoomNameDiv);
// console.log(boardDiv);

const pageDivs = [calendarDiv, selectionWashingmachineTimeDiv, selectionRoomNameDiv, boardDiv];
// console.log(pageDivs);


// 초기 데이터 가져오자. allData.json, weekly-reservation.json
const initData = () => {
    const getAllData = () => {
        // 원래는 백엔드 url이 들어가야함
        const url = 'js/allData.json';
        fetch(url)
            .then(response => response.json())
            .then(data => allData = data)
            .catch(error => console.log(error.message));
    }

    const getWeeklyReservation = async () => {
        const url = 'js/weekly-reservation.json';
        try {
            const response = await fetch(url);
            const data = await response.json();
            weeklyReservations = data;
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    }
    getAllData();
    getWeeklyReservation();

    // getWeeklyReservation();
}


// 무조건 1페이지가 아님.
const setPage = (page) => {
    // clear selelction
    for (const selectionItemDiv of selectionItemDivs) {
        selectionItemDiv.classList.remove("select-menu");
    }

    // 세탁기 예약 현황표는 selection이 없음
    if (page != 4) {
        // selection 칠하자
        selectionItemDivs[page - 1].classList.add("select-menu");
    }

    // clear pageDiv
    pageDivs.forEach(pageDiv => {
        pageDiv.style.display = "none";
    });

    // show pageDiv 1
    pageDivs[page - 1].style.display = "block";

    if (page === 2) { // 시간 선택 : 세탁기, 시간
        initWashingmachineTime();

        // let a;
        // // 숫자면 a가 배열 숫자가 아니므로 이게 key
        // a["snack"] = "맵다";
        // a : {"snack" : "맵다"}
        // // 맵다를 가져올 수 있는 방법
        // a.snack
        // a["snack"]


    } else if (page === 3) {  // 호실 이름



    } else if (page === 4) {  // 세탁기 예약 현황표

    }
}

const clickDate = (event) => {
    // 예약정보 초기화하자
    newReservation = {
        "name": undefined,
        "room": undefined,
        "date": undefined,
        "time": undefined,
        "washingmachine": undefined,
        "notification": true
    }
    // 날짜 data 가져오자
    const dateString = event.target.dataset.date;
    const dateDate = new Date(dateString);
    // console.log(dateDate 보는법)
    // 날짜 data 보관하자
    newReservation.date = dateDate;
    // 2페이지로 가자
    setPage(2);

}
initData();
setPage(1)

const initWashingmachineTime = () => {
    let allWashingmachineTime = {};
    // 세탁기 번호 모음
    let washingmachines;


    // 초기 데이터 세팅하자 : {"1" : ["1,", "2", "3"], "2" : ["1,", "2", "3"], "3" : ["1,", "2", "3"]}
    // allData.washingmachine 에서 하나씩 꺼내자
    // awT["1"] = ["1", "2", "3"] => aWT = {"1" : ["1,", "2", "3"]}
    allData.washingmachine.forEach((washingmachine) => {
        allWashingmachineTime[washingmachine] = Object.keys(allData.time);
    });

    // 선택한 날짜의 요일 구하자
    let weekday = newReservation.date.getDay();

    // 그 요일의 미리 예약된 세탁기와 시간 파악


    // 예약된게 있으면 select 목록에서 빼자

    // 그 요일의 밀 예약된 세탁기와 시간이 다 차면, 그 세탁기 select 목록에서 빼자

    // 사용자가 예약한 내용도 위의 것을 다 파악해서 빼자

    // select 를 : 세탁기 번호, 시간들 만들자
    washingmachines.forEach((washingmachine) => {
        // <option value="1">1번 세탁기</option>
        // option 태그 만들자
        const newOption = document.createElement("option");
        // 값 넣자
        newOption.value = washingmachine;
        // 텍스트 넣자
        newOption.textContent = `${washingmachine}번 세탁기`;
        // washingmachineSelect에 저거 넣자
        washingmachineSelect.appendChild(newOption);
    });


    const initTime = () => {
        // 선택한 세탁기 option의 value
        const selectedWashingmachine = washingmachineSelect.value;
        allWashingmachineTime[selectedWashingmachine].forEach((time) => {
            // <option value="1">7시~8시 10분</option>
            const newOption = document.createElement("option");
            newOption.value = time;
            // "2" -> allData.time["2"](8시 10분 ~ 9시 20분). time -> allData.time[time]
            newOption.textContent = time;

            timeSelect.appendChile(newOption);
        });
    }
    initTime();

    console.log(allData.time["2"]);

    // 3page에 세탁기, 시간 넘기자
}

