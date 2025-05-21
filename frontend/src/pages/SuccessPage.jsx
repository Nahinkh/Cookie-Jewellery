import React from 'react'
import { useAppContext } from '../context/AppContext';

const SuccessPage = () => {
    const {navigate} = useAppContext();
  return (
    <div className="min-h-screen bg-green-100 p-6 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-6">Thank you for your purchase. Your order is being processed.</p>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
          onClick={() =>navigate('/')}
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}

export default SuccessPage