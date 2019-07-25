document.addEventListener("DOMContentLoaded", pageSetUp)
let PUPS_URL = `http://localhost:3000/pups/`
document.addEventListener("click", getMoreInfo)



function pageSetUp(){
    fetch(PUPS_URL)
    .then(res => res.json())
    .then(pups => pups.map(pup => renderPup(pup)))
}


function renderPup(pup){
    let pupBar = document.querySelector("#dog-bar")

    pupBar.innerHTML += `
        <span id="${pup.isGoodDog}" class="pup" data-id="${pup.id}">${pup.name}</span>
    `
}

function getMoreInfo(e){
    if (e.target.className === "pup" ){
        let id = parseInt(e.target.dataset.id)
        fetch(PUPS_URL + id)
        .then(res => res.json())
        .then(pup => renderMore(pup))
    } else if (e.target.className === "true"){
        let id = parseInt(e.target.dataset.id)
        fetch(PUPS_URL + id)
        .then(res => res.json())
        .then(pup => changePup(pup))
    } else if (e.target.className === "false"){
        let id = parseInt(e.target.dataset.id)
        fetch(PUPS_URL + id)
        .then(res => res.json())
        .then(pup => changePup(pup))
    } 

}



function changePup(pup){
    let oldPup = pup
    if(oldPup.isGoodDog === true){
        let newPup = {...oldPup, isGoodDog: false}
        fetch(PUPS_URL + newPup.id, {
            method: "PATCH",
            headers: {
                "content-type":"application/json",
                Accept: "apllication/json"
            },
            body:JSON.stringify(newPup)
        })
        .then(res => res.json())
        .then(pup => renderMore(pup))
    } else if (oldPup.isGoodDog === false){
        let newPup = {...oldPup, isGoodDog: true}
        fetch(PUPS_URL + newPup.id, {
            method: "PATCH",
            headers: {
                "content-type":"application/json",
                Accept: "apllication/json"
            },
            body:JSON.stringify(newPup)
        })
        .then(res => res.json())
        .then(pup => renderMore(pup))
    }

}

function renderMore(pup){
    let dogInfo = document.querySelector("#dog-info")
    dogInfo.innerHTML = ""
    if (pup.isGoodDog === true){
        let isGoodDog = true
    dogInfo.innerHTML = `
    <img src=${pup.image}>
    <h2>${pup.name}</h2>
    <button class="${isGoodDog}" data-id="${pup.id}">Good Dog!</button>
    `
    } else if (pup.isGoodDog === false){
        let isGoodDog = false
        dogInfo.innerHTML = `
    <img src=${pup.image}>
    <h2>${pup.name}</h2>
    <button class="${isGoodDog}" data-id="${pup.id}">Bad Dog!</button>
    `
    }
    
}

