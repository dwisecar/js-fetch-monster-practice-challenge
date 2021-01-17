let currentPage = 1;

function renderForm(){
    const div = document.getElementById('create-monster');
    const form = document.createElement('form');
    form.setAttribute('id', 'monster-form');
    const name = document.createElement('input');
    name.setAttribute('id', 'name');
    name.setAttribute('placeholder', 'name...');
    const age = document.createElement('input');
    age.setAttribute('id', 'age');
    age.setAttribute('placeholder', 'age...');
    const description = document.createElement('input');
    description.setAttribute('id', 'description');
    description.setAttribute('placeholder', 'description...');
    const btn = document.createElement('button');
    btn.innerText = 'Create';
    form.append(name, age, description, btn);
    div.appendChild(form);
    form.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e){
    e.preventDefault();
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            'name': e.target['name'].value,
            'age': e.target['age'].value,
            'description': e.target['description'].value
        })
    })
}

function getMonsters(page=1) {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(res => res.json())
    .then(json => renderMonsters(json))
}

function renderMonsters(json){
    const monsterContainer = document.getElementById('monster-container');
    clearMonsterContainer(monsterContainer);
    json.forEach(monster => {
        let mon = document.createElement('div');
        let monName = document.createElement('h2');
        let monAge = document.createElement('h4');
        let monDesc = document.createElement('p');
        monName.textContent = monster.name;
        monAge.textContent = monster.age;
        monDesc.textContent = monster.description;
        mon.append(monName, monAge, monDesc);
        monsterContainer.appendChild(mon);
    })
}

function addArrowButtonListeners() {
    const fwdBtn = document.getElementById('forward');
    const backBtn = document.getElementById('back');
    fwdBtn.addEventListener('click', renderNextPage);
    backBtn.addEventListener('click', renderPreviousPage);
}

function clearMonsterContainer(container) {
    while(container.firstElementChild){
        container.firstElementChild.remove();
    }
}

function renderNextPage() {
    currentPage++;
    getMonsters(currentPage);
}

function renderPreviousPage(){
    if (currentPage == 1){ return; }
    currentPage--;
    getMonsters(currentPage);
}


renderForm();
getMonsters();
addArrowButtonListeners();
