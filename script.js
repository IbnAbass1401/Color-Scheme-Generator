const colorPicker = document.querySelector("#color-picker")
const modeSelect = document.querySelector("#mode")
const getSchemeBtn = document.querySelector("#get-scheme-btn")
const colorContainer = document.querySelector("#color-container")
const themeBtn = document.querySelector("#theme-btn")
const toast = document.querySelector("#toast")


getSchemeBtn.addEventListener("click", getColorScheme)


function getColorScheme() {

    const seedColor = colorPicker.value.slice(1)
    const mode = modeSelect.value

    const url = `https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${mode}&count=5`

    fetch(url)
        .then(response => response.json())
        .then(data => {
            renderColors(data.colors)
        })
        .catch(error => {
            console.error("Something went wrong:", error)
        })
}


function renderColors(colors) {

    colorContainer.innerHTML = ""

    colors.forEach(color => {

        const hex = color.hex.value

        const colorColumn = document.createElement("div")
        colorColumn.classList.add("color-column")

        const colorDisplay = document.createElement("div")
        colorDisplay.classList.add("color-display")

        colorDisplay.style.backgroundColor = hex


        const hexValue = document.createElement("button")
        hexValue.classList.add("hex-value")
        hexValue.textContent = hex

        hexValue.addEventListener("click", () => {
            copyToClipboard(hex)
        })


        colorColumn.appendChild(colorDisplay)
        colorColumn.appendChild(hexValue)

        colorContainer.appendChild(colorColumn)
    })
}


function copyToClipboard(hex) {

    navigator.clipboard.writeText(hex)
        .then(() => {
            showToast()
        })
        .catch(error => {
            console.error("Could not copy:", error)
        })
}


function showToast() {

    toast.classList.add("show")

    setTimeout(() => {
        toast.classList.remove("show")
    }, 1500)
}


/* ---------------- DARK MODE ---------------- */

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark")

    if (document.body.classList.contains("dark")) {
        themeBtn.innerHTML = '<i data-lucide="sun"></i>'
    } else {
        themeBtn.innerHTML = '<i data-lucide="moon"></i>'
    }

    lucide.createIcons()
})

lucide.createIcons()


/* ---------------- INITIAL COLOR SCHEME ---------------- */

getColorScheme()