//Input the homework name set them into the number of leaved and the row
function InputNameandNumber(){
    const input = document.querySelector(".todo-app__input");
    
    var homeworkName;
    //document.getElementById("leftNumber").innerHTML = "0 left";
    let tempenternumber = 0;
    input.addEventListener("keydown",(e) => {
        if(e.keyCode === 13 && e.target.value !== ''){
            tempenternumber += 1;
            //alert(document.getElementById("InputEnterID").value);
            homeworkName = String(document.getElementById("InputEnterID").value);//The value in input
            InputItemArray.push(homeworkName);
            if(tempenternumber > 1){
                someCodeToCreateNewItem(homeworkName);
            }
            else{
                footerFunction();
                someCodeToCreateNewItem(homeworkName);
            }
            document.getElementById("InputEnterID").value = "";
            document.getElementById("leftNumber").innerHTML = (InputItemArray.length-CompleteHW.length) + " left";
            
        }
    })
}

//Add the homeworks that make sure they are completed or not 
function someCodeToCreateNewItem(homeworkName){

    const itemNode = document.createElement("LI"); //create the element of "li"
    const wrapper = document.createElement("DIV"); //create the element of "div"
    const h1homework = document.createElement("H1"); //create the element of "h1"
    const homeworkText = document.createTextNode(homeworkName); //create the text of "homeworkName"
    const checkbox = document.createElement("INPUT"); //create the element of "input"
    const labelbox = document.createElement("LABEL"); //create the element of "label"
    const imagex = document.createElement("IMG"); //create the element of "img"
    let countcd = homeworkName;
    //labelbox.setAttribute("class","todo-app__checkbox.label"); //set attribute of "class" and its sub elemnt label
    

   
    labelbox.setAttribute("for",countcd);
    checkbox.setAttribute("type","checkbox"); //set attribute of checkbox input
    checkbox.setAttribute("id",countcd);
    checkbox.addEventListener("click",function(){someFuncToHandleOnClick(countcd)},false); //addEventListener with function of it's paramter.   
    
    wrapper.appendChild(checkbox); //append child node of check box
    wrapper.appendChild(labelbox); //append child node of label box, attention, the "input" should in front of "label"
    wrapper.setAttribute("class","todo-app__checkbox");
    
    
    h1homework.appendChild(homeworkText); //set the homework name
    h1homework.setAttribute("class","todo-app__item-detail");
    const countcdh1 = countcd + "h1"
    h1homework.setAttribute("id",countcdh1);

    imagex.setAttribute("class","todo-app__item-x"); //set the image "x" to clear the homework when you finish them;
    imagex.setAttribute("src","./img/x.png");

    imagex.addEventListener("click",function(){
        let deletedName = this.parentElement.childNodes[1].textContent;
        InputItemArray = InputItemArray.filter(e => e !== deletedName);
        this.parentElement.remove();
        document.getElementById("leftNumber").innerHTML = (InputItemArray.length-CompleteHW.length) + " left";
    },false)
    
    itemNode.appendChild(wrapper);
    itemNode.appendChild(h1homework);
    itemNode.appendChild(imagex);
    itemNode.setAttribute("class","todo-app__item");
    let countitem = countcd + "Item";
    itemNode.setAttribute("id",countitem);// set the name of "id" which is the place that can be remove by "Clear Complete" button
    document.querySelector(".todo-app__list").appendChild(itemNode);

    
}

//Finish the homework
function someFuncToHandleOnClick(countcd){
    let checkBox = document.getElementById(countcd);
    let countcdh1 = countcd + "h1";
    let h1Text = document.getElementById(countcdh1);


    if(checkBox.checked == true){
        const InputItemArrayPlem = [...InputItemArray];//copy from var "InputItemArray" to constant "InputItemArrayPlem"
        //NoCompleteHW = InputItemArray;
        CompleteHW.push(countcd);
        document.getElementById("leftNumber").innerHTML = (InputItemArray.length-CompleteHW.length) + " left";
        //Check the "Completed HW" and "Non Completed HW" with the array
        for(let i = 0; i < InputItemArrayPlem.length; i++){
            for(let j = 0; j<CompleteHW.length; j++){
                if(CompleteHW[j] === InputItemArrayPlem[i]){
                    InputItemArrayPlem.splice(i,1);
                }
            }
        }
        NoCompleteHW = InputItemArrayPlem;
        //If the checkBox is checked, line through the checkBox;
        h1Text.style.textDecoration = "line-through";
    }else{
        document.getElementById("leftNumber").innerHTML = ((InputItemArray.length-CompleteHW.length) + 1) + " left";
        h1Text.style.textDecoration = "none"
    }
  
}

