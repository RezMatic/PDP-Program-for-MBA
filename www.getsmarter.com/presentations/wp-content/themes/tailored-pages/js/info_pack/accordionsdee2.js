window.addEventListener("DOMContentLoaded", () => {
    const accordions = document.querySelectorAll('.modules-accordion');

    accordions.forEach(accordion => {
        const buttons = accordion.querySelectorAll('.modules-accordion__item-button');
        // Add click event handler to each button
        buttons.forEach(button => {
            button.addEventListener("click", (e) => {
                closeAllExpandedItems(e);
                toggleAccordionItem(e);
            });
        });
    });
});

// Close all current expanded items
const closeAllExpandedItems = (e) => {
    const target = e.target;
    const currentTabPanel = target.closest('.tabs__panel');
    // Get all expanded items
    const expandedItems = currentTabPanel.querySelectorAll('.modules-accordion__item--expanded');
    if (expandedItems) {
        expandedItems.forEach(item => {
            closeItemBody(item);
        });
    }
}

const toggleAccordionItem = (e) => {
    const target = e.target;
    const accordionItem = target.closest('.modules-accordion__item');
    // Accordion item is NOT expanded
    if (accordionItem.getAttribute("aria-expanded") === "false") {
        openItemBody(accordionItem);
    // Accordion item is expanded
    } else if (accordionItem.getAttribute("aria-expanded") === "true") {
        closeItemBody(accordionItem);
    }
}

// Handle item body opening
const openItemBody = (item) => {
    const itemBody = item.querySelector('.modules-accordion__item-body');
    // Add class with "expanded" styles
    item.classList.add('modules-accordion__item--expanded');
    item.setAttribute("aria-expanded", "true");
    itemBody.classList.add('show');
    itemBody.style.maxHeight = itemBody.scrollHeight + "px";
}

// Handle item body closing
const closeItemBody = (item) => {
    const itemBody = item.querySelector('.modules-accordion__item-body');
    itemBody.style.maxHeight = null;
    // Remove class with "expanded" styles
    item.classList.remove('modules-accordion__item--expanded');
    // Wait for body to contract
    setTimeout(() => {
        item.setAttribute("aria-expanded", "false");
        itemBody.classList.remove('show');
    }, 150);
}