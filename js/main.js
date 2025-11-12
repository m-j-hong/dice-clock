const now = new Date();
const month = now.getMonth() + 1;
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

// set 24 hour scale to 12
// 0 means 12, otherwise regular
let h12 = (hours == 0) ? 12 : hours % 12

console.log(hours)
console.log(minutes)
console.log(month)
console.log(date)

// split hours equally among 2 dice
hCountA = h12 - Math.ceil(h12 / 2)
hCountB = Math.ceil(h12 / 2)

// tens of minutes
mCountA = Math.floor(minutes / 10)

// ones of minutes split among 2 dice
mCountB = (minutes % 10) - Math.ceil((minutes % 10) / 2)
mCountC = Math.ceil((minutes % 10) / 2)

function updateDice() {
    // light/dark theme
    let themeColor
    (hours < 6 || hours >= 14) ? themeColor = '#28232f' : themeColor = '#f8f7f6'
    document.body.style.background = themeColor
    
    // shadows
    // 0 - 24, negative from 24 to 12, positive from 12 to 24. maximum at 6 and 18
    let shadowX, shadowY
    if (0 <= hours && hours < 6) {
        console.log('q1')
        shadowX = -(hours % 6) / 2
        shadowY = ((hours % 6) - 6) / 2
    }
    else if (6 <= hours && hours < 12) {
        console.log('q2')
        shadowX = ((hours % 6) - 6) / 2
        shadowY = (hours % 6) / 2
    }
    else if (12 <= hours && hours < 18) {
        console.log('q3')
        shadowX = (hours % 6) / 2
        shadowY = (6 - (hours % 6)) / 2
    }
    else {
        console.log('q4')
        shadowX = (6 - (hours % 6)) / 2
        shadowY = -(hours % 6) / 2
    }

    // shadow size
    let insetShadow = shadowX/8 + 'vw ' + shadowY/6 + 'vw 0 0 #00000080 inset';
    let dieShadow = shadowX + 'vw ' + shadowY + 'vw 0 0 #00000080';

    // set # of pips on each die
    hourA.innerHTML = numbers[hCountA]
    hourB.innerHTML = numbers[hCountB]
    minuteA.innerHTML = numbers[mCountA]
    minuteB.innerHTML = numbers[mCountB]
    minuteC.innerHTML = numbers[mCountC]

    for (const d of allDice) {
        if (d.innerHTML == numbers[0]) {
            // if # is 0, looks like die isn't there
            d.style.boxShadow =  insetShadow
            d.style.background = themeColor
        }
        else {
            // regular positive shadow
            d.style.boxShadow =  dieShadow
            d.style.background = '#f8f7f6'
        }
    }

    // inset shadows
    for (const c of colonDots) {
        c.style.boxShadow =  insetShadow
        c.style.background = themeColor
    }
    for (const d of diceDots) {
        d.style.boxShadow =  insetShadow
    }
}

updateDice()