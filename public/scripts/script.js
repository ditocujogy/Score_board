async function sortElements() {
    let i, temp, comps, sorted = false;	//  sorted is initially false

    const response = await axios.get('/subjects')

    comps = response.data.subjects.length

    while (!sorted)			//  comps reduces on each pass
    {
        sorted = true;		//  set true for each pass
        for (i = 1; i < comps; i++) {
            let first = document.querySelector(`.row:nth-child(${i})`)
            let second = document.querySelector(`.row:nth-child(${i + 1})`)

            let firstWidth = parseInt(first.childNodes[5].lastElementChild.innerHTML.match(/[0-9]*/)[0])
            let secondWidth = parseInt(second.childNodes[5].lastElementChild.innerHTML.match(/[0-9]*/)[0])

            if (firstWidth < secondWidth) {
                temp = first.innerHTML;
                first.innerHTML = second.innerHTML;
                second.innerHTML = temp;
                sorted = false;	//  not yet sorted
            }
        }	//  end of each pass
        comps--;
    }	//  end all passes
}

let inSpanArray = document.querySelectorAll(".in")
inSpanArray.forEach(inSpan => {
    inSpan.style.width = inSpan.innerHTML
})

async function updateFunction(event, operation) {
    const target = event.target;
    const spanIn = target.parentElement.childNodes[5].lastElementChild
    const name = target.parentElement.childNodes[1].innerHTML

    let percentage = parseInt(spanIn.innerHTML)

    if (operation == 'plus') {
        if (percentage < 100) {
            percentage++
        }
    } else {
        if (percentage > 0) {
            percentage--
        }
    }

    const response = await axios.put('/', {
        name,
        percentage
    })

    spanIn.innerHTML = `${response.data[0]}%`
    spanIn.style.width = `${response.data[0]}%`
    sortElements()
}

async function deleteFunction(event) {
    const target = event.target
    const name = target.parentElement.children[0].innerHTML

    await axios.delete('/', {
        data: {
            name
        }
    })

    window.location.reload()
}

const intervals = []
let isPaused = false
let i = 0

const loadingEffect = function (id) {
    const row = document.getElementById(id)
    const innerSpan = row.children[2].children[0]

    isPaused = false
    const newInterval = setInterval(function () {
        if (i == 125) {
            i = 0
        } else {
            if (i <= 100) {
                innerSpan.style.background =
                    `linear-gradient(90deg, rgba(0,187,18,1) 0%, rgba(255,255,255,1) ${i}%, rgba(0,190,25,1) 100%)`
            }
        }
        i++
    }, 15)

    intervals.push(newInterval)
}

async function myStopFunction(id) {
    const row = document.getElementById(id)
    const innerSpan = row.children[2].children[0]

    innerSpan.style.background = '#00bb12'

    intervals.forEach(interval => {
        clearInterval(interval)
    })
}

sortElements()