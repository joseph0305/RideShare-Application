// var socket = io();
// var socketId = "";
// var username = "";
// var onlineUsers;
// // host -> 현재 창의 주소를 담고 있는 변수.
// // 이거 다시 회복
// var host = window.location.protocol + "//" + window.location.host;
// sendAjax(host + '/main/data', "GET", function(Data){
//     Makehtml(Data, function(){
//       swipe();
//     });
// });  

// // host -> 현재 창의 주소를 담고 있는 변수.
// var host = window.location.protocol + "//" + window.location.host;
// sendAjax(host + '/profile/user', "POST", function(data){
//     username = data[0].name;
//     socketId = socket.id;
//     socket.emit('connect user', {id: data[0].stID, name: data[0].name}, function(res) {
//         console.log('socket emit "connect user"가 성공하였습니다.');
//     });
// });

// socket.on("onlineUsers", function(users) {
//   console.log("onlineUsers의 목록 :", users);
//   onlineUsers = users;
// });

// socket.on("alarm", function(data) {
//   console.log('alarm: ', data);
// })



// // 이거 다시 회복

// var SavedGetData; 
// function sendAjax(url, method, call) {
// 	const xhr = new XMLHttpRequest();
// 	xhr.open(method, url);

// 	var data = null;
//     xhr.send(data);

//     xhr.addEventListener('load', function(){
//         const result = JSON.parse(xhr.responseText);
// 		console.log("Getting data success!", result);
// 		call(result);
//     });
// };

// 토글 버튼 클릭시 서버로 데이터 전송
//https://ourcstory.tistory.com/161 블로그 주소

/* let params = {Test1: "data1",Test2:"data2"};
$("#Serch")
$.ajax({ 
    url:"/main/toggle", 
         type:"POST", data:JSON.stringify(params), 
         contentType: "application/json", 
         success: function(result) {
              if (result) 
              { console.log("저장되었습니다."); } 
              else { console.log("잠시 후에 시도해주세요."); } 
            }, 
            error: function() { console.log("에러 발생"); } 
        }) */


// 이거 다시 지움

let SavedGetData = JSON.parse(localStorage.getItem("Datas"));
/* 받아온 Data 불러오기 (localstorage) */
if (SavedGetData!==null){
    Makehtml(SavedGetData);
}
 

// main list html 만들기 1
function Makehtml(Data_obj, callback){
    Data_short = [];
    Data_long = [];
    Data_obj.forEach(function(item) {
        if (item.Repeat_ornot === "long"){
            Data_long.push(item)
        } else{
            Data_short.push(item)
        }
    });

    let Short_list = document.querySelector('#short-List-part');
    let Long_list = document.querySelector('#long-List-part');

    Short_list.innerHTML = Data_short.map((item) => createHTML(item)).join('')
    Long_list.innerHTML = Data_long.map((item) => createHTML(item)).join('')

    
    
    let arrow = document.querySelectorAll('.Arrow');   
    
   // Arrow 클릭시 AJAX함수 실행
    arrow.forEach(function(item) {
      /* item.addEventListener("click",deleteList );  */
      item.addEventListener("click",next );  //서버's 코드
    });

    // toggle 버튼 클릭시 AJAX함수 실행
   
    let toggle_bt = document.querySelectorAll(".ON_OFF input");
    toggle_bt.forEach(function(item){
    item.addEventListener("click", CheckToggle)
    });

    // 삭제 버튼 클릭시 AJAX함수 실행
    let remove = document.querySelectorAll('.deleteBT'); 
    remove.forEach(function(item) {
        item.addEventListener("click",removeAjax );  
      });

    // 수정 버튼 클릭시 AJAX 함수 실행
    let revise = document.querySelectorAll('.reviseBT'); 
    console.log("수정!!",revise)
    revise.forEach(function(item) {
        item.addEventListener("click",reviseAjax );  
      });
    
    // callback();
}

