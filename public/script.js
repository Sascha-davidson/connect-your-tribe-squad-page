const allTriggers = document.querySelectorAll('.card-trigger')
const startingVelocity = 2.5;
allTriggers.forEach((trigger) => {
    console.log(trigger)

    trigger.velocityX = Math.random() > .5 ? startingVelocity : -startingVelocity;
    trigger.velocityY = Math.random() > .5 ? startingVelocity : -startingVelocity;

    trigger.style.top = (Math.random() * document.getElementsByClassName("squad")[0].offsetHeight)/1.5 + 'px'
    trigger.style.left = (Math.random() * document.getElementsByClassName("squad")[0].offsetWidth)/1.5 + 'px'

    trigger.addEventListener('click', () => {
        const dataId = trigger.dataset.id
        const card = document.getElementById(dataId)
        // card.classList.add('active')
        card.showModal();

        const close_buttons = document.querySelectorAll(".close");
        close_buttons.forEach((close) => {
            close.addEventListener("click", () => {
                card.close()
            });
        })
    })
})


function Tick() {
    allTriggers.forEach(trigger => {
        let currentX = parseFloat(trigger.style.left);
        let currentY = parseFloat(trigger.style.top);

        currentX += trigger.velocityX;
        currentY += trigger.velocityY;

        trigger.style.left = currentX + "px";
        trigger.style.top = currentY + "px";

        CheckCircleWallCollision(trigger, currentX, currentY, trigger.offsetWidth / 2);

        for (let trigger2 of allTriggers) {
            if (trigger === trigger2) continue; // should not check collision on itself

            if (CheckCircleCollision(trigger, trigger2)) {
                ResolveCircleCollision(trigger, trigger2);
            }
        }
    });
    requestAnimationFrame(Tick);
}

function CheckCircleWallCollision(trigger, posX, posY, radius) {
    posX += radius;
    posY += radius;
    if (posX - radius <= 0) {
        trigger.velocityX = Math.abs(trigger.velocityX);
    }
    if (posX + radius >= document.getElementsByClassName("squad")[0].offsetWidth) {
        trigger.velocityX = -Math.abs(trigger.velocityX);
    }
    if (posY - radius <= 0) {
        trigger.velocityY = Math.abs(trigger.velocityY);
    }
    if (posY + radius >= document.getElementsByClassName("squad")[0].offsetHeight) {
        trigger.velocityY = -Math.abs(trigger.velocityY);
    }
}

function CheckCircleCollision(triggerOne, triggerTwo) {
    let circleOneX = parseFloat(triggerOne.style.left);
    let circleOneY = parseFloat(triggerOne.style.top);

    let circleTwoX = parseFloat(triggerTwo.style.left);
    let circleTwoY = parseFloat(triggerTwo.style.top);

    let radiusOne = triggerOne.offsetWidth / 2;
    let radiusTwo = triggerTwo.offsetWidth / 2;

    let pos1 = circleOneX - circleTwoX;
    let pos2 = circleOneY - circleTwoY;

    let dist = Math.sqrt(pos1 * pos1 + pos2 * pos2);

    return (dist < radiusOne + radiusTwo);
}

function ResolveCircleCollision(circle1, circle2) {
    function rotate(velocityX, velocityY, angle) {
        return {
            x: velocityX * Math.cos(angle) - velocityY * Math.sin(angle),
            y: velocityX * Math.sin(angle) + velocityY * Math.cos(angle)
        };
    }


    const xVelocityDiff = circle1.velocityX - circle2.velocityX;
    const yVelocityDiff = circle1.velocityY - circle2.velocityY;

    const xDist =  parseFloat(circle2.style.left) -  parseFloat(circle1.style.left);
    const yDist =  parseFloat(circle2.style.top) -  parseFloat(circle1.style.top);

    // Prevent accidental overlap of circle1s
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Verkrijg de hoek tussen de 2 circles.
        const angle = -Math.atan2(parseFloat(circle2.style.top) - parseFloat(circle1.style.top), parseFloat(circle2.style.left) - parseFloat(circle1.style.left));

        // Rotate beide circles met de angle tussen ze.
        const u1 = rotate(circle1.velocityX, circle1.velocityY, angle);
        const u2 = rotate(circle2.velocityX, circle2.velocityY, angle);

        // Flip de 2 velocities.
        const v1 = {x: u2.x, y: u1.y};
        const v2 = {x: u1.x, y: u2.y};

        // Rotate de velocities terug.
        const vFinal1 = rotate(v1.x, v1.y, -angle);
        const vFinal2 = rotate(v2.x, v1.y, -angle);

        // Apply velocities
        circle1.velocityX = vFinal1.x;
        circle1.velocityY = vFinal1.y;

        circle2.velocityX = vFinal2.x;
        circle2.velocityY = vFinal2.y;
    }
}

Tick();
