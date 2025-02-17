/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react'
import { data } from '../../assets/data';

const Quiz = () => {

    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false);

    let option1 = useRef(null);
    let option2 = useRef(null);
    let option3 = useRef(null);
    let option4 = useRef(null);

    let optionArray = [option1, option2, option3, option4];

    const checkAnswer = (e, ans) => {
        if(lock === false) {
            if(question.ans === ans) {
                e.target.classList.add("bg-green-200", "border", "border-[2px]", "border-green-500");
                setLock(true);
                setScore(prev => prev + 1);
            }
            else {
                e.target.classList.add("bg-red-200", "border", "border-[2px]", "border-red-500"); 
                setLock(true);
                optionArray[question.ans-1].current.classList.add("bg-green-200", "border", "border-[2px]", "border-green-500");
            }
            setLock(true);
        }
    }

    const next = () => {
        if(lock === true) {
            if(index === data.length - 1) {
                setResult(true);
                return 0;
            }
            setIndex(prevIndex => {
                let newIndex = prevIndex + 1;
                setQuestion(data[newIndex]);
                setLock(false);
                optionArray.forEach(option => {
                    option.current.classList.remove("bg-red-200", "border", "border-[2px]", "border-red-500");
                    option.current.classList.remove("bg-green-200", "border", "border-[2px]", "border-green-500");
                    return null;
                })
                return newIndex;
            })
        }
    }

    const reset = () => {
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false);
    }

    const getMessage = (score, total) => {
        let percentage = (score / total) * 100;
        if(percentage >= 80) {
            return "🎉 Excellent! You're a quiz master!";
        }
        else if(percentage >= 60) {
            return "👍 Good job! Keep it up!";
        }
        else if(percentage >= 40) {
            return "🙂 Average! You can do better!";
        }
        else {
            return "😔 Try again! Keep practicing!";
        }
    }

  return (
    <div className='h-[100vh] md:h-[100vh] flex flex-col items-center justify-center bg-[#1E2A47] py-2 md:py-4'>
        <div className='w-[300px] md:w-[500px] lg:w-[600px] md:mt-2 bg-white flex flex-col gap-5 rounded-md py-2 md:py-4 lg:py-6 px-6 md:px-8 lg:px-12 text-black font-Primary'>
            <h1 className='text-xl md:text-2xl lg:text-3xl text-center font-bold py-1 md:py-3 border-b-2 border-black rounded-lg'>Quiz App</h1>
            {result ? <></> : <>
                <h2 className='text-base lg:text-lg'>{index+1}. {question.question}</h2>
                <ul className='flex flex-col gap-1 md:gap-2'>
                    <li ref={option1} onClick={(e) => {checkAnswer(e, 1)}}
                    className='py-2 px-4 text-sm lg:text-lg border-[1px] border-black rounded-lg cursor-pointer'>{question.option1}</li>
                    <li ref={option2} onClick={(e) => {checkAnswer(e, 2)}}
                    className='py-2 px-4 text-sm lg:text-lg border-[1px] border-black rounded-lg cursor-pointer'>{question.option2}</li>
                    <li ref={option3} onClick={(e) => {checkAnswer(e, 3)}}
                    className='py-2 px-4 text-sm lg:text-lg border-[1px] border-black rounded-lg cursor-pointer'>{question.option3}</li>
                    <li ref={option4} onClick={(e) => {checkAnswer(e, 4)}}
                    className='py-2 px-4 text-sm lg:text-lg border-[1px] border-black rounded-lg cursor-pointer'>{question.option4}</li>
                </ul>
                <button onClick={next}
                className='py-2 lg:py-3 lg:px-6 bg-blue-700 w-1/2 md:w-1/3 text-center rounded-xl mx-auto text-2xl font-medium text-white hover:bg-blue-500'>Next</button>
                <div className='text-center'>
                    <p>{index+1} of {data.length} questions</p>
                </div>
            </>}  

            {/* Result Card */}
            {result ? <>
                <h2 className='text-xl md:text-3xl font-semibold'>You Scored {score} out of {data.length}</h2>
                <h3 className='text-base md:text-xl font-medium'>{getMessage(score, data.length)}</h3>
                <button onClick={reset}
                className='py-3 px-6 bg-blue-700 w-1/2 md:w-1/3 text-center rounded-xl mx-auto text-2xl font-medium text-white hover:bg-blue-500'>Reset</button>
            </> : <></>}
            
        </div>
    </div>
  )
}

export default Quiz
