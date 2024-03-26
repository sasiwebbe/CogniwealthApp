import React, { useContext } from 'react'
import '../css/ChatPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Context } from './Context'
import { faCirclePlus, faPaperPlane, faPenToSquare, faPlay } from '@fortawesome/free-solid-svg-icons'
import { imageLinks } from '../data'
import FinanceImages from './FinanceImages'
function ChatPage() {

    const {
		onSent,
		recentPrompt,
		showResults,
		loading,
		resultData,
		setInput,
		input,
        newChat,
        selectedData, setSelectedData,isClicked, setIsClicked
	} = useContext(Context);
    
    console.log(selectedData)

    const handleCardClick = (promptText) => {
        setInput(promptText);
    };
    const EditData = ()=>{
       setIsClicked(false)
    }
  return (
    <div >

      <div className="selected_data_layer">
        {

            imageLinks.filter((data)=>selectedData.includes(data.item)).map(filteredName => (
                <span className='selected_data_layer_img'><FinanceImages image={filteredName.src}/></span>
              ))}
        
      </div>

    
        <div className="chat_layer">
         {
            !showResults ? (
                <>
                    <div className="greet">
                        <p>
                            <span>Welcome To Cogniwealth </span>
                        </p>
                        <p style={{maxWidth:"700px"}}>How Can i Help You With  Financial Related Problems</p>
                    </div>
                    <div className="cards">
                        <div
                            className="card"
                            onClick={() =>
                                handleCardClick("What are the benefits of investing in Fixed Deposits (FDs) compared to other bank investment options")
                            }
                        >
                            <p>What are the benefits of investing in Fixed Deposits (FDs) compared to other bank investment options </p>
                            {/* <img src={assets.compass_icon} alt="" /> */}
                        </div>
                        <div
                            className="card"
                            onClick={() =>
                                handleCardClick(
                                    "How do I calculate the interest earned on a Fixed Deposit (FD)?"
                                )
                            }
                        >
                            <p>How do I calculate the interest earned on a Fixed Deposit (FD)? </p>
                            {/* <img src={assets.message_icon} alt="" /> */}
                        </div>
                        <div
                            className="card"
                            onClick={() =>
                                handleCardClick("Can I invest in government bonds through my bank, and what are the advantages of doing so?")
                            }
                        >
                            <p>Can I invest in government bonds through my bank, and what are the advantages of doing so?</p>
                            {/* <img src={assets.bulb_icon} alt="" /> */}
                        </div>
                        <div
                            className="card"
                            onClick={() => {
                                handleCardClick(
                                    "Are there any tax implications to consider when investing in bank products like FDs or RDs? "
                                );
                            }}
                        >
                            <p>Are there any tax implications to consider when investing in bank products like FDs or RDs? </p>
                            {/* <img src={assets.code_icon} alt="" /> */}
                        </div>
                    </div>
                </>
            ) : (
                <div className="response-layer">
                        <div className='user_query flex'>
                            <span>➡️</span>
                            <p>{recentPrompt}</p>
                        </div>
                        <div className='llm_response flex'>
                            <span><img src=''></img></span>
                            {loading ? (
								<div className="loader">
									Loading...
								</div>
							) : (
								<p dangerouslySetInnerHTML={{ __html: resultData }}></p>
							)}
                        </div>
                </div>
            )
}
                <div className="input_layer">
                        <a href='#wealthtool' onClick={()=>newChat()}><FontAwesomeIcon icon={faCirclePlus} /></a>
                    <div className='input_box'> <input type='text' onChange={(e) => {
								setInput(e.target.value);
							}} value={input} placeholder='Query Here !!'></input><a id='send' style={{display:"inline-block",cursor:"pointer"}} onClick={() => {
                                onSent();
                            }}><FontAwesomeIcon icon={faPaperPlane} /></a></div>
                        <a href='#wealthtool' onClick={EditData}><FontAwesomeIcon icon={faPenToSquare} /></a>
                </div>
        </div>


    </div>
  )
}

export default ChatPage
