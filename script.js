const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
    'Jeff Bezos',
    'Elon Musk',
    'Bernard Arnault',
    'Bill Gates',
    'Mark Zuckerberg',
    'Warren Buffett',
    'Larry Ellison',
    'Larry Page',
    'Sergey Brin',
    'Mukesh Ambani'
];

// Store listitems
const listItems = [];

let dragStartIndex;

// Functions 
// 1. Insert list item into DOM
function createList() {
    [...richestPeople]
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((person, index) => {
            const listItem = document.createElement('li');

            listItem.setAttribute('data-index', index);

            listItem.innerHTML = `
                <span class="number">${index + 1}</span>
                <div class="draggable" draggable="true">
                    <p class="person-name">${person}</p>
                    <i class="fas fa-grip-lines"></i>
                </div>
                `;
            
            listItems.push(listItem);

            draggable_list.appendChild(listItem);
        });
    
    addEventListeners();
}

// 2. Adding eventlisteners for drag and drop functionality
function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    })

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    }
    )
}

// 3. Five event listeners for drag drop
// 3.a. dragStart function
function dragStart() {
    // console.log('Event: ', 'dragstart');
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}

// 3.b. dragEnter function
function dragEnter() {
    // console.log('Event: ', 'dragenter');
    this.classList.add('over');
}

// 3.c. dragLeave function
function dragLeave() {
    // console.log('Event: ', 'dragleave');
    this.classList.remove('over');
}

// 3.d. dragOver function
function dragOver(e) {
    // console.log('Event: ', 'dragover');
    e.preventDefault();
}

// 3.e. dragDrop function
function dragDrop() {
    // console.log('Event: ', 'dragdrop');
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}

// 4. Check Order of the list
function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable')
            .innerText.trim();
        
        if (personName !== richestPeople[index]) {
            listItem.classList.add('wrong');
        }
        else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    })
}

// 5. SwapItems 
function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne); 
}

// Check order Event listener
check.addEventListener('click', checkOrder);



// Init functions
createList();