window.addEventListener("DOMContentLoaded", () => {
    const tabsBlock = document.querySelector('.tabs');
    if (tabsBlock) {
        const tabs = document.querySelectorAll('.tabs__tab[role="tab"]');
        const tabList = document.querySelector('.tabs__list[role="tablist"]');
        const currentTab = tabList.querySelector('.tabs__tab[aria-selected="true"]');
        const scrollNavBtns = tabList.querySelectorAll('.tabs__nav');
        const scrollNavBtnsObj = {};

        // Add UI classes
        updateTabUI(currentTab);

        // Add a click event handler to each tab
        tabs.forEach(tab => {
            tab.addEventListener("click", changeTabs);
        });

        // Enable arrow navigation between tabs in the tab list
        let tabFocus = 0;

        // Event Listeners
        tabList.addEventListener("keydown", e => {
            // Move right
            if (e.keyCode === 39 || e.keyCode === 37) {
                tabs[tabFocus].setAttribute("tabindex", -1);
                if (e.keyCode === 39) {
                    tabFocus++;
                    // If we're at the end, go to the start
                    if (tabFocus >= tabs.length) {
                        tabFocus = 0;
                    }
                // Move left
                } else if (e.keyCode === 37) {
                    tabFocus--;
                    // If we're at the start, move to the end
                    if (tabFocus < 0) {
                        tabFocus = tabs.length - 1;
                    }
                }

                tabs[tabFocus].setAttribute("tabindex", 0);
                tabs[tabFocus].focus();
            }
        });

        if (tabList.scrollWidth > tabList.offsetWidth) {
            scrollNavBtns.forEach(btn => {
                scrollNavBtnsObj[`${btn.dataset.action}`] = btn;
            });
            updateTabScrollNavBtnUI(tabsBlock, tabList, scrollNavBtnsObj);
            scrollNavBtns.forEach(btn => {
                btn.addEventListener("click", (e) => {
                    scrollTabs(e, tabsBlock, tabList);
                });
            });
        }

        tabList.addEventListener("scroll", (e) => {
            updateTabScrollNavBtnUI(tabsBlock, e.target, scrollNavBtnsObj);
        });
    }
});

const changeTabs = (e) => {
    const target = e.target;
    const parent = target.parentNode;
    const grandparent = parent.parentNode.parentNode;
    const tabsBlock = document.querySelector('.tabs');
  
    // Remove all current selected tabs
    parent
      .querySelectorAll('.tabs__tab[aria-selected="true"]')
      .forEach(t => t.setAttribute("aria-selected", false));
  
    // Set this tab as selected
    target.setAttribute("aria-selected", true);
    // Add UI classes to previous and next tabs
    updateTabUI(target);

    // Hide all titles
    grandparent
      .querySelectorAll('.tabs__title')
      .forEach(t => t.setAttribute("hidden", true));
  
    // Hide all tab panels
    tabsBlock
      .querySelectorAll('.tabs__panel[role="tabpanel"]')
      .forEach(p => p.setAttribute("hidden", true));
  
    // Show title
    grandparent.parentNode
      .querySelector(`#${target.dataset.title}`)
      .removeAttribute("hidden");

    // Show the selected panel
    grandparent.parentNode
      .querySelector(`#${target.getAttribute("aria-controls")}`)
      .removeAttribute("hidden");
}

const updateTabUI = (currentTab) => {
    removeTabUIClasses();
    if (currentTab.previousElementSibling.getAttribute('role') === 'tab') {
        currentTab.previousElementSibling.classList.add("tabs__tab--prev");
    }
    if (currentTab.nextElementSibling.getAttribute('role') === 'tab') {
        currentTab.nextElementSibling.classList.add("tabs__tab--next");
    }
}

const removeTabUIClasses = () => {
    const prevTab = document.querySelector(".tabs__tab--prev");
    const nextTab = document.querySelector(".tabs__tab--next");
    if (prevTab) {
        prevTab.classList.remove("tabs__tab--prev");
    }
    if (nextTab) {
        nextTab.classList.remove("tabs__tab--next");
    }
}

const scrollTabs = (e, tabsBlock, tabList) => {
    const scrollNavBtn = e.target;
    const action = scrollNavBtn.dataset.action;
    const scrollAmount = parseInt(getComputedStyle(tabsBlock).getPropertyValue("--scroll-amount"));
    const scrollDirection = (action === 'prev') ? -scrollAmount : scrollAmount;
    // console.log(document.querySelector('#tab-4').getBoundingClientRect().left);
    // console.log(tabList.offsetWidth);
    tabList.scrollLeft += scrollDirection;
}

const updateTabScrollNavBtnUI = (tabsBlock, tabList, scrollNavBtns) => {
    const scrollNavBtnTrigger = getComputedStyle(tabsBlock).getPropertyValue("--scroll-nav-btn-trigger");
    if (tabList.scrollLeft > scrollNavBtnTrigger) {
        scrollNavBtns.prev.classList.add('show');
    } else if (tabList.scrollLeft === 0) {
        scrollNavBtns.prev.classList.remove('show');
    }
    if (tabList.scrollLeft < (tabList.scrollWidth - tabList.offsetWidth - scrollNavBtnTrigger)) {
        scrollNavBtns.next.classList.add('show');
    } else if (tabList.scrollLeft === (tabList.scrollWidth - tabList.offsetWidth)) {
        scrollNavBtns.next.classList.remove('show');
    }
}