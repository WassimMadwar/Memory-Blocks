document.querySelector(".btn_Start span").onclick =function () {
    let yName = prompt("what's your Name ?");
    console.log(yName);
    if (yName== null||yName=="") {
        document.querySelector(".Name span").innerHTML = `UnKnown`;
    }
    else{
        document.querySelector(".Name span").innerHTML = yName;
    }
    document.querySelector(".btn_Start").remove();
};

let duartion = 1000;

let BlocksContiner = document.querySelector(".BlocksContiner");

let blocks = Array.from(BlocksContiner.children);

// we used (blocks.length)to bet number of card then spreted then shuffel
//let orderRange = Array.from(Array(blocks.length).keys());
let orderRange = [...Array(blocks.length).keys()];
shuffle_W(orderRange);

blocks.forEach((block,index) =>{
    block.style.order = orderRange[index];
    // 1 - definition Click Event
    block.addEventListener('click',function () {
        // 2 - trigger FlipBlock Fun
        FlipBlock(block);
    });
});


// shuffle Function 
function shuffle_W(arr) {
    let current = arr.length,
        temp,
        Nrandom;
    while (current>0) {
        Nrandom = Math.floor(Math.random()*current);
        current--;
        //swping 
        temp = arr[current];
        arr[current] = arr[Nrandom];
        arr[Nrandom] =temp;
    }
    return arr;
};

//Flip Block
function FlipBlock(SelectedBlock) {
    // add class name as marke
    SelectedBlock.classList.add('IsFlipped');
    let allBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('IsFlipped') );
    if (allBlocks.length === 2) {
        // ignor click
        StopClicking();
        // check matched block
        CheckMatched(allBlocks[0],allBlocks[1]);
    }
};

function StopClicking() {
    BlocksContiner.classList.add('NoClick');
    setTimeout(()=>{
        BlocksContiner.classList.remove('NoClick');
    },duartion);
};

function CheckMatched(FirstB ,SecondB) {
    let TriesEle = document.querySelector(".Tries span")
    if (FirstB.dataset.was === SecondB.dataset.was) {
        document.getElementById('success').play();
        FirstB.classList.remove('IsFlipped');
        SecondB.classList.remove('IsFlipped');
        //
        FirstB.classList.add('Matched');
        SecondB.classList.add('Matched');
    }
    else{
        TriesEle.innerHTML = parseInt(TriesEle.innerHTML) + 1;
        document.getElementById('fail').play();
        setTimeout(()=>{
            FirstB.classList.remove('IsFlipped');
            SecondB.classList.remove('IsFlipped');
        },duartion);
    }
}
