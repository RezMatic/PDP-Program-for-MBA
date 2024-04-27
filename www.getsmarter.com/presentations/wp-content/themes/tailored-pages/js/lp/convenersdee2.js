const convenerBlock = document.querySelectorAll('.convener-block');
const convenerCloseBtn = document.querySelectorAll('.close');
for(var i = 0; i < convenerBlock.length; i++ ) {
    convenerBlock[i].addEventListener('click', function () {

        var blockName = this.getAttribute('id');
        var contentBlock = document.getElementById(blockName+'-content');
        var contentBlocks = document.querySelectorAll('.content');
        for(var contentIndex = 0; contentIndex < contentBlocks.length; contentIndex++) {
            contentBlocks[contentIndex].style.display = "none";
            removeActiveState(contentIndex);
        }

        contentBlock.style.display = "block";

        this.classList.add("convener-active-state");
    });

    convenerCloseBtn[i].addEventListener('click', function (e) {
        this.parentElement.style.display = "none";
        for(var i = 0; i < convenerBlock.length;i++) {
            removeActiveState(i);
        }
        
    });

}

function removeActiveState(index) {
    convenerBlock[index].classList.remove("convener-active-state");
}