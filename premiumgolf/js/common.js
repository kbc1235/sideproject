new Swiper(".swiper", {
  autoplay: {
    autoplay: true,
    delay: 3000,
  },
  pagination: {
    el: ".swiper-pagination",
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const tabs = document.querySelectorAll(".tab");
tabs.forEach((element) => initTabs(element.id));

/**
 * `initTabs` 함수는 웹 페이지의 탭 기능을 초기화하는 역할을 합니다.
 * 이 함수는 `tabSetId`라는 문자열 타입의 매개변수를 받아서, 해당 ID를 가진 탭 세트를 초기화합니다.
 *
 * 함수는 먼저 `tabSetId`를 이용해 탭 세트를 선택하고, 그 안에 있는 모든 탭 버튼을 선택합니다.
 * 그 다음, `changeTab`이라는 내부 함수를 정의합니다. 이 함수는 특정 탭의 ID를 인자로 받아 해당 탭을 활성화하고, 나머지 탭들은 비활성화합니다.
 *
 * `changeTab` 함수는 먼저 탭 세트 내의 모든 탭 콘텐츠를 선택하고, 그들의 'active' 클래스를 제거함으로써 모든 탭 콘텐츠를 숨깁니다.
 * 그 다음, 모든 탭 버튼의 'active' 클래스를 제거하여 모든 탭 버튼을 비활성화합니다.
 *
 * 그 후, 선택한 탭의 콘텐츠와 버튼을 선택하고, 만약 그들이 존재한다면 'active' 클래스를 추가하여 선택한 탭의 콘텐츠와 버튼을 활성화합니다.
 *
 * 마지막으로, 각 탭 버튼에 클릭 이벤트 리스너를 추가합니다. 이 리스너는 버튼이 클릭될 때마다 해당 버튼의 'data-tab' 속성 값을 가져와 `changeTab` 함수를 호출하게 됩니다.
 * 이렇게 함으로써 사용자가 특정 탭 버튼을 클릭하면 해당 탭이 활성화되는 기능을 구현하였습니다.
 *
 * @param {string} tabSetId - 초기화할 탭 세트의 ID. 이 ID는 웹 페이지 내에서 유일해야 합니다.
 */
function initTabs(tabSetId) {
  const tabSet = document.querySelector(`#${tabSetId}`);
  const tabButtons = tabSet.querySelectorAll(".tab-btn");
  // 초기 활성 탭 버튼
  function changeTab(tabId) {
    // 모든 콘텐츠 숨기기
    const tabContents = tabSet.querySelectorAll(".cont > div");
    tabContents.forEach((content) => {
      content.classList.remove("active");
    });

    // 클릭된 탭 버튼을 활성화
    tabButtons.forEach((button) => {
      button.classList.remove("active");
    });

    // 선택한 탭 콘텐츠 활성화
    const selectedTabContent = tabSet.querySelector(
      `.cont div[data-tab="${tabId}"]`
    );
    // 선택한 탭 버튼을 활성화
    const selectedTabButton = tabSet.querySelector(
      `.tab-btn[data-tab="${tabId}"]`
    );

    // 선택한 탭 콘텐츠와 탭 버튼이 존재하면 활성화
    if (selectedTabContent && selectedTabButton) {
      selectedTabContent.classList.add("active");
      selectedTabButton.classList.add("active");
    }
  }

  // 각 탭 버튼에 이벤트 리스너 추가
  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");
      changeTab(tabId);
    });
  });
}