// main list html 만들기 2
function createHTML(item){
  
     let LI_ID = item.li_id;
     /* let LABEL_ID = item.label_id; */
     let LABEL_ID = "Label" + String(item.li_id) 
     let S_TEXT = item.Location_start;
     let E_TEXT = item.Location_end;
     let TIME_TEXT = item.Start_time;
     let DATE = item.Start_date;
     let WEEk = item.Repeat_ornot;
     let DAorWE =''
     if (WEEk === "long"){
      DAorWE = DATE;
     } else{
      DAorWE = WEEk;
     }
     let TO_TF_SEVER = item.label_onoff;
     if (TO_TF_SEVER===1){
         TO_TF = "checked"
     } else{
         TO_TF = ""
     }
        return`
        <div id="${LI_ID}" class="test-wrapper">
          <ul id="test" class="list">
            <li class="list__item">
              <div class="list__item-text">
                <li  class="swiper-slide" >
                    <div class="L_Text">
                        <div class="L_Top_Text"><span>${S_TEXT}</span><i class="fas fa-arrow-right"></i><span >${E_TEXT}</span></div>
                        <div class="L_bottom_Text"><span class="Time">${TIME_TEXT}</span><span class="DATEorWEEK">${DAorWE}</span></div>
                    </div>
                    <div class="bu_arrow_wrap">
                    <div class="ON_OFF">
                        <input class="tgl tgl-ios" id="${LABEL_ID}" type="checkbox" ${TO_TF}/>
                        <label class="tgl-btn" for="${LABEL_ID}"></label>
                    </div>
                    <div class="Arrow">
                        <i class="fas fa-chevron-right"></i>
                    </div>
                     </div>
                     <div class="list__item-action">
                       <span class="deleteBT" >삭제</span>
                       <span class="reviseBT">수정</span>
                     </div>
                    
                    </li>
              </div>
            </li>
        </ul>
      </div>
    `;
 }





// toggle 버튼 눌렀을때 AJAX함수: 
function CheckToggle(event){
   let List_tog = event.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement;
    console.log(List_tog,"pick");
   let LIST_ID_to = List_tog.id;
   let toggle_bt_ID = event.currentTarget.id;
   let toggle_TF = event.currentTarget.checked;
   console.log("ForEach-LI_ID:",LIST_ID_to);
   console.log("ForEach-toggle_ID:",toggle_bt_ID);
   console.log("ForEach-toggle_TF:",toggle_TF);
   TO_DATA = {li_id:LIST_ID_to,
            label_onoff:toggle_TF}
   $.ajax({ 
    url:"/main/toggle", 
         type:"POST", data:JSON.stringify(TO_DATA), 
         contentType: "application/json", 
         success: function(result) {
              if (result) 
              { console.log("저장되었습니다."); } 
              else { console.log("잠시 후에 시도해주세요."); } 
            }, 
            error: function() { console.log("에러 발생"); } 
        })
 };
 // Arrow 눌렀을때 AJAX함수: 서버에게 lI_id 전송 
function next(event){
    let li_pick = event.currentTarget.parentElement.parentElement.parentElement.parentElement;
    console.log("LIST_PICK",li_pick.id)
    window.location.href = host + '/ride-share/' + li_pick.id;
    // $.ajax({ 
    //     url:"/main/toggle", 
    //          type:"POST", data:JSON.stringify(LI_ID_ARROW_JOSON), 
    //          contentType: "application/json", 
    //          success: function(result) {
    //               if (result) 
    //               { console.log("저장되었습니다."); } 
    //               else { console.log("전달실패"); } 
    //             }, 
    //             error: function() { console.log("에러 발생"); } 
    //         })

}
// 삭제 버튼 눌렀을때 AJAX 함수
function removeAjax(event){
    let li_from_de = event.currentTarget.parentElement.parentElement.parentElement.parentElement;
    console.log("delete",li_from_de)
    $.ajax({ 
          url:`/main/${li_from_de.id}`, 
               type:"delete", data:null, 
             
               success: function(result) {
                    if (result) 
                    { console.log("저장되었습니다.",result);
                    li_from_de.style.display = 'none';
                  } 
                    else { console.log("전달실패",result); } 
                  }, 
                  error: function() { console.log("에러 발생"); } 
              })
}
// 수정 버튼 눌렀을때 AJAX함수
function reviseAjax(event){
  let li_from_vi = event.currentTarget.parentElement.parentElement.parentElement.parentElement;
  let WeekorDate = event.currentTarget.parentElement.parentElement.children[0].children[1].children[1].innerText //.nextElementSibling; //.children;//.nextElementSibling.nextElementSibling.children.nextElementSibling.children;
  let pickyear = WeekorDate.substring(WeekorDate.length-4,WeekorDate.length)
  console.log(WeekorDate.substring(WeekorDate.length-4,WeekorDate.length),"하자!")
  console.log("update",li_from_vi)
  var now = new Date();
  var year = now.getFullYear();
  if(pickyear==year){
    console.log("This the long");
  } else{
    console.log("this is short")
  }
  $.ajax({ 
        url:`/main/${li_from_vi.id}`, 
             type:"update", data:null, 
           
             success: function(result) {
                  if (result) 
                  { console.log("저장되었습니다.",result); 
                  // result 로 가져와서 if쓰기
                  if(WeekorDate===year){
                    console.log("This the long");
                  } else{
                    console.log("this is short")
                  }
                  /* window.location.href = '/main/MS_input' */
                  // window.locatino.href = '/main/ML_input'
                } 
                  else { console.log("전달실패",result); } 
                }, 
                error: function() { console.log("에러 발생"); } 
            })

}

 // list 삭제하기

 function deleteList(event){
    /* let li2 = event.target.parentElement; */
    let li2 = event.currentTarget.parentElement.parentElement;
    console.log(li2,"li2")
    console.log("remove")
    SavedGetData = SavedGetData.filter((List)=>List.li_id !== parseInt(li2.id));

    li2.remove();
    saveDATA();
}

