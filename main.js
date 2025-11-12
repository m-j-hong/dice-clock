const now = new Date();
const month = now.getMonth();
const date = now.getDate();
const hours = now.getHours();
const minutes = now.getMinutes();

let blank = '<div class="blank"></div>'
let dot = '<div class="dot"></div>'

let zero = blank

let one = blank + blank + blank
        + blank + dot + blank
        + blank + blank + blank

let two = dot + blank + blank
        + blank + blank + blank
        + blank + blank + dot

let three = blank + blank + dot
          + blank + dot + blank
          + dot + blank + blank

let four = dot + blank + dot
         + blank + blank + blank
         + dot + blank + dot

let five = dot + blank + dot
         + blank + dot + blank
         + dot + blank + dot

let six = dot + blank + dot
        + dot + blank + dot
        + dot + blank + dot

let numbers = [zero, one, two, three, four, five, six]

let screen = document.getElementById('content')
let colonDots = document.getElementsByClassName('colon-dot')
let diceDots = document.getElementsByClassName('dot')
let allDice = document.getElementsByClassName('die')

let hourA = document.getElementById('hour-a')
let hourB = document.getElementById('hour-b')
let minuteA = document.getElementById('minute-a')
let minuteB = document.getElementById('minute-b')
let minuteC = document.getElementById('minute-c')

let hCountA, hCountB, mCountA, mCountB, mCountC

console.log(hours)
let h12 = hours % 12

console.log(minutes)
console.log(month)
console.log(date)

hCountA = h12 - Math.ceil(h12 / 2)
hCountB = Math.ceil(h12 / 2)

mCountA = Math.floor(minutes / 10)
mCountB = (minutes % 10) - Math.ceil((minutes % 10) / 2)
mCountC = Math.ceil((minutes % 10) / 2)

let shadowX, shadowY

function updateDice() {
    (hours < 6 || hours >= 14) ? document.body.style.background = '#28232f' : document.body.style.background = '#f8f7f6'
    if (0 <= hours && hours < 6) {
        console.log('q1')
        shadowX = -(hours % 6) * 5
        shadowY = ((hours % 6) - 6) * 5
    }
    else if (6 <= hours && hours < 12) {
        console.log('q2')
        shadowX = ((hours % 6) - 6) * 5
        shadowY = (hours % 6) * 5
    }
    else if (12 <= hours && hours < 18) {
        console.log('q3')
        shadowX = (hours % 6) * 8
        shadowY = (6 - (hours % 6)) * 5
    }
    else {
        console.log('q4')
        shadowX = (6 - (hours % 6)) * 5
        shadowY = -(hours % 6) * 5
    }
    let insetShadow = shadowX/10 + 'px ' + shadowY/10 + 'px 0 0 #00000080 inset';
    let dieShadow = shadowX + 'px ' + shadowY + 'px 0 0 #00000080';


    // 0 - 24, negative from 24 to 12, positive from 12 to 24. maximum at 6 and 18
    hourA.innerHTML = numbers[hCountA]
    hourB.innerHTML = numbers[hCountB]
    minuteA.innerHTML = numbers[mCountA]
    minuteB.innerHTML = numbers[mCountB]
    minuteC.innerHTML = numbers[mCountC]

    for (const d of allDice) {
        if (d.innerHTML == numbers[0]) {
            d.style.boxShadow =  insetShadow
        }
        else {
            d.style.boxShadow =  dieShadow
        }
    }

    for (const c of colonDots) {
        c.style.boxShadow =  insetShadow
    }
    for (const d of diceDots) {
        d.style.boxShadow =  insetShadow
    }
}

updateDice()