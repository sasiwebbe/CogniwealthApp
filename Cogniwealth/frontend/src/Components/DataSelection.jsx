// import React, { useContext, useEffect, useState } from 'react'
// import "../css/DataSelection.css"
// import {imageLinks} from "../data"
// import axios from 'axios';
// import FinanceImages from './FinanceImages';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGears } from '@fortawesome/free-solid-svg-icons';
// import Chatpage from './Chatpage';
// import { Utilscontext } from '../Context/Utils';


// function DataSelection() {
//   const {isProcessClicked,setisProcessClicked} =useContext(Utilscontext)
//   console.log("Dataselctiob");
//   // const {setIspattu} =useContext(Utilscontext)
 
//   const [SelectedData,setSelectedData]=useState([])
//   const [isClicked,setisClicked]=useState(false)
  
//   const {isDataSelected,setisDataSelected}=useContext(Utilscontext)

//   function generate(){
//     setisClicked(!isClicked)
//     setisDataSelected(true)
    
//   }
  
//     function handle(link){
//       setSelectedData((prevArray) => {
//         return [...prevArray, link ];
//       });
          
//     }
//     const give=async()=>{
//       var myParams={
//        data: Array.from(new Set(SelectedData))
//       }
//      axios.post("http://localhost:5000/api/give",myParams).then((response)=>console.log(response))
//      .catch((error)=>console.log(error))
//    }
//       useEffect(()=>{
//           give()
//       },[isClicked])
   

     
// if(!isDataSelected) return (
//     <div className='data-container' >
//       <a onClick={()=>setisProcessClicked(false)} style={{cursor:"pointer"}}>Back</a>
//       <h1>Select Your <span style={{color:"#E0C766"}}>OWN</span> data to be loaded</h1>
//       <div className='data-images-container'>
//       <div className="varisu" >
//         {/* {imageLinks.map((items)=>{
//           return <a  className='finance-images' onClick={()=>handle(items.item)}><FinanceImages id='choose' image={items.src}/>
//         })} */}
//         {imageLinks.map((items)=><a style={{border:"2px solid red",width:"max-content"}} className='finance-images' onClick={()=>handle(items.item)}><FinanceImages image={items.src}  /></a>)}
//         </div>
//       </div>
//       <button  className='btn btn-go' onClick={generate}>Process<FontAwesomeIcon icon={faGears} /></button>
//     </div>
//   )

//   else return <Chatpage/>
// }

// export default DataSelection


//google code

import React, { useContext, useEffect, useState } from 'react';
import "../css/DataSelection.css";
import { imageLinks } from "../data";
import axios from 'axios';
import FinanceImages from './FinanceImages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft, faGears } from '@fortawesome/free-solid-svg-icons';
import { Context } from './Context';

function DataSelection() {
  
  console.log("DataSelection");

  const {selectedData, setSelectedData,isClicked, setIsClicked} = useContext(Context); // Use lowercase for consistency
 

  

  function generate() {
    setIsClicked(true);
    

  
    const uniqueData = Array.from(new Set(selectedData)); 
    give(uniqueData); 
  }

  const handleImageClick = (link) => {
    setSelectedData((prevData) => {
      const updatedData = [...prevData];
      const index = updatedData.indexOf(link);

      if (index !== -1) { 
        updatedData.splice(index, 1);
      } else { // If link doesn't exist, add it
        updatedData.push(link);
      }

      return updatedData;
    });
  };

  const give = async (urls) => {
    try {
      const response = await axios.post("http://localhost:5000/process-urls", {urls});
      console.log("JS",response); // Handle successful response (e.g., show success message)
    } catch (error) {
      console.error(error); // Handle errors (e.g., show error message)
    }
  };

  useEffect(() => {
   
      give(selectedData); // Send selected data on component mount/update if clicked
    
  }, [isClicked]); // Include selectedData in dependency array

  return (
   
      
      <div className="data-container" id='wealthtool'>

        <h2>Select Your <span style={{ color: "#E0C766" }}>OWN</span> data to be loaded</h2>
        <div className="data-images-container">
          
            {imageLinks.map((item) => (
              <a
                key={item.item} // Add a unique key for each item
                style={{
                  border: selectedData.includes(item.item) ? "5px dashed #14cb2d" : "none", // Gold border
                  borderRadius: "10px", 
                  padding:"1px",
                  width: "max-content",
                }}
                className="finance-images"
                onClick={() => handleImageClick(item.item)}
              >
               <div className="varisu"> <FinanceImages image={item.src} /></div>
              </a>
            ))}
         
        </div>
        <div className='forward-backward'>
        <a className="btn btn-go" onClick={generate}>
          Process <FontAwesomeIcon icon={faGears} />
        </a>
        
        </div>
      </div>
     
    );
}

export default DataSelection;

