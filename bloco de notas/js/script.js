const addBox  = document.querySelector(".add-box")
const popupBox  = document.querySelector(".popup-box")
const popupTitle  = popupBox.querySelector("header p")
const closeIcon  = popupBox.querySelector("header i")
const titleTag  = popupBox.querySelector("input")
const descTag  = popupBox.querySelector("textarea")
const addBtn  = popupBox.querySelector("button")

const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

const notes = JSON.parse(localStorage.getItem("notas") || "[]")
let isUpdate = false, updateId

addBox.addEventListener("click", () =>{
    titleTag.focus()
    popupBox.classList.add("show")
})

closeIcon.addEventListener("click", () =>{
    isUpdate = false
    titleTag.value = ""
    descTag.value = ""
    addBtn.innerText= "Adicionar Nota"
    popupTitle.innerHTML = "Adicionar uma nova nota"
    popupBox.classList.remove("show")
})

function showNotes(){
    document.querySelectorAll(".nota").forEach( note => note.remove())
    notes.forEach((note, index) => {
        let liTag = `<li class="nota">
        <div class="detalhes">
            <p>${note.title}</p>
            <span>${note.description}</span>
        </div>
        <div class="button-content">
            <span>${note.data}</span>
            <div class="settings">
                <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
                <ul class="menu">
                    <li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="fa-solid fa-pen"></i>Editar</li>
                    <li onclick="deleteNote(${index})"><i class="fa-solid fa-trash-can"></i>Deletar</li>
                </ul>
            </div>
        </div>
    </li>`

    addBox.insertAdjacentHTML("afterend", liTag)
    })
}

showNotes()

function showMenu(elem){
    elem.parentElement.classList.add("show")
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != elem){
            elem.parentElement.classList.remove("show")
        }
    })
}

function deleteNote(noteId){
    notes.splice(noteId, 1)
    localStorage.setItem("notas", JSON.stringify(notes)) 
    showNotes()
}

function updateNote(noteId, title, desc){
    isUpdate = true
    updateId = noteId
    addBox.click()
    titleTag.value = title
    descTag.value = desc
    addBtn.innerText= "Editar Nota"
    popupTitle.innerHTML = "Editando Nota"
    console.log(noteId, title, desc)
}

addBtn.addEventListener("click", e =>{
    e.preventDefault()
    let noteTitle = titleTag.value,
    noteDesc = descTag.value

    if(noteTitle || noteDesc){
        let dataObj = new Date() 
        let mes = meses[dataObj.getMonth()] 
        let dia = dataObj.getDate()
        let ano = dataObj.getFullYear()

        let noteInfo = {
            title: noteTitle, description: noteDesc,
            data: `${dia} de ${mes} de ${ano}`
        }
        
        if(!isUpdate){
            notes.push(noteInfo)
        } else{
            isUpdate = false
            notes[updateId] = noteInfo
        }

        localStorage.setItem("notas", JSON.stringify(notes)) 
        closeIcon.click()
        showNotes()
    }
   
})
