import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import TableRow from './TableRow';
import env from "react-dotenv";
const Billing = () => {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data: response } = await axios.get('https://cors-anywhere.herokuapp.com/https://snapmeter.com/api/public/services/2080448990210/bills?start=2022-01-01&end=2023-02-01', {
                headers: {
                  'Authorization': env.KEY
                }
              })
              console.log('this is the response in billing', response);
            setResult(response.data);
          } catch (error) {
            console.error(error)
          }
          setLoading(false);
        };
    
        fetchData();
       // setResult(billingData.data);
    }, []);
    console.log('this is result.data ', result);
    return (
        <div class="container mx-auto text-center bg-teal rounded mt-12 text-white">
                    <div class="flex flex-col dark:bg-slate-800">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full">
                <thead class="bg-white border-b">
                  <tr>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Billing Dates
                    </th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      TND Cost
                    </th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    General Cost
                    </th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Total Cost
                    </th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                     Usage
                    </th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Tariff
                    </th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Demand
                    </th>
                  </tr>
                </thead>
                <tbody>
                { result && result.map((item) => (
                   <TableRow data={item.attributes} />
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
        </div>
    );
}

export default Billing;