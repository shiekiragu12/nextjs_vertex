'use client'

import React, { useState } from "react";
import { getFunFactsAction } from "./actions";

export default function Home() {
    const [animal, setAnimal] = useState('');
    const [funFacts, setFunFacts] = useState<string[]>([]);
    async function getNewFunFacts() {
        const funFacts = await getFunFactsAction(animal);
        setFunFacts(funFacts);
    }
    return (
        <main>
            <h1 className="text-xl">Animal Fun Facts!</h1>
            <label className="m-2 p-2 text-lg">Animal</label>
            <input
                placeholder="dog"
                value={animal}
                onChange={(e) => setAnimal(e.target.value)}
                className="m-2 p-2 border-2 rounded text-black"
            />
            <button
                onClick={getNewFunFacts}
                className="hover:bg-white m-2 p-2 border-2 rounded font-bold hover:text-black"
            >
                Get New Fun Facts
            </button>
            <ul className="list-disc list-inside">
                {funFacts.map(function (thing) {
                    return <li key={thing}>{thing}</li>
                })}
            </ul>
        </main>
    );
}
