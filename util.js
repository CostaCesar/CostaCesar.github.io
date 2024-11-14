function linkClick(id) {
            
    let current = document.getElementById(id);

    if(current.getAttribute("selected") == "true")
        window.open(current.getAttribute('href'), '_blank'); 

    document.querySelectorAll('.project').forEach(project => {
        project.setAttribute("selected", "false")
    });
    
    current.setAttribute("selected", "true");
}
function changeColor() {
    var page = document.getElementsByClassName("page")[0];
    page.style.filter = page.style.filter === "saturate(1)" ? "saturate(0)" : "saturate(1)";
}
async function copyTextToCB(textId) {
    var copyText = document.getElementById(textId);
    //copyText.select();
    //copyText.setSelectionRange(0, 99999); // For mobile devices
    try {
        await navigator.clipboard.writeText(copyText.innerText);
    } catch (error) {
        console.log(error);
    }
}
function createMessage(type) {
    const div_popUp = document.createElement("div");
    const div_msg = document.createElement("div");
    const btn_close = document.createElement("button")

    div_popUp.className = "pop-up";
    div_msg.className = "pop-up-message"
    btn_close.innerText = "Fechar"
    btn_close.onclick = function () { document.getElementsByClassName("pop-up")[0].remove(); }

    if (type == "msg-credits") {
        const creditsHeader = document.createElement("h2")
        const creditsMesage = document.createElement("p")
        creditsHeader.innerText = "Muito grato pelos recursos disponibilizados:";
        creditsMesage.innerHTML = 'Icones de <a href="https://www.svgrepo.com" target="_blank">SVG Repo</a>'
            + '<br>'
            + 'Faixas de <a href="https://shields.io" target="_blank">Shields.io</a>';
        const creditsMark = document.createElement("h2");
        creditsMark.innerHTML = 'Costa Cesar 2024 <span id="symbol">©</span>';
        div_msg.appendChild(creditsHeader);
        div_msg.appendChild(creditsMesage);
        div_msg.appendChild(document.createElement("br"));
        div_msg.appendChild(document.createElement("br"));
        div_msg.appendChild(creditsMark);
    }

    div_msg.appendChild(document.createElement("br"));
    div_msg.appendChild(document.createElement("br"));
    div_msg.appendChild(btn_close);
    div_popUp.appendChild(div_msg);
    document.body.appendChild(div_popUp);
}