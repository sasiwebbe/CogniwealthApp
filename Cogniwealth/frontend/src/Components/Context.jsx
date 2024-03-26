import { createContext, useEffect, useState } from "react";
import runChat from "./Gemini";
import { imageLinks } from "../data";

export const Context = createContext();

const ContextProvider = (props) => {
	const [input, setInput] = useState("");
	const [recentPrompt, setRecentPrompt] = useState("");
	const [prevPrompts, setPrevPrompts] = useState([]);
	const [showResults, setShowResults] = useState(false);
	const [loading, setLoading] = useState(false);
	const [resultData, setResultData] = useState("");
	const [selectedData, setSelectedData] = useState([]); // Use lowercase for consistency
    const [isClicked, setIsClicked] = useState(false);
    const [banks,setBanks]=useState([])
	useEffect(()=>{
		imageLinks.filter((data)=>selectedData.includes(data.item)).map(filteredName => (
			setBanks((pre)=>Array.from(new Set([...pre,filteredName.name])))
		  ))

		  
	},[selectedData])

	  console.log("context",banks)
	const delayPara = (index, nextWord) => {
		setTimeout(function () {
			setResultData((prev) => prev + nextWord);
		}, 10 * index);
	};
    const newChat = () =>{
        setLoading(false);
        setShowResults(false)
    }

	const onSent = async (prompt) => {
		setResultData("");
		setLoading(true);
		setShowResults(true);
        let response;
        if(prompt !== undefined){
			const Template= `
			Imagine you're a financial advisor providing personalized investment recommendations
			 to a client who prefers to invest with BANK NAME: ${banks}. 
			 The client has expressed interest in ${prompt}, seeking tailored advice to 
			 optimize their investment strategy. Your response should include an analysis of
			  potential investment options available through BANK NAME: ${banks}, considering 
			  factors such as risk level, potential returns, and alignment with the client's 
			  financial objectives. Additionally, discuss any specific features or offerings
			unique to BANK NAME: ${banks} that could benefit the client's investment portfolio. 
			  Aim to provide  actionable insights and recommendations that empower the client to make informed investment decisions
			`
			console.log("Template",Template)
            response = await runChat(Template);
            setRecentPrompt(prompt)
			
        }else{
            setPrevPrompts(prev=>[...prev,input]);
            setRecentPrompt(input);
            response=await runChat(input);
			console.log("Template",Template)
        }
		
		try {
			
			
			let responseArray = response.split("**");
            let newResponse = "";
			for (let i = 0; i < responseArray.length; i++) {
				if (i === 0 || i % 2 !== 1) {
					newResponse += responseArray[i];
				} else {
					newResponse += "<b>" + responseArray[i] + "</b>";
				}
			}
			let newResponse2 = newResponse.split("*").join("<br/>");
			let newResponseArray = newResponse2.split("");
			for (let i = 0; i < newResponseArray.length; i++) {
				const nextWord = newResponseArray[i];
				delayPara(i, nextWord + "");
			}
		} catch (error) {
			console.error("Error while running chat:", error);
			// Handle error appropriately
		} finally {
			setLoading(false);
			setInput("");
		}
	};

	const contextValue = {
		prevPrompts,
		setPrevPrompts,
		onSent,
		setRecentPrompt,
		recentPrompt,
		input,
		setInput,
		showResults,
		loading,
		resultData,
		newChat,
		selectedData,
		setSelectedData,
		isClicked,
		setIsClicked
	};

	return (
		<Context.Provider value={contextValue}>{props.children}</Context.Provider>
	);
};

export default ContextProvider;
