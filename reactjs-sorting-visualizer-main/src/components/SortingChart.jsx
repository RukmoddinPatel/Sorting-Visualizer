import { useContext, useEffect, useState } from "react";
import { SortingContext } from "../contexts/SortingContext";
import algorithmInfos from "../data/algorithmInfos";

function SortingChart() {
    const { sortingState, generateSortingArray, startVisualizing, changeSortingSpeed, changeAlgorithm } = useContext(SortingContext);
    const [manualInput, setManualInput] = useState("");

    const handleManualArray = () => {
        const inputArray = manualInput
            .split(",")
            .map((val) => parseInt(val.trim()))
            .filter((num) => !isNaN(num));
        generateSortingArray(inputArray);
    };

    const algorithms = [
        { key: "bubble_sort", label: "Bubble Sort" },
        { key: "insertion_sort", label: "Insertion Sort" },
        { key: "selection_sort", label: "Selection Sort" },
        { key: "merge_sort", label: "Merge Sort" },
        { key: "quick_sort", label: "Quick Sort" },
        { key: "radix_sort", label: "Radix Sort" },
    ];

    const maxValue = Math.max(...sortingState.array.map((bar) => bar.value), 1); // avoid divide by zero

    return (
        <div className="mt-4 mb-4 flex flex-col items-center">
            <img src="/logo.png" alt="Sorting Visualizer Logo" className="max-w-lg mb-6 w-full" />

            <div className="flex flex-wrap justify-center gap-3 mb-6">
                {algorithms.map(({ key, label }) => (
                    <button
                        key={key}
                        onClick={() => changeAlgorithm(key)}
                        className={`bg-carbon text-white px-5 py-3 rounded-3xl transition-all ${
                            sortingState.algorithm === key ? "bg-turquoise-dark" : "hover:bg-carbon-light"
                        }`}
                        aria-label={`Choose ${label}`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <div className="mb-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Enter comma-separated values"
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value)}
                    className="bg-carbon-light px-4 py-2 rounded-md text-white outline-none w-80"
                />
                <button onClick={handleManualArray} className="bg-turquoise-dark px-4 py-2 rounded-md text-white">
                    Submit Array
                </button>
            </div>

            <div className="max-w-3xl w-full">
                <div className="mb-4 chart-container">
                    <div className="base"></div>
                    {sortingState.array.map((bar, i) => (
                        <div key={i} className="bar-container">
                            <div
                                className={`select-none bar bar-${bar.state}`}
                                style={{ height: `${Math.floor((bar.value / maxValue) * 100)}%` }}
                            >
                                <p className={`pl-1.5 ${bar.state === "idle" ? "text-[#B1D2CF]" : "text-[#D8B7BE]"}`}>{bar.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-4 max-w-3xl mb-8">
                    <button
                        disabled={sortingState.sorting}
                        onClick={startVisualizing}
                        className="px-4 py-2 push-btn text-white-light disabled:brightness-75"
                    >
                        Start
                    </button>
                    <button
                        disabled={sortingState.sorting}
                        onClick={generateSortingArray}
                        className="text-white-light disabled:brightness-75"
                    >
                        Generate New Array
                    </button>
                    <select
                        disabled={sortingState.sorting}
                        onChange={changeSortingSpeed}
                        defaultValue="slow"
                        className="ml-auto bg-carbon px-2 py-2 rounded-md cursor-pointer outline-none focus:ring ring-turquoise-dark disabled:brightness-75 disabled:cursor-default"
                        aria-label="Change Sorting Speed"
                    >
                        <option value="slow">Slow</option>
                        <option value="normal">Normal</option>
                        <option value="fast">Fast</option>
                    </select>
                </div>

                <div className="w-full h-0.5 bg-carbon-light mb-4" />
                <div>
                    <h1 className="font-bold text-2xl md:text-4xl">{algorithmInfos[sortingState.algorithm].name}</h1>
                    <p className="whitespace-pre-line mb-6">{algorithmInfos[sortingState.algorithm].description}</p>
                    <div className="w-full h-0.5 bg-carbon-light mb-6" />

                    <div className="overflow-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr>
                                    <th className="px-4 border-r border-carbon-light" rowSpan={2}>Algorithm</th>
                                    <th className="px-4 border-r border-carbon-light" colSpan={3}>Time Complexity</th>
                                    <th className="px-4">Space Complexity</th>
                                </tr>
                                <tr className="border-b border-carbon-light">
                                    <th className="px-4 pb-2">Best</th>
                                    <th className="px-4 pb-2">Average</th>
                                    <th className="px-4 pb-2 border-r border-carbon-light">Worst</th>
                                    <th className="px-4 pb-2">Worst</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(algorithmInfos).map(([key, info], i) => (
                                    <tr key={key} className="hover:bg-carbon-light whitespace-nowrap">
                                        <td className={`px-4 py-1 ${i === 0 ? "pt-2" : ""} border-r border-carbon-light`}>{info.name}</td>
                                        <td className={`px-4 py-1 ${i === 0 ? "pt-2" : ""}`}>
                                            <span className={`px-1.5 py-0.5 rounded-md bg-${info.time_complexity.best[1]}`}>{info.time_complexity.best[0]}</span>
                                        </td>
                                        <td className={`px-4 py-1 ${i === 0 ? "pt-2" : ""}`}>
                                            <span className={`px-1.5 py-0.5 rounded-md bg-${info.time_complexity.average[1]}`}>{info.time_complexity.average[0]}</span>
                                        </td>
                                        <td className={`px-4 py-1 ${i === 0 ? "pt-2" : ""} border-r border-carbon-light`}>
                                            <span className={`px-1.5 py-0.5 rounded-md bg-${info.time_complexity.worst[1]}`}>{info.time_complexity.worst[0]}</span>
                                        </td>
                                        <td className={`px-4 py-1 ${i === 0 ? "pt-2" : ""}`}>
                                            <span className={`px-1.5 py-0.5 rounded-md bg-${info.space_complexity[1]}`}>{info.space_complexity[0]}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SortingChart;
