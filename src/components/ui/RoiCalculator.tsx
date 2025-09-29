import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Info, ArrowRight } from 'lucide-react';

interface RoiCalculatorProps {}

const RoiCalculator: React.FC<RoiCalculatorProps> = () => {
  const [electricityBill, setElectricityBill] = useState<number>(5000);
  const [systemSize, setSystemSize] = useState<number>(5);
  const [results, setResults] = useState({
    monthlySavings: 0,
    yearlySavings: 0,
    paybackPeriod: 0,
    lifetimeSavings: 0,
    carbonOffset: 0,
  });

  // Update system size based on electricity bill
  const handleElectricityBillChange = (value: number) => {
    setElectricityBill(value);
    // Map Rs.1000 -> 1 kW, Rs.2000 -> 2 kW, etc.
    const newSystemSize = Math.max(1, Math.round(value / 1000));
    setSystemSize(newSystemSize);
  };

  // Calculate ROI based on inputs
  useEffect(() => {
    const avgCostPerKw = 60000; // Average cost per kW in INR
    const totalCost = systemSize * avgCostPerKw;
    const monthlySavings = electricityBill * 0.9; // Assuming 90% savings
    const yearlySavings = monthlySavings * 12;
    const paybackPeriod = totalCost / yearlySavings;
    const lifetimeSavings = yearlySavings * 25 - totalCost; // 25 years lifespan
    const carbonOffset = systemSize * 1.5 * 12; // 1.5 tonnes per kW per year

    setResults({
      monthlySavings,
      yearlySavings,
      paybackPeriod,
      lifetimeSavings,
      carbonOffset,
    });
  }, [electricityBill, systemSize]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <Calculator className="h-6 w-6 text-primary-500 mr-2" />
        <h3 className="text-xl font-semibold">Solar ROI Calculator</h3>
      </div>
      
      <p className="text-gray-600 mb-6">
        Calculate your potential savings and return on investment with solar energy.
      </p>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Monthly Electricity Bill (₹)
        </label>
        <input
          type="range"
          min="1000"
          max="20000"
          step="500"
          value={electricityBill}
          onChange={(e) => handleElectricityBillChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between mt-2">
          <span className="text-sm text-gray-500">₹1,000</span>
          <span className="text-sm font-medium text-gray-800">₹{electricityBill.toLocaleString()}</span>
          <span className="text-sm text-gray-500">₹20,000</span>
        </div>
      </div>
      
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          System Size (kW)
        </label>
        <input
          type="range"
          min="1"
          max="20"
          step="1"
          value={systemSize}
          onChange={(e) => setSystemSize(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between mt-2">
          <span className="text-sm text-gray-500">1 kW</span>
          <span className="text-sm font-medium text-gray-800">{systemSize} kW</span>
          <span className="text-sm text-gray-500">20 kW</span>
        </div>
      </div>
      
      <div className="bg-primary-50 rounded-lg p-6">
        <h4 className="font-semibold text-lg mb-4">Your Estimated Savings</h4>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">Monthly Savings:</span>
              <span className="font-medium">₹{results.monthlySavings.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((results.monthlySavings / electricityBill) * 100, 100)}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className="bg-primary-500 h-2 rounded-full"
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">Yearly Savings:</span>
              <span className="font-medium">₹{results.yearlySavings.toLocaleString()}</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">Payback Period:</span>
              <span className="font-medium">{results.paybackPeriod.toFixed(1)} years</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">25-Year Savings:</span>
              <span className="font-medium">₹{results.lifetimeSavings.toLocaleString()}</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">Carbon Offset (Yearly):</span>
              <span className="font-medium">{results.carbonOffset.toFixed(1)} tonnes CO₂</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-start">
          <Info className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-500">
            This calculator provides estimates based on average solar performance in India. Actual savings may vary based on location, roof orientation, and local electricity rates.
          </p>
        </div>
      </div>
      
      <div className="mt-6">
        <a
          href="#contact"
          className="btn btn-secondary w-full flex items-center justify-center"
        >
          Get Detailed Analysis
          <ArrowRight className="ml-2 h-5 w-5" />
        </a>
      </div>
    </div>
  );
};

export default RoiCalculator;
