async function copyCode() {
    let code = document.getElementById("install");
    let content = code.innerHTML;
    await navigator.clipboard.writeText(
        content.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    );
    code.innerHTML = "Copied!";
    await new Promise((resolve) => setTimeout(resolve, 1000));
    code.innerHTML = content;
}

const popups = [
    new Popup({
        id: "color-info",
        title: "Color Guesser",
        content: `
        You are presented with a color.
        Estimate the hex code of the color.
        Six characters, ranging from 00-FF for 3 channels.
        Values are in {a-http://example.com}[Base-16].
        big-margin§{bold}[#{red}[E4]{green}[F2]{blue}[DB]]
        big-margin§{black bold}[#000000] is black.                {white bold shadow}[#FFFFFF] is white.
        big-margin§Good luck.`,
        titleColor: "rgb(92, 0, 95)",
        titleMargin: "0",
        backgroundColor: "#ffebfe",
        hideCallback: () => enableScroll(),
    }),
    new Popup({
        id: "download",
        title: "Download Instructions",
        content: `
            1. Download and install the {a-http://example.com}[CliCli] launcher.
            2. Navigate to the {a-http://example.com}[game page] and click 'Open CliCli Platform'.
            3. Press the 'Start Game' button to download and launch the game.
            `,
        backgroundColor: "#000",
        titleColor: "#fff",
        textColor: "#fff",
        closeColor: "#fff",
        borderWidth: ".2em",
        borderColor: "#fff",
        linkColor: "#fff",
        fontSizeMultiplier: 1.2,
        titleMargin: "4%",
        underlineLinks: true,
        dynamicHeight: true,
        hideCallback: () => enableScroll(),
    }),
    new Popup({
        id: "board",
        titleColor: "#FFFFFF",
        textColor: "#FFFFFF",
        closeColor: "#FFFFFF",
        title: "Uh Oh!",
        backgroundColor: "#8A2BE2",
        fontSizeMultiplier: 1.3,
        content: `
        This board name is already taken!
        Try picking a different one.
        {btn-ok}[Okay]`,
        dynamicHeight: true,
        borderWidth: ".15em",
        borderColor: "#FFFFFF",
        hideCallback: () => enableScroll(),
    }),
    new Popup({
        id: "disclaimer",
        title: "Disclaimer",
        content:
            "The original version of this puzzle was made to be played by two people - one person reading the manual and one entering information according to it - neither person is allowed to view the other's content. The manual is available {a-http://example.com}[here].",
        dynamicHeight: true,
        sideMargin: "2.9vw",
        titleColor: "#fff",
        textColor: "#fff",
        backgroundColor: "#222",
        closeColor: "#fff",
        fontSizeMultiplier: 1.2,
        linkColor: "#888",
        hideCallback: () => enableScroll(),
    }),
    new Popup({
        id: "fishy",
        title: "Something is fishy...",
        backgroundColor: "#FF0000",
        titleColor: "#FFF",
        textColor: "#FFF",
        closeColor: "#FFF",
        linkColor: "#FFF",
        underlineLinks: "true",
        fontSizeMultiplier: 1.2,
        dynamicHeight: true,
        titleMargin: "2em",
        content: `
        This link seems very dangerous.
        Are you sure you want to continue?
        big-margin§If you know what you're doing, 
        {a-http://example.com}[click here to proceed].`,
        borderWidth: ".2em",
        borderColor: "#FFF",
        hideCallback: () => enableScroll(),
    }),
    new Popup({
        id: "override",
        title: "Data Conflict",
        content: `Your cloud data and local data are different. Which one do you want to use?
          custom-space-out big-margin§{btn-refuse-override}[Local Data]{btn-accept-override}[Cloud Data]`,
        sideMargin: "1.5em",
        fontSizeMultiplier: "1.2",
        dynamicHeight: true,
        backgroundColor: "#FFFEE3",
        allowClose: false,
        hideCallback: () => enableScroll(),
    }),
];

let assignedClicks = false;

function showPopup(index) {
    popups[index].show();
    disableScroll();

    if (!assignedClicks) {
        assignedClicks = true;
        // add functionality to data conflict popup
        document
            .querySelectorAll(".popup.override button")
            .forEach((button) => {
                button.addEventListener("click", () => {
                    popups[5].hide();
                });
            });

        // add functionality to name conflict popup
        document
            .querySelector(".popup.board button")
            .addEventListener("click", () => {
                popups[2].hide();
            });
    }
}

/******************/

function disableScroll() {
    // Get the current page scroll position
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;

    // if any scroll is attempted, set this to the previous value
    window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
    };
}

function enableScroll() {
    window.onscroll = function () {};
}
