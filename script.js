'use strict';
console.log('rabotaet');
// const { url } = require("inspector");


//табы=========================== 
document.addEventListener('DOMContentLoaded', () => {
  let tabsParent = document.querySelector('.tabheader__items'),
    tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent');


    // //test btn href
    // const href = document.getElementById('href');
    // href.addEventListener('click', (e)=>{
    // console.log('dss');
    // window.location.href='https://www.google.com';
    // });

    // function ggg(){
    //   window.location('https://www.google.com');
    // }
    //=====
  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
    });
    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    tabs[i].classList.add('tabheader__item_active', 'fade');
    tabsContent[i].classList.remove('hide');
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
  //Модальное окно============================================
  let dataModal = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    modalClose = document.querySelectorAll('.modal__close');

  function ModalClose() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  function OpenModal() {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    clearInterval(ModalTimerId);
  }

  dataModal.forEach(btn => {
    btn.addEventListener('click', OpenModal);
  });


  // modalClose.forEach(element => {
  //   element.addEventListener('click', ModalClose);
  // });

  document.addEventListener('keydown', (e) => {
    if (e.code == "Escape" && modal.classList.contains('show')) {
      modal.classList.remove('show');
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      ModalClose();
    }

  });

  function ShowModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      OpenModal();
      removeEventListener('scroll', ShowModalByScroll);
    }
  }

  const ModalTimerId = setTimeout(OpenModal, 50000);
  window.addEventListener('scroll', ShowModalByScroll);
  //Thanks modal==========



  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');

    OpenModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content"> 
            <div class="modal__close" data-close>&times;</div>
            <div class="modal__title">${message}</div> 
        </div>
        `;

    document.querySelector('.modal').append(thanksModal);

    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      modalClose();
    }, 4000);

  }






  //КЛасы для карточек==============================================================  

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAN();
    }

    changeToUAN() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');
      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);

      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
  
            <img src=${this.src} alt= ${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}"</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
      
          `;
      this.parent.append(element);
    }


  }

  const getResource = async (url, data) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };

  getResource('  http://localhost:3000/menu')
    .then(data => {
      data.forEach(({
        img,
        altimg,
        title,
        descr,
        price
      }) => {
        new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
      });
    });

  // new MenuCard(
  //   'img/tabs/vegy.jpg',
  //   'vegy',
  //   'Меню "Фитнес',
  //   'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  //   9,
  //   '.menu .container',


  // ).render();

  // new MenuCard(
  //   'img/tabs/elite.jpg',
  //   'elite',
  //   'Меню “Премиум',
  //   'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
  //   14,
  //   '.menu .container'

  // ).render();

  // new MenuCard(
  //   'img/tabs/post.jpg',
  //   'post',
  //   'Меню "Постное',
  //   'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
  //   21,
  //   '.menu .container'

  // ).render();


  //FOrms==============================================================  

  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'spinner.svg',
    success: "Спасибо! Скоро мы с вами свяжемся!",
    failru: "Что-то пошло не так..."
  };



  forms.forEach(item => {
    bindPostData(item);
  });

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: data
    });
    return await res.json();
  };


  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('img');

      statusMessage.classList.add('lds-roller');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
          display: block;
          margin: 0 auto;
        `;

      form.insertAdjacentElement('afterend', statusMessage);



      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', json)
        .then(data => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        }).catch(() => {
          showThanksModal(message.failru);
        }).finally(() => {
          form.reset();
        });

    });
  }


  // fetch('http://localhost:3000/requests')
  //   .then( data => data.json())
  //   .then( res => console.log(res));




  //слайдер простой вариант



  let slides = document.querySelectorAll('.offer__slide'),
    slider = document.querySelector('.offer__slider'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesField = document.querySelector('.offer__slider-inner'),
    width = window.getComputedStyle(slidesWrapper).width;

  let slideInedex = 1;
  let offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideInedex}`;
  } else {
    total.textContent = `${slides.length}`;
    current.textContent = slideInedex;
  }

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(slides => {
    slides.style.width = width;
  });

  next.addEventListener('click', () => {
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideInedex == slides.length) {
      slideInedex = 1;
    } else {
      slideInedex++;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideInedex}`;
    } else {
      current.textContent = slideInedex;
    }

    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideInedex - 1].style.opacity = 1;
  });

  prev.addEventListener('click', () => {
    if (offset == 0) {

      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideInedex == 1) {
      slideInedex = slides.length;
    } else {
      slideInedex--;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideInedex}`;
    } else {
      current.textContent = slideInedex;
    }

    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideInedex - 1].style.opacity = 1;

  });

  // навигация для сладйов

  slider.style.position = 'relative';
  const indicators = document.createElement('ol'),
    dots = [];
  indicators.classList.add('carousel-indicators'),

    indicators.style.cssText = `
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 15;
      display: flex;
      justify-content: center;
      margin-right: 15%;
      margin-left: 15%;
      list-style: none;
    `;

  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
      `;

    if (i == 0) {
      dot.style.opacity = 1;
    }

    indicators.append(dot);
    dots.push(dot);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');
      // console.log(slideTo);

      slideInedex = slideTo;

      offset = +width.slice(0, width.length - 2) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;


      if (slides.length < 10) {
        current.textContent = `0${slideInedex}`;
      } else {
        current.textContent = slideInedex;
      }

      dots.forEach(dot => dot.style.opacity = '.5');
      dots[slideInedex - 1].style.opacity = 1;

    });
  });

  //калькулятор 

  const result = document.querySelector('.calculating__result span');
   
   let sex, height, weight, age, ratio;

   if(localStorage.getItem('sex')){
    sex = localStorage.getItem('sex');
   } else {
     sex = 'female';
     localStorage.setItem('sex', 'female');
   }

   if(localStorage.getItem('ratio')){
    ratio = localStorage.getItem('ratio');
   } else {
     ratio = '1.375';
     localStorage.setItem('ratio', '1.375');
   }

   function initLocalSettings(selector,activeClass){
     const elements = document.querySelectorAll(selector);

     elements.forEach(elem=>{
      elem.classList.remove(activeClass);
      if(elem.getAttribute('id') === localStorage.getItem('sex')){
        elem.classList.add(activeClass);
      }

      if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
        elem.classList.add(activeClass);
      }
     });

    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '____';  
      return;
    }
    if (sex === 'female') {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
  }

  calcTotal();

  function getStaticInformation(Selector, activeClass) {
    const elements = document.querySelectorAll(Selector);

    elements.forEach(elem => {
      elem.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', e.target.getAttribute('id'));
        }

        elements.forEach(elem => {
          elem.classList.remove(activeClass);
        });

        e.target.classList.add(activeClass);
        console.log(sex, ratio);
        calcTotal();
      });
    });
  }

  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {

      if (input.value.match(/\D/g)){
        input.style.border = '1px solid red';
        input.style.background = 'rgb(196, 73, 68, 0.5)';
         
      } else {
        input.style.border = '';
        input.style.background = '';
      }

      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }
      calcTotal();
    });
     

  }

  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');

 


  // let slideInedex = 1;

  // showSlides(slideInedex);

  // if (slides.length < 10){
  //   total.textContent = `0${slides.length}`;
  // } else {
  //   total.textContent = `${slides.length}`;
  // }
  // function showSlides(n) {
  //   if (n > slides.length) {
  //     slideInedex = 1;
  //   }

  //   if (n < 1) {
  //     slideInedex = slides.length;
  //   }        
  //   slides.forEach(item => item.style.display = 'none');
  //   slides[slideInedex - 1].style.display = 'block';

  //   if (slides.length < 10){
  //     current.textContent = `0${slideInedex}`;
  //   } else {
  //     current.textContent = `${slideInedex}`;
  //   }

  // }

  // function plusSlides(n){
  //   showSlides(slideInedex += n);
  // }

  // prev.addEventListener('click', () => {
  //   plusSlides(-1);
  // });


  // next.addEventListener('click', () => {
  //   plusSlides(+1);
  // });
});