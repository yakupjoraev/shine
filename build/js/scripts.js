// Custom Scripts
// Custom scripts
// Мобильное меню бургер
function burgerMenu() {
  const burger = document.querySelector('.burger')
  const menu = document.querySelector('.menu__wrapper')
  const body = document.querySelector('body')
  burger.addEventListener('click', () => {
    if (!menu.classList.contains('active')) {
      menu.classList.add('active')
      burger.classList.add('active-burger')
      body.classList.add('locked')
    } else {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })
  //снять классы при клике на элементы меню
  const menuItems = document.querySelectorAll('.menu__item')

  menuItems.forEach(item => {
    item.addEventListener('click', function () {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    })
  });

  // Вот тут мы ставим брейкпоинт навбара
  window.addEventListener('resize', () => {
    if (window.innerWidth > 991.98) {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })
}
burgerMenu()


// Вызываем эту функцию, если нам нужно зафиксировать меню при скролле.
function fixedNav() {
  const nav = document.querySelector('nav')

  // тут указываем в пикселях, сколько нужно проскроллить что бы наше меню стало фиксированным
  const breakpoint = 1
  if (window.scrollY >= breakpoint) {
    nav.classList.add('fixed__nav')
  } else {
    nav.classList.remove('fixed__nav')
  }
}
window.addEventListener('scroll', fixedNav)

function serviceSlider() {
  const container = document.querySelector('.service');

  if (!container) {
    return null
  }
  const swiper = new Swiper(".service__slider", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    effect: "fade",
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
  });

}

serviceSlider();


function worksSlider() {
  const container = document.querySelector('.works');

  if (!container) {
    return null
  }

  const swiper = new Swiper(".works__slider-thumbs", {
    spaceBetween: 10,
    slidesPerView: 'auto',
    // centeredSlides: true,
    // freeMode: true,
    watchSlidesProgress: true,
  });
  const swiper2 = new Swiper(".works__slider", {
    slidesPerView: 'auto',
    spaceBetween: 2,
    thumbs: {
      swiper: swiper,
    },

    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 2,
      },

      768: {
        spaceBetween: 10,
      }
    }
  });
}

worksSlider();

document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.calculation-form');
  if (!container) {
    return null
  }

  const formBlocks = document.querySelectorAll('.calculation-form__block');
  let currentBlockIndex = 0;

  function showBlock(index) {
    formBlocks.forEach((block, idx) => {
      block.classList.toggle('active', idx === index);
    });
  }

  function validateCurrentBlock() {
    const currentBlock = formBlocks[currentBlockIndex];
    const requiredInputs = currentBlock.querySelectorAll('input:required');
    let isValid = true;

    // General validation for required inputs
    requiredInputs.forEach(input => {
      if (input.type === 'radio' || input.type === 'checkbox') {
        const name = input.name;
        const checked = currentBlock.querySelector(`input[name="${name}"]:checked`);
        if (!checked) {
          isValid = false;
        }
      } else if (input.type === 'text' && input.value.trim() === '') {
        isValid = false;
      }
    });

    // Additional validation for the 4th block
    if (currentBlockIndex === 3) {  // Assuming the fourth block is index 3
      const nameInput = currentBlock.querySelector('input[type="text"][placeholder="Ваше имя"]');
      const dateInput = currentBlock.querySelector('.form__datepicker-input');
      const contactInput = currentBlock.querySelector('input[type="text"]:not([placeholder="Ваше имя"])');

      if (!nameInput || nameInput.value.trim() === '') {
        isValid = false;
      }

      if (!dateInput || dateInput.value.trim() === '') {
        isValid = false;
      }

      if (!contactInput || contactInput.value.trim() === '') {
        isValid = false;
      }
    }

    // Toggle the 'active' class on the .form-valid element based on validation result
    const formValidElement = document.querySelector('.form-valid');
    if (formValidElement) {
      formValidElement.classList.toggle('active', !isValid);
    } else {
      console.log('No .form-valid element found in the current block'); // Debug logging
    }

    return isValid;
  }

  function showValidationMessage() {
    const validationMessage = document.createElement('div');
    validationMessage.classList.add('validation-message');
    validationMessage.textContent = 'Пожалуйста, заполните обязательные поля';
    document.body.appendChild(validationMessage);

    setTimeout(() => {
      validationMessage.remove();
    }, 3000);
  }

  // Обработчик для кнопки "Далее"
  document.querySelectorAll('.calculation-form__btn').forEach(button => {
    button.addEventListener('click', function () {
      if (!validateCurrentBlock()) {
        showValidationMessage();
        return;
      }

      if (currentBlockIndex < formBlocks.length - 2) {
        currentBlockIndex++;
        showBlock(currentBlockIndex);
      }
    });
  });

  // Обработчик для кнопки "Назад"
  document.querySelectorAll('.calculation-form__btn-prev').forEach(button => {
    button.addEventListener('click', function () {
      if (currentBlockIndex > 0) {
        currentBlockIndex--;
        showBlock(currentBlockIndex);
      }
    });
  });

  // Обработчик для кнопки "Заказать"
  document.querySelector('.calculation-form__btn[type="submit"]').addEventListener('click', function (e) {
    e.preventDefault();

    if (currentBlockIndex === formBlocks.length - 2) {
      if (!validateCurrentBlock()) {
        showValidationMessage();
        return;
      }

      currentBlockIndex++;
      showBlock(currentBlockIndex);
    }
  });

  // Обработчик для кнопки "Супер!" на блоке "finish"
  document.querySelector('.calculation-form__block[data-calculation-block="finish"] .calculation-form__btn[type="submit"]').addEventListener('click', function (e) {
    e.preventDefault();

    currentBlockIndex = 0;
    showBlock(currentBlockIndex);
  });

  // Изначально показываем первый блок
  showBlock(currentBlockIndex);
});


