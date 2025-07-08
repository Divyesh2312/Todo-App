import React from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const CustomPagination = ({
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  setPageSize,
  pageSize,
  rowsPerPageOptions = [10, 20, 30], 
}) => {
  return (
    <div className="flex items-center justify-between mt-6 px-4 border-t pt-4">
      {/* Left side: Rows per page selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">Rows per page:</span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="bg-white  border-2 border-black rounded-md px-3 py-2 cursor-pointer"
        >
          {rowsPerPageOptions.map((option) => (
            <option key={option} value={option} className=' hover:bg-orange-500 hover:text-white'>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Right side: Previous and Next buttons */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Previous Page Button */}
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className={`flex items-center justify-center p-3 rounded-full ${
            canPreviousPage
              ? 'bg-orange-500 hover:bg-orange-600'
              : 'bg-gray-300 cursor-not-allowed'
          } text-white transition duration-200 ease-in-out`}
          title="Previous Page"
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>

        {/* Next Page Button */}
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className={`flex items-center justify-center p-3 rounded-full ${
            canNextPage
              ? 'bg-orange-500 hover:bg-orange-600'
              : 'bg-gray-300 cursor-not-allowed'
          } text-white transition duration-200 ease-in-out`}
          title="Next Page"
        >
          <FiChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default CustomPagination
