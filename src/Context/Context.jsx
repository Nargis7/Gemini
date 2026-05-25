import { createContext } from "react";
import runChat from "../config/gemini";
import { useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState('');
    const [recentPrompts, setRecentPrompts] = useState('');
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showresult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState('');

    const delayPara = (index,nextword) =>{
        setTimeout(()=>{
            setResultData(prev=>prev+nextword);
        }, 75*index)
         
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
       
    }

  const onSent = async (prompt) => {
    setResultData('');
    setLoading(true);
    setShowResult(true);
    let response;
    if(prompt !== undefined){
        response = await runChat(prompt);
        setRecentPrompts(prompt);
    }else{
        setPrevPrompts(prev=>[...prev, input]);
        setRecentPrompts(input);
        response = await runChat(input);
    }
    let responseArray = response.split('**');
    let newResponse='';
    for(let i=0; i< responseArray.length;i++){
        if(i == 0 || i%2 !==1){
            newResponse +=responseArray[i];
        }else{
            newResponse +="<br>"+responseArray[i]+"<br>";
        }
    }
    let newResponse2 = newResponse.split('*').join('<br>');
    let newresponseArray = newResponse2.split(' ');
    for(let i=0; i<newresponseArray.length;i++){
       const nextword = newresponseArray[i] + ' ';
       delayPara(i,nextword+' ');
    }
    setLoading(false);
    setInput('');
  };


  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompts,
    recentPrompts,
    showresult,
    loading,
    resultData,
    input,
    setInput,
    newChat


  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;