// Data를 loclastorage에 저장하기
function saveDATA(){
    
    localStorage.setItem("Datas",JSON.stringify(SavedGetData));
}


// button plus controls

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
      direction: 'top',
      hoverEnabled: false
    });
  });







// 스와이프 코드
// 서버 용
/* console.log($('#test li'),"swipe")
function swipe(){
  $(function () {
      $('#test li').swipe({
        swipeStatus: function (event, phase, direction, distance, duration, fingers, fingerData, currentDirection) {
          if (direction === 'right') {
            if (!$(this).hasClass('active')) {console.log("active true"); return;}  //.hasClass() 메서드는 선택한 요소에 클래스가 있는지 확인합니다. 리턴값:불린

            $(this)
              .stop(true)
              .css({
                transition: 'all .1s ease-out',
                transform: `translate3d(-${200 - distance}px, 0px, 0px)`,
              });

            if ((phase === 'cancel' || phase === 'end') && distance >= 200) {
              console.log("cancel or end dis>=200")
              $(this).stop(true).css({
                  transform: `translate3d(0px, 0px, 0px)`,
                  
                })
                .removeClass('active');

              setTimeout(() => {
                $(this).stop(true).css({
                  transition: 'all 0s ease-out',
                });
              }, 300);
            } else if ((phase === 'cancel' || phase === 'end') && distance < 200) {
              $(this).stop(true).css({
                transition: 'all .1s ease-out',
                transform: `translate3d(-200px, 0px, 0px)`,
              });
            }
          } else if (direction === 'left') {
            if ($(this).hasClass('active')) {console.log("left: active=true/return:0"); return;}
            else {
              console.log("left,active=false/translate3d(-${distance}px ")
              $(this)
                .stop(true)
                .css({
                  transition: 'all 0s ease-out',
                  transform: `translate3d(-${distance}px, 0px, 0px)`,
                });
            }

            if (phase === 'cancel' && distance < 200) {
              console.log("cancel && distance < 200/3d  000")
              $(this).stop(true).css({
                transition: 'all .1s ease-out',
              });

              setTimeout(() => {
                $(this).stop(true).css({
                  transform: `translate3d(0px, 0px, 0px)`,
                });
              }, 0);
            } else if ((phase === 'cancel' || phase === 'end') && distance >= 200) {
              console.log("cancel,end && distance >= 200/tran3d -200")
              $(this).addClass('active');
              $(this).stop(true).css({
                transition: 'all .1s ease-out',
                transform: `translate3d(-200px, 0px, 0px)`,
              });
            }
          }
        },
        threshold: 200,
      });
    });
  } */
  // local 용
     $(function () {
        $('#test li').swipe({
          swipeStatus: function (event, phase, direction, distance, duration, fingers, fingerData, currentDirection) {
            if (direction === 'right') {
              if (!$(this).hasClass('active')) {console.log("active true"); return;}  //.hasClass() 메서드는 선택한 요소에 클래스가 있는지 확인합니다. 리턴값:불린
  
              $(this)
                .stop(true)
                .css({
                  transition: 'all .1s ease-out',
                  transform: `translate3d(-${200 - distance}px, 0px, 0px)`,
                });
  
              if ((phase === 'cancel' || phase === 'end') && distance >= 200) {
                console.log("cancel or end dis>=200")
                $(this).stop(true).css({
                    transform: `translate3d(0px, 0px, 0px)`,
                    
                  })
                  .removeClass('active');
  
                setTimeout(() => {
                  $(this).stop(true).css({
                    transition: 'all 0s ease-out',
                  });
                }, 300);
              } else if ((phase === 'cancel' || phase === 'end') && distance < 200) {
                $(this).stop(true).css({
                  transition: 'all .1s ease-out',
                  transform: `translate3d(-200px, 0px, 0px)`,
                });
              }
            } else if (direction === 'left') {
              if ($(this).hasClass('active')) {console.log("left: active=true/return:0"); return;}
              else {
                console.log("left,active=false/translate3d(-${distance}px ")
                $(this)
                  .stop(true)
                  .css({
                    transition: 'all 0s ease-out',
                    transform: `translate3d(-${distance}px, 0px, 0px)`,
                  });
              }
  
              if (phase === 'cancel' && distance < 200) {
                console.log("cancel && distance < 200/3d  000")
                $(this).stop(true).css({
                  transition: 'all .1s ease-out',
                });
  
                setTimeout(() => {
                  $(this).stop(true).css({
                    transform: `translate3d(0px, 0px, 0px)`,
                  });
                }, 0);
              } else if ((phase === 'cancel' || phase === 'end') && distance >= 200) {
                console.log("cancel,end && distance >= 200/tran3d -200")
                $(this).addClass('active');
                $(this).stop(true).css({
                  transition: 'all .1s ease-out',
                  transform: `translate3d(-200px, 0px, 0px)`,
                });
              }
            }
          },
          threshold: 200,
        });
      }); 
    
  

