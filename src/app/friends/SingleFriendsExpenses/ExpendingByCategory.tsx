import React from 'react'

const ExpendingByCategory = () => {
    return (

        <div>
            <div className="mb-6">
                <div className="font-semibold text-gray-800">Spending by category</div>
                <div className="text-sm text-gray-600">Non-group expenses :: General</div>
                <div className="flex justify-between mt-2">
                    <div className="text-sm text-gray-700">October</div>
                    <div className="text-sm text-gray-500">$9,560.00</div>
                </div>
                <div className="flex justify-between mt-2">
                    <div className="text-sm text-gray-700">November</div>
                    <div className="text-sm text-gray-500">$12,200.00</div>
                </div>
                <div className="flex justify-between mt-2">
                    <div className="text-sm text-gray-700">December</div>
                    <div className="text-sm text-gray-500">$3,425.00</div>
                </div>
            </div>

            {/* Notes Section */}
            <div className="mb-2">
                <div className="font-semibold text-gray-800">Notes and Comments</div>
                <textarea
                    className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                    placeholder="Add a comment..."
                ></textarea>
            </div>

            {/* Post Button */}
            <div className="flex justify-end">
                <button className="bg-blue-500 text-white px-4 py-1 rounded-md font-thin">Post</button>
            </div>
        </div>

    )
}

export default ExpendingByCategory
