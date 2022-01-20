// div - card
// h2 - name
// h4 - age
// p - description

document.addEventListener('DOMContentLoaded',()=>{
    fetchMonsters(1);

    const forward = document.getElementById('forward');
    forward.addEventListener('click',()=>{
        monsterCounter++;
        const monsterCards = document.querySelectorAll('.monster');
        for (monster of monsterCards){
            monster.remove()
        }
        fetchMonsters(monsterCounter);
    })
    const back = document.getElementById('back');
    back.addEventListener('click',()=>{
        monsterCounter--;
        const monsterCards = document.querySelectorAll('.monster');
        if (monsterCounter>0){
            for (monster of monsterCards){
                monster.remove()
            }
            fetchMonsters(monsterCounter);
        } else {
            monsterCounter++;
        }

    })

    addMonster();

})

//set up
// determines what page were on
let monsterCounter=1;
const URL_PREFIX='http://localhost:3000/monsters';
const URL_LIMIT = '?_limit='
const URL_PAGE = '&_page='
//fetch toys from server
function fetchMonsters(newCounter) {
        const monsterURL = URL_PREFIX+URL_LIMIT+'50'+URL_PAGE+newCounter;
        return fetch(monsterURL)
        .then( (resp) => resp.json() )
        .then( (json) => renderMonsters(json) );    
  }
  
  //render monsters on page
function renderMonsters(monsters) {
    const container = document.getElementById('monster-container');
    monsters.forEach(monster=> {
        const div = document.createElement('div');
        div.className='monster'
        container.appendChild(div);

        const h2 = document.createElement('h2');
        h2.textContent=monster.name;
        div.appendChild(h2);

        const h4 = document.createElement('h4');
        h4.textContent=`Age: ${Math.round(monster.age)}`;
        div.appendChild(h4);

        const p = document.createElement('p');
        p.textContent=`${monster.description}`
        div.appendChild(p)
        // console.log(monster);
    })
}

/// add monster 

const addMonster = () => {
    const createMonster = document.getElementById('create-monster')

    const form = document.createElement('form');
    form.id='monster-form';
    createMonster.appendChild(form);

    const newName = document.createElement('input');
    newName.id='name';
    newName.placeholder='Name...'
    form.appendChild(newName)

    const newAge = document.createElement('input');
    newAge.id='age';
    newAge.placeholder='Age...'
    form.appendChild(newAge)

    const newDesc = document.createElement('input');
    newDesc.id='description';
    newDesc.placeholder='Description...'
    form.appendChild(newDesc)


    const newButton = document.createElement('button');
    newButton.textContent='Create';
    form.appendChild(newButton)

    form.addEventListener('submit', (event)=> {
        event.preventDefault();

        const monsterName = newName.value;
        const monsterAge = newAge.value;
        const monsterDesc =newDesc.value;
        addNewMonster(monsterName,monsterAge,monsterDesc);
        
        form.reset();
    })
}

const addNewMonster = (iName,iAge,iDesc) => {
  const formData = {
      name: iName,
      age: iAge,
      description: iDesc,
    };
    
    const configurationObject = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    };
    
    return fetch(URL_PREFIX, configurationObject)
      .then(function (response) {
        return response.json();
      })
      .then(function (object) {
        console.log('Successfully Added to the Database')
      })
      .catch(function (error) {
          alert("ERROR");
      });
}
