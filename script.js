// Select elements from the DOM
const hourEl = document.querySelector('.hour')     // Clock hour hand
const minuteEl = document.querySelector('.minute') // Clock minute hand
const secondEl = document.querySelector('.second') // Clock second hand
const timeEl = document.querySelector('.time')     // Digital time display
const dateEl = document.querySelector('.date')     // Date display
const toggle = document.querySelector('.toggle')   // Button to toggle dark/light mode

// Arrays(days, months  ) to convert date values to human-readable names
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Toggle between dark and light mode when button is clicked
toggle.addEventListener('click', (e) => {
    const html = document.querySelector('html')

    // Check if 'dark' class is present on the <html> tag
    if (html.classList.contains('dark')) {
        // Switch to light mode
        html.classList.remove('dark')
        e.target.innerHTML = 'Dark mode'
    } else {
        // Switch to dark mode
        html.classList.add('dark')
        e.target.innerHTML = 'Light mode'
    }
})

// Main function to update the clock and date
function setTime() {
    const time = new Date()              // Get current date and time
    const month = time.getMonth()        // Get current month (0-11)
    const day = time.getDay()            // Get current day of the week (0-6)
    const date = time.getDate()          // Get current day of the month
    const hours = time.getHours()        // Get current hour (0-23)

    // Convert 24-hour format to 12-hour format
    const hoursForClock = hours >= 13 ? hours % 12 : hours;

    const minutes = time.getMinutes()    // Get current minutes
    const seconds = time.getSeconds()    // Get current seconds
    const ampm = hours >= 12 ? 'PM' : 'AM' // Determine AM or PM

    // Rotate the clock hands using CSS transform based on time, 0n to 11 is 12 hlours, 0 to 360 rotate fully in circle.
    hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(hoursForClock, 0, 11, 0, 360)}deg)`
    // 0 to 59 is 60 minutes and 0 to 360 rotate in full circle.
    minuteEl.style.transform = `translate(-50%, -100%) rotate(${scale(minutes, 0, 59, 0, 360)}deg)`
    secondEl.style.transform = `translate(-50%, -100%) rotate(${scale(seconds, 0, 59, 0, 360)}deg)`

    // Update digital clock display (e.g., 3:07 PM), It is in 12 hours formate.
    // TO convert into 24 hours. Replace hoursForClock with hours (which is already in 24-hour format). Remove ampm, since 24-hour time doesn't use AM/PM.
    timeEl.innerHTML = `${hoursForClock}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`

    // Update date display (e.g., Tuesday, Jul <span>2</span>)
    dateEl.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>`
}

// Utility function to scale a number from one range to another
// StackOverflow https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
// Example: map 0–60 seconds to 0–360 degrees
const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

// Set initial time and date immediately on load
setTime()

// Update clock every second, 1 second = 1000milliseconds 
setInterval(setTime, 1000)