//Footer with some buttons
function footerFunction(){
    const footerCreate = document.createElement("FOOTER");
    footerCreate.setAttribute("class","todo-app__footer");
    const todoapp_total = document.createElement("DIV");
    todoapp_total.setAttribute("class","todo-app__total");
    todoapp_total.setAttribute("id","leftNumber");
    const todoapp_view_button = document.createElement("UL");
    todoapp_view_button.setAttribute("class","todo-app__view-buttons");
    const todoapp_clean = document.createElement("DIV");
    todoapp_clean.setAttribute("class","todo-app__clean");
    footerCreate.appendChild(todoapp_total);
    footerCreate.appendChild(todoapp_view_button);
    footerCreate.appendChild(todoapp_clean);
    document.querySelector(".todo-app__root").appendChild(footerCreate);
    //All, Active, Completed three button;
    All_Active_Completed();

    //Clean Completed HW button
    CleanCompleteFunction();
    
}


function AllShow(){

    
    const AllUL = document.createElement("UL");
    AllUL.setAttribute("class","todo-app__All");
    let AllHWLI = [...InputItemArray];
    let AllHWConst = [...InputItemArray];



    
    for(let i = 0; i < AllHWLI.length; i++){
        AllHWConst[i] = AllHWLI[i] + "Item";
        
    }
    var all;
    for(let i = 0; i < AllHWLI.length; i++){
        all = document.getElementById(AllHWConst[i]);
        all.style.display = "flex";
        AllUL.appendChild(all);
    }
    document.querySelector(".todo-app__main").appendChild(AllUL);
    
}
//Delete the input homework that you have finished it.
function ActiveShow(){
    const ActiveUL = document.createElement("UL");
    ActiveUL.setAttribute("class","todo-app__Active");
    let CompleteHWLI = [...CompleteHW]; // copy "CompleteHW" to "CompleteHWLI" array to preare to clear the complele homework
    let NoCompleteHWLI = [...NoCompleteHW]; //copy "NoCompleteHW" to "CompleteHWLI"
    let CompleteConst = [...CompleteHW]; //Copy "CompleteHW" to "CompleteConst"
    let NoCompleteConst = [...NoCompleteHW]; //Copy "NoCompleteHW" to "CompleteConst"
    for(let i = 0; i < CompleteHWLI.length; i++){
        CompleteConst[i] = CompleteHWLI[i] + "Item";
    }
    
    
    for(let i = 0; i < NoCompleteHWLI.length; i++){
        NoCompleteConst[i] = NoCompleteHWLI[i] + "Item";
    }    

    let cp;
    var ncp;
    
    
    for(let i = 0; i < CompleteHWLI.length;i++){
        cp = document.getElementById(CompleteConst[i]);
        cp.style.display = "none";
    }
    

    for(let i = 0; i < NoCompleteHWLI.length; i++){
        
        ncp = document.getElementById(NoCompleteConst[i]);
        ncp.style.display = "flex";
        ActiveUL.appendChild(ncp);
    }

    document.querySelector(".todo-app__main").appendChild(ActiveUL);

    
}

