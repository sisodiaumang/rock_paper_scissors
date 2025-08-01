const rock = document.querySelector(".rock");
const paper = document.querySelector(".paper");
const scissors = document.querySelector(".scissors");
const options = [rock, paper, scissors];
const winsound = document.querySelector(".winsound");
const losesound = document.querySelector(".losesound");
const tiktoksound=document.querySelector(".tiktoksound");
const mode = document.querySelector(".mode");
const playerscore = document.querySelector(".playerscore");
const modetext = document.querySelector(".modecover").querySelector("h4");
const gear = document.getElementById("gear-icon");
const aiscore = document.querySelector(".browserscore");
const reset = document.querySelector(".reset");
const delay = (ms) => new Promise(res => setTimeout(res, ms));
const wheelsound = document.querySelector(".wheelsound");
let gamemode = "easy";
let cancelRound = false;
let approve = false;
let win = false;
let selected = false;
let chart = [1, 1];
const optionsound = document.querySelector(".optionsound");
const selectedsound = document.querySelector(".selectedsound");
const logic = {
    1: [2, 3],
    2: [3, 1],
    3: [1, 2],
};
modetext.innerText = "Easy";
const aimovemaker = () => {
    const randomnumber = () => Math.floor(Math.random() * 3);

    const playerMove = chart[0]; // 1 = rock, 2 = paper, 3 = scissors
    const choices = {
        easy: [logic[playerMove][1], playerMove, logic[playerMove][1]],
        medium: [logic[playerMove][1], logic[playerMove][0], playerMove],
        hard: [logic[playerMove][0], logic[playerMove][1], logic[playerMove][0]]
    };

    const pick = randomnumber();
    return choices[gamemode][pick];
};

const aimove = () => {
    const moveId = aimovemaker();
    const moveMap = {
        1: "img/rockai.png",
        2: "img/paperai.png",
        3: "img/scissorsai.png"
    };
    return [moveMap[moveId], moveId];
};


options.forEach((element) => {
    element.addEventListener("mouseenter", () => {
        optionsound.play();
    });

    element.addEventListener("mouseleave", () => {
        optionsound.pause();
        optionsound.currentTime = 0;
    });

    element.addEventListener("click", (e) => {
        if (approve === true && selected === false) {
            selectedsound.play();
            options.forEach(opt => opt.classList.remove("selected"));
            element.classList.add("selected");
            console.log(e.target);
        }
        if (approve === true && selected === false) {
            selected = true;
            if (e.target.classList[0] === "scissors") {
                document.querySelector(".playermove").querySelector("img").setAttribute("src", "img/scissorsai.png");
                chart[0] = 3;
            }
            if (e.target.classList[0] === "paper") {
                document.querySelector(".playermove").querySelector("img").setAttribute("src", "img/paperai.png");
                chart[0] = 2;
            }
            if (e.target.classList[0] === "rock") {
                document.querySelector(".playermove").querySelector("img").setAttribute("src", "img/rockai.png");
                chart[0] = 1;
            }
            document.querySelector(".playermove").querySelector("img").style.display = "block";
            const count = async () => {
                cancelRound = false; // Reset the cancel flag at the start of a round
                // tiktoksound.play();
                for (let i = 0; i < 3; i++) {
                    if (cancelRound) return; // Stop if reset was clicked
                    document.querySelector(".announcement").innerText = `${3 - i}`;
                    await delay(1000);
                }

                if (cancelRound) return;
                document.querySelector(".announcement").innerText = `Vs`;
                const aimoves = aimove();
                chart[1] = aimoves[1];
                document.querySelector(".aimove img").src = aimoves[0];
                document.querySelector(".aimove img").style.display = "block";

                await delay(2000);
                if (cancelRound) return;

                document.querySelector(".aimove img").style.display = "none";
                document.querySelector(".playermove img").style.display = "none";

                const result = checkwin();
                if (cancelRound) return;

                if (result === "win") {
                    playerscore.innerText = parseInt(playerscore.innerText) + 1;
                    if (checkGameOver()) return;
                    document.querySelector(".announcement").innerText = "You won the Round";
                    winsound.play();
                } else if (result === "lose") {
                    aiscore.innerText = parseInt(aiscore.innerText) + 1;
                    if (checkGameOver()) return;
                    document.querySelector(".announcement").innerText = "You lose the Round";
                    losesound.play();
                } else {
                    document.querySelector(".announcement").innerText = "Round Draw";
                }

                options.forEach(opt => opt.classList.remove("selected"));
                await delay(3000);
                if (cancelRound) return;

                document.querySelector(".announcement").innerText = "Select again to play Again";
                selected = false;
            };
            count();
        }
    }
    );
});

document.querySelector(".start").addEventListener("click", () => {
    document.querySelector(".start").style.display = "none";
    document.querySelector(".announcement").innerText = "Please Select your Next move from below";
    approve = true;
    document.querySelector(".announcement").style.display = "block";
});
const checkwin = () => {
    if (chart[0] === chart[1]) {
        console.log("draw");
        return "draw";
    }
    else if (chart[0] + 1 === chart[1] || (chart[0] - 2) === chart[1]) {
        console.log("lose");
        return "lose";
    }
    else {
        console.log("win");
        return "win";
    }
}
const checkGameOver = () => {
    if (parseInt(playerscore.innerText) >= 3) {
        document.querySelector(".announcement").innerText = "🎉 You won the Game!";
        winsound.play();
        approve = false;
        selected = false;
        return true;
    } else if (parseInt(aiscore.innerText) >= 3) {
        document.querySelector(".announcement").innerText = "💀 You lost the Game!";
        losesound.play();
        approve = false;
        selected = false;
        return true;
    }
    return false;
};

reset.addEventListener("click", () => {
    cancelRound = true;

    playerscore.innerText = "0";
    aiscore.innerText = "0";
    document.querySelector(".announcement").style.display = "none";
    document.querySelector(".start").style.display = "block";
    document.querySelector(".playermove").querySelector("img").style.display = "none";
    document.querySelector(".aimove").querySelector("img").style.display = "none";
    options.forEach(opt => opt.classList.remove("selected"));

    approve = false;
    selected = false;
    chart = [];
});


document.querySelector('.setting-btn').addEventListener('click', async () => {
    gear.classList.remove("rotate");
    void gear.offsetWidth;
    gear.classList.add("rotate");
    wheelsound.play();
    await delay(300);
    document.querySelector(".cube").style.transform = "rotateZ(-5deg) rotateY(200deg) rotateX(-18deg)  ";
    // document.querySelector(".cube").style.transform = "rotateZ(0deg) rotateY(0deg) rotateX(45deg)  ";
});
document.querySelector(".back").addEventListener("click", () => {
    document.querySelector(".cube").style.transform = "rotateX(0deg) rotateY(0deg)";
});
mode.addEventListener("change", (e) => {
    if (mode.value == 0) {
        gamemode = "easy";
        modetext.innerText = "Easy";
    }
    else if (mode.value == 1) {
        gamemode = "medium";
        modetext.innerText = "Medium";
    }
    else if (mode.value == 2) {
        gamemode = "hard";
        modetext.innerText = "Hard";
    }
})
document.querySelector(".modecover").addEventListener("click", (e) => {
    e.stopPropagation();
});
