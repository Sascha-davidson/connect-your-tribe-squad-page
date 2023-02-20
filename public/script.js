const allTriggers = document.querySelectorAll('.card-trigger')

console.log(allTriggers);

allTriggers.forEach((trigger) => {
    console.log(trigger)
    trigger.addEventListener('click', () => {
        const dataId = trigger.dataset.id
        const card = document.getElementById(dataId)
        card.classList.add('active')
    })
})