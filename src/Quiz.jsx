import React, { useState, useRef } from "react";
import { data } from "./assets/data";                                           // importing questions and answers from data.js file

function QuizApp() {

    let [index, setIndex] = useState(0);                                        // Index of current question
    let [question, setQuestion] = useState(data[index]);                        // Current question object
    let [lock, setLock] = useState(false);                                      // Lock to prevent multiple answers
    let [score, setScore] = useState(0);                                        // User Score
    let [result, setResult] = useState(false);                                  // For checking if quiz is completed or not

    let Option1 = useRef(null);                                                 // Ref's for option element
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    let option_array = [Option1, Option2, Option3, Option4];                   // Putting them in an array

    const checkAns = (e, ans) => {                                             // Function to check the selected answers
        if (lock === false) {
            if (question.ans == ans) {                                         // If correct answer then ,
                e.target.classList.add("Correct");                             // Then add Correct class to that option [makes the option green]
                setLock(true);                                                 // Lock the answers
                setScore(prev => prev + 1);                                    // Increment the score
            } else {                                                           // If answer is wrong then , 
                e.target.classList.add("Wrong");                               // Then add Wrong class to that option [makes the option red]
                setLock(true);
                option_array[question.ans - 1].current.classList.add("Correct")     // Mark the correct answer
            }
        }
    }

    const next = () => {                                                       // Function to move to the next question
        if (lock === true) {
            if (index === data.length - 1) {                                   // If it is the last question
                setResult(true);                                               // Then the quiz is complete
                return 0;
            }
            setIndex(++index);                                                 // Move to the next question
            setQuestion(data[index]);                                          // Set a new question object
            setLock(false);                                                    // Unlock answers
            option_array.map((option) => {
                option.current.classList.remove("Wrong");                     // Remove Wrong class
                option.current.classList.remove("Correct");                   // Remove Correct class
                return null;
            })
        }
    }

    const reset = () => {                                                     // Function to the reset the quiz
        setIndex(0);                                                          // Resetting everything 
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false);
    }

    return (                                                                 // Quiz structure
        <>
            <div className="quiz-container">
                <div className="quiz-title-container">
                    <h2>QUIZ | DO YOUR BEST</h2>
                    <hr></hr>
                    {result ? <></> : <>                                                                
                    <div>
                        <h3 className="question">{index + 1}. {question.question}</h3>
                        <ul className="options">
                            <li ref={Option1} onClick={(e) => { checkAns(e, 1) }} >{question.option1}</li>
                            <li ref={Option2} onClick={(e) => { checkAns(e, 2) }} >{question.option2}</li>
                            <li ref={Option3} onClick={(e) => { checkAns(e, 3) }} >{question.option3}</li>
                            <li ref={Option4} onClick={(e) => { checkAns(e, 4) }} >{question.option4}</li>
                        </ul>
                    </div>
                        <button onClick={next} className="next-btn">Next</button>
                        <div className="quiz-index">{index + 1} out of {data.length} questions</div>
                    </>}
                    {result ? <>
                                <h2 className="score" >You Scored {score} out of {data.length}</h2>
                                <button className="reset-btn" onClick={reset}>Reset</button>
                            </> : <></>}
                    
                </div>

            </div>

        </>
    );
}

export default QuizApp;