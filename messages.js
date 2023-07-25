const messageContainer = document.querySelector(".title")
const gitHubLink = `seanrw93<i class="fa fa-github"></i>`

let messages = [
    "Welcome",
    "Stressful day?",
    "Let the Squares help you unwind",
    "Enjoy",
    gitHubLink
]

function displayMessages() {
    let index = -1

    let intervalId = setInterval(() => {
        index++
        if (index === messages.length) {
            clearInterval(intervalId)
        } else if (index === messages.length - 1) {
            messageContainer.innerHTML = `
                <div class="fade-in">
                    <h1 id="messages">${messages[index]}</h1>
                </div>
            `;
        }else{
            messageContainer.innerHTML = `
                <div class="fade-in-out">
                    <h1 id="messages">${messages[index]}</h1>
                </div>
            `;
        }
        console.log(messages[index])
    }, 5000)
}


window.addEventListener("DOMContentLoaded", displayMessages)