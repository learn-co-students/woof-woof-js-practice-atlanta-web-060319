document.addEventListener("DOMContentLoaded", setUpPage)

function setUpPage() {
    getAllPups()
}

function getAllPups() {
    let pupsList =  'http://localhost:3000/pups/'
    fetch(pupsList)
    .then(res => res.json())
    .then(data => data.map(pup => renderPupsBar(pup)))
}

function renderPupsBar(pup) {
    let doggo = document.querySelector('#dog-bar')
    doggo.innerHTML += `
    <span class="dogShow" data-pup-id="${pup.id}">${pup.name}</span>
    `
}

document.addEventListener('click', handleClick)

function handleClick(e) {
    if(e.target.className === 'dogShow') {
        // console.log("clicked dogshow")
        getPup(e.target.dataset.pupId, showPage)
    }
    else if(e.target.className === 'dog-btn') {
        getPup(e.target.dataset.id, changeStatus)
    }
}

function getPup(id, callback) {
    let pupsList =  `http://localhost:3000/pups/`
    fetch(pupsList + id)
    .then(res => res.json())
    .then(callback)
}

function showPage(pup) {
    let dogStatus = function() {
        let dog = pup.isGoodDog 
        if(pup.isGoodDog === true) { 
            return "Good Dog"
        }
        else if(pup.isGoodDog === false) {
            return "Bad Dog"
        }
    }
    
    let pupInfo = document.querySelector('#dog-info')
    pupInfo.innerHTML = `
    <img src=${pup.image}>

    <h2> ${pup.name}</h2>

    <button class="dog-btn" data-id="${pup.id}">${dogStatus()}</button>
    `
}

function changeStatus (pup) {
    let pupsList =  'http://localhost:3000/pups/'
    if(pup.isGoodDog === true) {
        fetch(pupsList + pup.id, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json",
                accept: "application/json"
            },
            body: JSON.stringify({
                isGoodDog: false
            })
        })
        .then(res => res.json())
        .then(showPage)
    }
    else if(pup.isGoodDog === false) {
        fetch(pupsList + pup.id, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json",
                accept: "application/json"
            },
            body: JSON.stringify({
                isGoodDog: true
            })
        })
        .then(res => res.json())
        .then(showPage)
    }
}
// function dogStatus() {
//     let dog = pup.isGoodDog 
//     if(pup.isGoodDog === true) { 
//         return "Good Dog"
//     }
//     else(pup.isGoodDog === false) 
//         return "Bad Dog"
//     }




