
const updateTable = function () {

    //欠席者リスト作成
    function inq_checked(){
        var elements = document.getElementsByName('yasumi_person') ;
        for(var i = 0 ; i < elements.length ; i ++){
          if(elements[i].checked == true){
            console.log(elements[i].value);
          }
        }
        
    }
    inq_checked();

    //空配列をつくる
    let personAry = []; 

    //ランダム配列をつくる
    const shuffleArray = function () {

        //LAB/DEVクラスのvalueを取得
        const courseName = document.getElementById("courseName").value;
        console.log(courseName);

        //LAB/DEVクラスのvalueで配列内個数変更

        let coursePeoples = 0;
        
        if(courseName=="LAB"){
            coursePeoples = 51;
            console.log("its,LAB");
            console.log(coursePeoples);
        }else if(courseName=="DEV"){
            coursePeoples = 31;
            console.log("its,DEV");
            console.log(coursePeoples);
        }
        
        //個数(51か31)に沿った配列作成
        for (let j = 1; j < coursePeoples; j++) {
            
            personAry.push(j);
            
        }
        //配列内ランダム化
        for(var i = personAry.length - 1; i > 0; i--){
            var r = Math.floor(Math.random() * (i + 1));
            var tmp = personAry[i];
            personAry[i] = personAry[r];
            personAry[r] = tmp;
        }
    };
    shuffleArray();
    console.log(personAry);

    const rendering_table = function () {
        let div = '';
        //変数divを50個分表示させる
        personAry.forEach(function(data, i){
    
            if((i+1) % 6== 0){
                div += `<div class="seat">${data}</div></div>`;
            }else if((i+1) % 6 == 1){
                div += `<div class="table-item text-center"><div class="seat">${data}</div>`;
            }else {
                div += `<div class="seat">${data}</div>`;
            }
            
        })
    
        document.querySelector('#app').innerHTML = div;
    }
    rendering_table();

}


//サウンドをつける
var audioElem;
let bgm1 = "audio/drum.mp3";
let bgm2 = "audio/cymbal.mp3";

function PlaySound(bgm) {
  audioElem = new Audio();
  audioElem.src = bgm;
  audioElem.play();
}
function StopSound(){
  audioElem.pause();
}

const roulette_update = function(){
    PlaySound(bgm1);
    let count = 0;
    timer = setInterval(function() {
        updateTable();
        count += 1;
        console.log(count);
        if(count == 30){
            clearInterval(timer);
            PlaySound(bgm2);
        }
    }, 100);
    
}

//欠席者チェックボックス描画
const rendering_yasumiTable = function () {
    let div_yasumi = '';
    //変数divを50個分表示させる
    for (let i = 1; i < 51; i++) {

        div_yasumi += `
        <label for="yasumi_person">
        <input type="checkbox" name="yasumi_person" id="yasumi_person${i}" class="filled-in" value="${i}">
        <span>${i}</span>
        </label>
        `;
    
    }
        
    document.querySelector('#yasumi').innerHTML = div_yasumi;
}
rendering_yasumiTable();




updateTable();

//スタートボタン押したらルーレット発火
document.querySelector('#start').addEventListener('click',function(){

    roulette_update(bgm1,bgm2);

});



