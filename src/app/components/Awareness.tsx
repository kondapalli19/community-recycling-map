"use client";

import React, { useState } from "react";

type WasteItem = {
  id: number;
  name: string;
  type: "plastic" | "paper" | "glass" | "trash";
};

const items: WasteItem[] = [
  { id: 1, name: "Plastic Bottle", type: "plastic" },
  { id: 2, name: "Newspaper", type: "paper" },
  { id: 3, name: "Glass Jar", type: "glass" },
  { id: 4, name: "Food Waste", type: "trash" },
  { id: 5, name: "Milk Carton", type: "paper" },
  { id: 6, name: "Soda Can", type: "trash" },
  { id: 7, name: "Plastic Straw", type: "plastic" },
  { id: 8, name: "Magazine", type: "paper" },
  { id: 9, name: "Broken Glass", type: "glass" },
  { id: 10, name: "Chip Bag", type: "trash" },
  { id: 11, name: "Plastic Bag", type: "plastic" },
  { id: 12, name: "Cardboard Box", type: "paper" },
];


const bins: WasteItem["type"][] = ["plastic", "paper", "glass", "trash"];

export default function Awareness() {
  const [score, setScore] = useState(0);
  const [currentItem, setCurrentItem] = useState<WasteItem>(
    items[Math.floor(Math.random() * items.length)]
  );
  const [message, setMessage] = useState("");

  const handleDrop = (binType: WasteItem["type"]) => {
    if (binType === currentItem.type) {
      setScore(score + 1);
      setMessage("✅ Correct! Good job.");
    } else {
      setMessage("❌ Oops! Try again.");
    }

    // Show next item
    setCurrentItem(items[Math.floor(Math.random() * items.length)]);
  };

  return (
    <section className="relative h-screen w-full bg-green-50 flex flex-col items-center justify-center text-center px-4" id="learn">
      <h1 className="text-4xl font-bold text-green-700 mb-4">
        Sort the Waste: Recycling Challenge
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Click the correct bin for the shown waste item!
      </p>

      <div className="text-2xl font-semibold mb-4">
        Item: <span className="text-blue-600">{currentItem.name}</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        {bins.map((bin) => (
          <button
            key={bin}
            className="bg-white border-2 border-green-500 rounded-lg p-4 w-40 h-20 shadow hover:bg-green-100"
            onClick={() => handleDrop(bin)}
          >
            {bin.charAt(0).toUpperCase() + bin.slice(1)} Bin
          </button>
        ))}
      </div>

      <div className="text-xl text-green-600 mb-2">{message}</div>
      <div className="text-lg text-gray-800">Score: {score}</div>

      <button
        className="mt-8 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full"
        onClick={() => {
          setScore(0);
          setMessage("");
          setCurrentItem(items[Math.floor(Math.random() * items.length)]);
        }}
      >
        Get Started
      </button>

    </section>
  );
}
