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
    All_Active_Completed();
    CleanCompleteFunction();
    
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
        for(let i = 0; i < InputItemArrayPlem.length; i++){
            for(let j = 0; j<CompleteHW.length; j++){
                if(CompleteHW[j] === InputItemArrayPlem[i]){
                    InputItemArrayPlem.splice(i,1);
                }
            }
        }
        NoCompleteHW = InputItemArrayPlem;
        //h1homework.setAttribute("class","todo-app__item-detail");
        //let h1Text = document.getElementById(countcdh1);
        h1Text.style.textDecoration = "line-through";
    }else{
        document.getElementById("leftNumber").innerHTML = ((InputItemArray.length-CompleteHW.length) + 1) + " left";
        h1Text.style.textDecoration = "none"
    }
  
}
function TestNumber(){
    //alert("Tot: " + InputItemArray.length + ",Complete: " + CompleteHW.length + ",NotComplete " + NoComplete.length);
    alert("Tot: " + InputItemArray.length + ",Complete: " + CompleteHW.length + ",NoComplete: " + NoCompleteHW.length);
    /*for(let i = 0; i < NoCompleteHW.length;i++){
        alert(NoCompleteHW[i]);
    }*/
}

function AllShow(){

    
    const AllUL = document.createElement("UL");
    AllUL.setAttribute("class","todo-app__All");
    let AllHWLI = [...InputItemArray];
    let AllHWConst = [...InputItemArray];

    /*
    let AllHWLI = document.createElement("LI");
    AllHWLI.setAttribute("class","todo-app__item");
    AllHWLI.style.display = "none";
    AllUL.appendChild(AllHWLI);
    document.querySelector(".todo-app__main").appendChild(AllUL);
    */

    
    for(let i = 0; i < AllHWLI.length; i++){
        AllHWConst[i] = AllHWLI[i] + "Item";
        //AllHWLI[i] = document.createElement("LI");
        //AllHWLI[i].setAttribute("id",AllHWConst[i]);
        
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
    let CompleteHWLI = [...CompleteHW];// copy "CompleteHW" to "CompleteHWLI" array to preare to clear the complele homework
    let NoCompleteHWLI = [...NoCompleteHW];
    let CompleteConst = [...CompleteHW];
    let NoCompleteConst = [...NoCompleteHW];
    for(let i = 0; i < CompleteHWLI.length; i++){
        //CompleteHWLI[i] = CompleteHWLI[i] + "Active";
        
        
        CompleteConst[i] = CompleteHWLI[i] + "Item";
        //CompleteHWLI[i] = document.createElement("LI");
        //CompleteHWLI[i].setAttribute("id",CompleteConst[i]);
        
        //CompleteHWLI[i] = document.createElement("LI");
        //CompleteHWLI[i].setAttribute("id",CompleteConst[i]);
        
        //CompleteHWLI[i].setAttribute("id",CompleteHWLIConst);
        //alert(CompleteHWLIConst);
    }
    
    
    for(let i = 0; i < NoCompleteHWLI.length; i++){
        NoCompleteConst[i] = NoCompleteHWLI[i] + "Item";
        //NoCompleteHWLI[i] = document.createElement("LI");
        //NoCompleteHWLI[i].setAttribute("id",NoCompleteConst[i]);
        
        //NoCompleteHWLI[i] = document.createElement("LI");
        //NoCompleteHWLI[i].setAttribute("id",NoCompleteConst[i]);

    }
    
    //alert("Test");
    
    
    
    let cp;
    var ncp;
    
    
    for(let i = 0; i < CompleteHWLI.length;i++){
        cp = document.getElementById(CompleteConst[i]);
        //cp.remove();
        cp.style.display = "none";
    }
    

    for(let i = 0; i < NoCompleteHWLI.length; i++){
        
        ncp = document.getElementById(NoCompleteConst[i]);
        ncp.style.display = "flex";
        ActiveUL.appendChild(ncp);
        //alert(CompleteConst[i]);
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
        //CompleteHWLI[i] = document.createElement("LI");
        //CompleteHWLI[i].setAttribute("id",CompleteConst[i]);
    }
    
    
    for(let i = 0; i < NoCompleteHWLI.length; i++){
        NoCompleteConst[i] = NoCompleteHWLI[i] + "Item";
        //NoCompleteHWLI[i] = document.createElement("LI");
        //NoCompleteHWLI[i].setAttribute("id",NoCompleteConst[i]);

    }
    
        
    let cp;
    var ncp;
    
    for(let i = 0; i < NoCompleteConst.length;i++){
        //alert(NoCompleteConst[i]);
        ncp = document.getElementById(NoCompleteConst[i]);
        //ncp.remove(); 
        ncp.style.display = "none";  
    }
    

    for(let i = 0; i < CompleteHWLI.length; i++){     
        cp = document.getElementById(CompleteConst[i]);
        cp.style.display = "flex";
        CompleteUL.appendChild(cp);
    }
    

    document.querySelector(".todo-app__main").appendChild(CompleteUL);

}
function deleteCompleteHomework(){

    let CompleteHWLI = [...CompleteHW];// copy "CompleteHW" to "CompleteHWLI" array to preare to clear the complele homework
    let CompleteHWConst = [...CompleteHW];
    for(let i = 0; i < CompleteHWLI.length; i++){
        CompleteHWLI[i] = CompleteHWLI[i] + "Item"; //The name with "li" in function "someCodeToCreateNewItem"
    }
    var el;
    for(let i = 0; i < CompleteHWLI.length; i++){
        el = document.getElementById(CompleteHWLI[i]);
        el.remove();// remove "li"
        InputItemArray = InputItemArray.filter(e => e!==CompleteHWConst[i]);
        CompleteHW = CompleteHW.filter(e => e!== CompleteHWConst[i]);
        //el.style.display = "none";
    }
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

/*
function CanceltheDot(){
    return this.parentElement.remove();
    //alert("Test");
    //InputItemArray = InputItemArray.

}*/
