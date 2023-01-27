const menuBtn = document.querySelector('.menu_btn');
const sideBar = document.querySelector('.side_bar');
const sideClose = document.querySelector('.slide_close');
const dim = document.querySelector('.dim');

function dimIn(){
    setTimeout(()=>{
        dim.style.opacity = 1;
    },300);
}

menuBtn.addEventListener('click',e=>{
    e.preventDefault();
    document.getElementsByTagName('body')[0].classList.add('overflow');
    sideBar.style.left = 0;
    dim.style.display = 'block';
    dimIn();
});

sideClose.addEventListener('click',e=>{
    e.preventDefault();
    document.getElementsByTagName('body')[0].classList.remove('overflow');
    dim.style.opacity = 0;
    dim.style.display = 'none';
    setTimeout(()=>{
        sideBar.style.left = '100%';
    },300);
})

// 분석레포트
const slideUp = document.querySelectorAll('.table_set.slide');
const slideUpButton = document.querySelectorAll('#slideUpButton');

slideUpButton.forEach(function(el){
    el.addEventListener('click', function(){
        slideUp.forEach(function(ev){
            ev.classList.toggle('slide_up')
            dimIn()
        })
    })
})

//라디오 팝업
const alertRadioButton = document.querySelectorAll('.button.white');
const alertRadio = document.querySelectorAll('.radio_alert');
const closeBtn = document.querySelectorAll('.btn.closeBtn');

alertRadioButton.forEach(function(el){
    el.addEventListener('click',function(){
        alertRadio.forEach(function(ev){
            ev.classList.add('on')
        })
    })
})
closeBtn.forEach(function(el){
    el.addEventListener('click', function() {
        alertRadio.forEach(function(ev){
            ev.classList.remove('on')
        })
    })
})



//   아코디언
const btns = document.querySelectorAll(".drop_btn > a");
const panels = document.querySelectorAll('.drop_list');

btns.forEach((btn,index)=>{
    btn.addEventListener('click',e=>{
       for(btn of btns){
           if(btn.classList.contains('active')){
               btn.classList.remove('active');
           }
       }
       for(panel of panels){
        if(panel.classList.contains('active')){
            panel.classList.remove('active');
        }
       }
       btns[index].classList.add('active');
       panels[index].classList.add('active');
    })
})

function count(type)  {
    const resultElement = document.getElementById('result');
    let number = resultElement.innerText;
    if(type === 'plus') {
        number = parseInt(number) + 1;
    }else if(type === 'minus')  {
        if(number <= 0 ){
        return
        } else{
        number = parseInt(number) - 1;
        }
    }
    resultElement.innerText = number;
}

// 옵션 팝업
// const popClose = document.querySelector('.pop_close');
const btnOption = document.querySelectorAll('.btn_option');
const option = document.querySelector('#pop_option');
const alertWraps = document.querySelectorAll('.alert_wrap');

btnOption.forEach(el=>{
    el.addEventListener('click',e=>{
        e.preventDefault();
        document.getElementsByTagName('body')[0].classList.add('overflow');
        option.style.display = 'block';
        dim.style.display = 'block';
        dimIn();
    })
})




// 리스트 헤더
const prdTabs = document.querySelectorAll('.prd_head > ul > li');
prdTabs.forEach((prdTab,index)=>{
    prdTab.addEventListener('click',e=>{
       for(prdTab of prdTabs){
           if(prdTab.classList.contains('on')){
               prdTab.classList.remove('on');
           }
       }
       prdTabs[index].classList.add('on');
    })
})


// 장바구니 상품삭제
const prdDel = document.querySelectorAll('.del_btn');
const prdList = document.querySelectorAll('.basket_list > .list > li');
prdDel.forEach((btn,index)=>{
    btn.addEventListener('click',()=>{
     prdList[index].remove();
    })
})

function popUpOpen(pop){
 const panel = pop;
 const popUp = document.getElementById(panel);
 dim.style.display='block';
 dimIn();
 popUp.style.display="block"; 
}


function popClose(pop){
    const panel = pop;
    const popUp = document.getElementById(panel);
    document.getElementsByTagName('body')[0].classList.remove('overflow');
    dim.style.opacity = 0;
    dim.style.display = 'none';
    popUp.style.display="none";
}

function valueUp(el,valueEl){
    let step =parseInt(el.getAttribute('step'));
    let rangeValu = parseInt(valueEl.innerHTML);
    let max = parseInt(el.getAttribute('max'));
    console.log(max)
    if(rangeValu<=max){
      rangeValu+=step;
      valueEl.innerHTML= rangeValu;
      el.value = rangeValu
    }
}


function valueDown(el,valueEl){
    let step = parseInt(el.getAttribute('step'));
    let rangeValu = parseInt(valueEl.innerHTML);
    let min = parseInt(el.getAttribute('min'));
    console.log(min)
    rangeValu-=step;
    if(rangeValu>=min){
      valueEl.innerHTML= rangeValu;
      el.value = rangeValu
    }
}


const toggle = document.querySelectorAll('.drop_btn2 a');
const panels2 = document.querySelectorAll('.drop_list.type2');


toggle.forEach((el,index)=>{
    el.addEventListener('click',(e)=>{
        e.preventDefault();
        e.currentTarget.classList.toggle('active');
        if(el.classList.contains('active')){
            panels2[index].classList.add('active');
        }else{
            panels2[index].classList.remove('active');

        }
    })
})