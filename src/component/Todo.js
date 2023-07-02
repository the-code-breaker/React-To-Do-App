import React, { useEffect, useState } from 'react'
import "./style.css";

const Todo = () => {

    const [inputData, setInputData] = useState("");

    const getlocalStorage = () => {
        const lists = localStorage.getItem("todolist");
        if(lists){
            return JSON.parse(lists);
        }
        else{
            return [];
        }
    }

    const [items, setItems] = useState(getlocalStorage);
    const [isEditItem, setIsEditItem] = useState(""); 
    const error = () =>{
        document.getElementById('itemerror').innerHTML = "please enter something!";
    }



    const addItems = () => {
        if(!inputData){
            error();
        }
        else if(inputData && toggleButton){
            setItems(
                items.map((currElem) => {
                    if(currElem.id === isEditItem){
                        return{...currElem, name: inputData};
                    }
                    return currElem;
                })
            )
            setInputData("");
            setIsEditItem(null);
            settoggleButton(false);
            
        }
        else{
            const itemList = {
                id: new Date().getTime().toString(),
                name: inputData,
            };
            document.getElementById('itemerror').innerHTML = "";
            setItems([...items, itemList]);
            setInputData("");
        }
        
    }

    const deleteItem = (index) => {
        const updatedList = items.filter((currElem) =>{
                return currElem.id  !== index;
        });
        setItems(updatedList);
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            addItems();
        }
    }

    const editItem = (index) => {
        const edit = items.find((currElem)=>{
            return currElem.id == index;
        })
        setInputData(edit.name);
        settoggleButton(true);
        setIsEditItem(index);

    }

    const[toggleButton, settoggleButton] = useState(false);

   useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(items));
   }, [items])

  return (
   <>
   <div className="main-container">
    <div className="toDoBox">
        <div className="heading">
            <h1>TODO</h1>
            <i class="fa-regular fa-sun"></i>
        </div>
        <div className="input_section">
            <input type="text" onKeyDown={handleKeyDown} placeholder='Create a new todo...' value={inputData} onChange={(e) => setInputData(e.target.value)} />
            {toggleButton ? <i class="fa-regular fa-floppy-disk" id='savetoggle' onClick={addItems}></i> : <i class="fa-solid fa-plus" onClick={addItems}></i>}
        </div>
        <span id='itemerror'>{error}</span>

        <div className="addedItemsSection">

        {items.map((currElem)=>{
           return(
            <div className="items">
            <h2>{currElem.name}</h2>
            <i class="fa-solid fa-pen-to-square" onClick={()=> editItem(currElem.id)}></i>
            <i class="fa-solid fa-trash-can" onClick={()=> deleteItem(currElem.id)}></i>
        </div>
           )
        })}

        </div>

    </div>
   </div>
   </>
  )
}

export default Todo