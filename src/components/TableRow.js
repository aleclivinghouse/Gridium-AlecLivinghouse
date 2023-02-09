import React, { Fragment } from 'react';

const TableRow = ({data}) => {
    const {start, end, cost, demandUnit, demand, genCost, tariff, tndCost, use, useUnit} = data;
    const genPercentage = genCost / cost * 100;
    const tndPercentage = tndCost / cost * 100;
    return (
              <>
                  <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> {start} - {end}</td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        
                        <div class="mb-1 text-base font-medium text-red-700 dark:text-red-500">${tndCost}</div>
                      <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                        <div class="bg-red-600 h-2.5 rounded-full" style={{width: tndPercentage}}></div>
                      </div>
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <div class="mb-1 text-base font-medium text-yellow-700 dark:text-yellow-500">${genCost}</div>
                      <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                        <div class="bg-yellow-600 h-2.5 rounded-full" style={{width: genPercentage}}></div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${cost}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {use} ({useUnit})
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {tariff}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                     {demand} ({demandUnit})
                    </td>
                  </tr>
              </>
             
    );
}

export default TableRow;