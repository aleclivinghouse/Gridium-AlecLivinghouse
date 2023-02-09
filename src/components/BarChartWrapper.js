import React, {
    useState,
    useEffect
} from 'react';
import axios from 'axios';
import BarChart from './BarChart';
import env from "react-dotenv";



const BarChartWrapper = () => {

        const [result, setResult] = useState({});
        const [loading, setLoading] = useState(false);
        const [selected, setSelected] = useState("Hour");
        const [valuesArr, setValuesArr] = useState([]);
        const [labelsArr, setLabelsArr] = useState([]);
        let max = 100;
        const formOptions = ["Month", "Day", "Hour", 'All Data Points'];

        useEffect(() => {
            const fetchData = async () => {
              try {
                const { data: response } = await axios.get('https://cors-anywhere.herokuapp.com/https://snapmeter.com/api/public/meters/2080448990211/readings?start=2022-08-01&end=2023-02-01', {
                    headers: {
                      'Authorization': env.KEY
                    }
                  })
                    console.log('this is the response ', response);
                    setResult(response);
                    getInitialValues(response);
              } catch (error) {
                 console.error(error)
              }
                 setLoading(false);
            };

            fetchData();
        }, []);
        const getInitialValues = (result) => {
            let obj = groupDates(result.data[0].attributes.readings.kw, 'Hour');
            setLabelsArr(Object.keys(obj));
            let tempArr = [];
            for(let property in obj) {
                tempArr.push(obj[property].total);
                setValuesArr(tempArr);
            }

        }
        const groupDates = (data, groupBy) => {
            const group = {
                'Month': 7,
                'Day': 10,
                'Hour': 14

            }
            let map = {};
            for(let property in data) {
                if(data[property] !== null) {
                    let str = property.slice(0, group[groupBy]);
                    if(!map[str]) {
                        map[str] = {};
                        map[str].count = 1
                        map[str].total = data[property]

                    } else {
                        map[str].count++;
                        map[str].total += data[property]

                    }
                }
            }
            return map;

        }
        const submit = () => {
            if(selected !== 'All Data Points') {
                let obj = groupDates(result.data[0].attributes.readings.kw, selected);
                setLabelsArr(Object.keys(obj));
                let tempArr = [];
                for(let property in obj) {
                    tempArr.push(obj[property].total);
                    setValuesArr(tempArr);
                }
            } else {
                let obj = result.data[0].attributes.readings.kw;
                setLabelsArr(Object.keys(obj));
                setValuesArr(Object.values(obj));
            }
        };

    return (
        <div>
            <div className="relative w-full lg:max-w-sm">
            <form className="flex flex-row">
            <select 
            className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
            value={selected} 
            onChange={e => setSelected(e.target.value)}>
                {formOptions.map((value) => (
                <option value={value} key={value}>
                    {value}
                </option>
                ))}
            </select>
            <button type="button" onClick={submit} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-5">
                Submit
            </button>
            </form>
        </div>
            <div class="flex items-center justify-center">
            { 
                selected !== ""
                ? `Number of Kilowatts Per ${selected}`
                : 'Number of Kilowatts Per Hour'
            }
                
            </div>
            <div>

            { 
                loading
                ? <div> Loading </div> 
                : <BarChart  labelsArr={labelsArr} valuesArr={valuesArr}/>
            }
            </div>
        </div>
    );
}

export default BarChartWrapper;

/*
*/