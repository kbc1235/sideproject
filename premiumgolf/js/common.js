const swiper = new Swiper(".swiper", {
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

function initTabs(tabSetId) {
  const tabSet = document.querySelector(`#${tabSetId}`);
  const tabButtons = tabSet.querySelectorAll(".tab-btn");
  function changeTab(tabId) {
    // 모든 콘텐츠 숨기기
    const tabContents = tabSet.querySelectorAll(".cont > div");
    tabContents.forEach((content) => {
      // console.log("content", content);
      content.classList.remove("active");
    });

    // 클릭된 탭 버튼을 활성화
    tabButtons.forEach((button) => {
      button.classList.remove("active");
    });

    // 선택한 탭 콘텐츠를 보이게 하고 해당 탭 버튼을 활성화
    const selectedTabContent = tabSet.querySelector(
      `.cont div[data-tab="${tabId}"]`
    );
    const selectedTabButton = tabSet.querySelector(
      `.tab-btn[data-tab="${tabId}"]`
    );
    console.log("selectedTabContent", selectedTabContent);
    console.log("selectedTabButton", selectedTabButton);
    if (selectedTabContent && selectedTabButton) {
      console.log("selectedTabContent", selectedTabContent);
      console.log("selectedTabButton", selectedTabButton);
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
