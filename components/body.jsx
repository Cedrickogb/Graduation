import React, { useState } from "react";

export default function  Body () {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);

  const choices = ["🪨", "🍁", "✂️"];

  const handleChoice = (choice) => {
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    setUserChoice(choice);
    setComputerChoice(computerChoice);

    if (choice === computerChoice) {
      setResult("egality");
    } else if (
      (choice === "🪨" && computerChoice === "✂️") ||
      (choice === "🍁" && computerChoice === "🪨") ||
      (choice === "✂️" && computerChoice === "🍁")
    ) {
      setResult("victory");
    } else {
      setResult("game over");
    }
  };

  return (
    <div>
        <div className="border p-4 m-5 mt-20 sm:mx-20 lg:m-10 lg:mt-32 lg:mx-60 shadow-xl rounded-xl flex flex-col items-center justify-center">
            <h1 className="text-4xl text-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Pierre feuille ciseaux </h1>
            <div className="flex justify-between space-x-4 m-4">
                <div className="border p-6 shadow-lg rounded-xl">
                    Ordinateur : {" "} <span className="text-5xl ">{computerChoice ? computerChoice  : <span className="text-base">?</span> }</span>
                </div>

                <div className="border p-6 shadow-lg rounded-xl">
                    Vous : <span className="text-5xl"> {userChoice ? userChoice : <span className="text-base">?</span> } </span>
                </div>   
            </div>

            <div className="flex space-x-4">
                <button onClick={() => handleChoice("🪨")} className="px-3 py-1 text-xl bg-transparent border rounded-xl shadow-lg hover:bg-slate-200 transition-all ease-in-out duration-500"> 🪨 </button>
                <button onClick={() => handleChoice("🍁")} className="px-3 py-1 text-xl bg-transparent border rounded-xl shadow-lg hover:bg-slate-200 transition-all ease-in-out duration-500"> 🍁 </button>
                <button onClick={() => handleChoice("✂️")} className="px-3 py-1 text-xl bg-transparent border rounded-xl shadow-lg hover:bg-slate-200 transition-all ease-in-out duration-500"> ✂️ </button>
            </div>

            <div className="p-1 m-4">
                {
                    result=="egality" &&  <h2 className="text-2xl text-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Egalité</h2>
                }
                {
                    result=="victory" &&  <h2 className="text-2xl text-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-lime-600">Vous avez gagné</h2>
                }
                {
                    result=="game over" &&  <h2 className="text-2xl text-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">L'ordinateur à gagner</h2>
                }
            </div>
        </div>
    </div>
  );
};