// sidebar materilize 시작
  $(document).ready(function(){
    $('.sidenav').sidenav();
  });

  // modal 창(materilize) 시작
  $(document).ready(function(){
    $('.modal').modal();
  });

   // tab 메뉴
   $(document).ready(function(){
    $('.tabs').tabs(
      /*   {
            swipeable: 'true',
        } */
    );
  });
          


  ///////////////////////////////////////////
  ///////////채팅 방 코드/////////////////////

//   let SavedGetData = JSON.parse(localStorage.getItem("Datas"));

// if (SavedGetData!==null){
//     Makehtml(SavedGetData);
// }


// Makehtml -> MakeChat_html
// createHTML -> createChat_html
// SavedGetData -> SavedChatData
var SavedChatData = [{
  name:"신경식",
  Chat_content:"안녕하세요 저는 신경식입니다",
  Chat_time: "10:30 AM" ,
},
{
  name:"김준현",
  Chat_content:"안녕하세요 저는 윗미의 팀장입니다",
  Chat_time: "12:30 PM" ,
},
{
  name:"정예준",
  Chat_content:"안녕하세요 저는 윗미의 요리사 입니다",
  Chat_time: "11:30 AM" ,
}
]
// local 코드
MakeChat_html(SavedChatData);


// 서버 코드
// var host = window.location.protocol + "//" + window.location.host;
// sendAjax(host + '/main/chat_data', "GET", function(Data){
//   MakeChat_html(Data);
// });  

// var SavedChatData; 
// function sendAjax(url, method, call) {
// 	const xhr = new XMLHttpRequest();
// 	xhr.open(method, url);

// 	var data = null;
//     xhr.send(data);

//     xhr.addEventListener('load', function(){
//         const result = JSON.parse(xhr.responseText);
// 		console.log("Getting data success!", result);
// 		call(result);
//     });
// };
function MakeChat_html(ChatData_obj){
  let Chat_screen = document.querySelector(".screen")
 
  console.log(Chat_screen,"Chat_screen")
  Chat_screen.innerHTML = ChatData_obj.map((item) => createChat_html(item)).join('')

  
  let CHarrow = document.querySelectorAll('.findbutton'); 
  CHarrow.forEach(function(item) {
      item.addEventListener("click",ChatArrow );  
    });
}
 
// main list html 만들기 2
function createChat_html(item){
  
  //////// sever code ///////
  // let Chat_ID = item.roomID;
  // let CH_name = item.participants;
  // let CH_con = item.message;
  // let CH_Severtime =  item.time; 
  // let CH_time = CH_Severtime.substring(12,16);
  // let L_START = item.Location_start;
  // let L_END = item.Location_end;
  ////////local data
  let Chat_ID = "2345";
  let CH_name = "신경식";
  let CH_con = "안녕하세요 커피유야 같이갈 사람 구합니다";
  let CH_Severtime =  "12:30"; 
  let CH_time = "12:30";
  let L_START = "한동대";
  let L_END = "커피유야";
     return`
    <div id="CHAT${Chat_ID}" class="user_item_layout"> 
        <img class="circle profile" alt="프로필 이미지" src="https://mblogthumb-phinf.pstatic.net/20150427_261/ninevincent_1430122791768m7oO1_JPEG/kakao_1.jpg?type=w2"/>
        <div class="info"> 
            <div class="align"> 
                <div class="namediv"> 
                        <span class="fatblack nametext" style="font-size: 22px;">${CH_name}</span>
                </div>
                <div> 
                    <div class="smalltext loctext">${L_START} ➔ ${L_END}<br>${CH_time}</div>
                </div>
            </div>
            <div class="messagebox"> 
                <span class="lastmsg">${CH_con}</span>
            </div>
        </div>
            <button class="findbutton">❯</button>
    </div> 
 `;
}


function ChatArrow(event){
  let ChatRoom = event.currentTarget.parentElement;
  let ChatRoom_id = ChatRoom.id.substring(4)

  // console.log("check",'/chat/' + ChatRoom_id)
  // window.location.href = host + '/chat/' + ChatRoom_id
}

