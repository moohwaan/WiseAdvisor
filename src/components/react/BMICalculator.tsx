import React, { useState } from 'react';

const BMICalculator = () => {
    const [weight, setWeight] = useState<number | ''>('');
    const [height, setHeight] = useState<number | ''>('');
    const [bmi, setBmi] = useState<number | null>(null);
    const [status, setStatus] = useState<string>('');

    const calculateBMI = (e: React.FormEvent) => {
        e.preventDefault();
        if (weight && height) {
            const heightInMeters = height / 100;
            const bmiValue = weight / (heightInMeters * heightInMeters);
            setBmi(parseFloat(bmiValue.toFixed(2)));

            if (bmiValue < 18.5) setStatus('Underweight');
            else if (bmiValue < 25) setStatus('Normal weight');
            else if (bmiValue < 30) setStatus('Overweight');
            else setStatus('Obese');
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 max-w-md mx-auto">
            <h3 className="text-2xl font-serif font-bold text-navy-900 mb-4 text-center">BMI Calculator</h3>
            <form onSubmit={calculateBMI} className="space-y-4">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Weight (kg)</label>
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(parseFloat(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-500"
                        placeholder="e.g. 70"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Height (cm)</label>
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(parseFloat(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-500"
                        placeholder="e.g. 175"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-royal-600 text-white font-bold py-2 px-4 rounded-md hover:bg-royal-700 transition-colors"
                >
                    Calculate BMI
                </button>
            </form>

            {bmi !== null && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center animate-fade-in">
                    <p className="text-gray-600 text-sm">Your BMI is</p>
                    <p className="text-4xl font-bold text-navy-900 my-2">{bmi}</p>
                    <p className={`text-lg font-semibold ${status === 'Normal weight' ? 'text-green-600' : 'text-orange-500'
                        }`}>
                        {status}
                    </p>
                </div>
            )}
        </div>
    );
};

export default BMICalculator;