function CompleteShow(){
    const CompleteUL = document.createElement("UL");
    CompleteUL.setAttribute("class","todo-app__Complete");
    let CompleteHWLI = [...CompleteHW];// copy "CompleteHW" to "CompleteHWLI" array to preare to clear the complele homework
    let NoCompleteHWLI = [...NoCompleteHW];
    let CompleteConst = [...CompleteHW];
    let NoCompleteConst = [...NoCompleteHW];
    
    /*if(CompleteConst.length === 0){
        /*
        CompleteHWLI = document.createElement("LI");
        CompleteHWLI.setAttribute("class","todo-app__item");
        CompleteUL.appendChild(CompleteHWLI);
        for(let i = 0; i < NoCompleteConst.length; i++){
            NoCompleteConst[i] = NoCompleteConst[i] + "Item";
            let nocp = document.getElementById(NoCompleteConst[i]);
            nocp.style.display = "none";
            //nocp.remove(); 
        }
        
    
    }else{}*/
    for(let i = 0; i < CompleteHWLI.length; i++){
        CompleteConst[i] = CompleteHWLI[i] + "Item";

    }
    
    
    for(let i = 0; i < NoCompleteHWLI.length; i++){
        NoCompleteConst[i] = NoCompleteHWLI[i] + "Item";


    }
    
        
    let cp;
    var ncp;
    
    for(let i = 0; i < NoCompleteConst.length;i++){
        ncp = document.getElementById(NoCompleteConst[i]);
        ncp.style.display = "none";  
    }
    

    for(let i = 0; i < CompleteHWLI.length; i++){     
        cp = document.getElementById(CompleteConst[i]);
        cp.style.display = "flex";
        CompleteUL.appendChild(cp);
    }
    

    document.querySelector(".todo-app__main").appendChild(CompleteUL);

}

//Delete the list of already completed homework
function deleteCompleteHomework(){

    let CompleteHWLI = [...CompleteHW]; // copy "CompleteHW" to "CompleteHWLI" array to preare to clear the complele homework
    let CompleteHWConst = [...CompleteHW]; // copy "CompleteHW" to "CompleteHWConst"
    for(let i = 0; i < CompleteHWLI.length; i++){
        CompleteHWLI[i] = CompleteHWLI[i] + "Item"; //The name with "li" in function "someCodeToCreateNewItem"
    }
    var el;
    for(let i = 0; i < CompleteHWLI.length; i++){
        el = document.getElementById(CompleteHWLI[i]);
        el.remove();// remove "li"
        InputItemArray = InputItemArray.filter(e => e!==CompleteHWConst[i]);
        CompleteHW = CompleteHW.filter(e => e!== CompleteHWConst[i]);
    }
}

function CleanCompleteFunction(){
    const ClearCompleteText = document.createTextNode("Clear Complete")
    const ClearComplete = document.createElement("BUTTON");
    ClearComplete.appendChild(ClearCompleteText);
    ClearComplete.addEventListener("click",() => {
        deleteCompleteHomework();
    },false);
    document.querySelector(".todo-app__clean").appendChild(ClearComplete);
}

function All_Active_Completed(){
    
    //For action "All" in <li><button></button></li>
    const AllText = document.createTextNode("All");
    const AllBT = document.createElement("BUTTON");
    const AllLI = document.createElement("LI");
    
    //For acition "Active" in <li><button></button></li>
    const ActiveText = document.createTextNode("Active");
    const ActiveBT = document.createElement("BUTTON");
    const ActiveLI = document.createElement("LI");
    
    //For action "Completed" in <li><button></button></li>
    const CompleteText = document.createTextNode("Completed");
    const CompleteBT = document.createElement("BUTTON");
    const CompleteLI = document.createElement("LI");

    AllBT.appendChild(AllText);
    AllLI.appendChild(AllBT);
    AllLI.addEventListener('click', (e) => {
        AllShow();
    })
    ActiveBT.appendChild(ActiveText);
    ActiveLI.appendChild(ActiveBT);
    ActiveLI.addEventListener('click',(e) => {
        ActiveShow();
    })
    CompleteBT.appendChild(CompleteText);
    CompleteLI.appendChild(CompleteBT);
    CompleteLI.addEventListener('click' ,(e) =>{
        CompleteShow();
    })

    document.querySelector(".todo-app__view-buttons").appendChild(AllLI);
    document.querySelector(".todo-app__view-buttons").appendChild(ActiveLI);
    document.querySelector(".todo-app__view-buttons").appendChild(CompleteLI);
}