document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.section-nums');
  if (!container) {
    return null
  }

  const sectionSums = document.querySelectorAll('.section-num');
  const sections = document.querySelectorAll('section');

  // Создаем IntersectionObserver для секций
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const sectionNum = entry.target.dataset.sectionNum;
      const sectionSum = document.querySelector(`.section-num[data-section-num="${sectionNum}"]`);

      // Если секция видима, активируем соответствующий элемент в меню
      if (entry.isIntersecting) {
        sectionSums.forEach(sum => sum.classList.remove('active'));
        if (sectionSum) sectionSum.classList.add('active');
      } else {
        if (sectionSum) sectionSum.classList.remove('active');
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 // Порог видимости (10% секции должно быть видно)
  });

  // Наблюдаем за всеми секциями
  sections.forEach(section => {
    sectionObserver.observe(section);
  });
});

function specialTabs() {
  const container = document.querySelector('.special');

  if (!container) {
    return null
  }

  const tabButtons = document.querySelectorAll('.special__btn');
  const tabContents = document.querySelectorAll('.special__content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-tab-btn');

      // Удаляем класс active у всех кнопок и контента
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Добавляем класс active к выбранной кнопке и соответствующему контенту
      button.classList.add('active');
      document.querySelector(`.special__content[data-tab-content="${target}"]`).classList.add('active');
    });
  });
}

specialTabs();





// Аккордеон
const accordionItems = document.querySelectorAll('[data-accordion-item]');
let openAccordion = null; // переменная для хранения ссылки на открытый аккордеон

function toggleAccordion() {
  if (openAccordion && openAccordion !== this) {
    // Если есть открытый аккордеон, который не совпадает с текущим
    openAccordion.classList.remove('active'); // закрыть его
    const openAccordionContent = openAccordion.nextElementSibling;
    if (openAccordionContent) {
      // если у аккордеона есть содержимое
      openAccordionContent.style.maxHeight = null; // сбросить высоту контента
    }
  }

  this.classList.toggle('active'); // открыть или закрыть текущий аккордеон

  const content = this.nextElementSibling;
  if (content) {
    // если у аккордеона есть содержимое
    if (content.style.maxHeight) {
      // Если контент открыт, закрыть его
      content.style.maxHeight = null;
    } else {
      // Если контент закрыт, открыть его
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }

  openAccordion = this; // запомнить ссылку на открытый аккордеон
}


accordionItems.forEach(item => item.addEventListener('click', toggleAccordion));

customSelect('select');

const datepicker = new Datepicker('#datepicker');
