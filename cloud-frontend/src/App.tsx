import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import './App.css';

const BASE_URL = 'http://localhost:3000';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Devices Chart',
    },
  },
} as any;

interface IDataset {
  label: string;
  data: number[];
  color: string;
}

interface IGraphData {
  labels: Array<string>;
  datasets: Array<IDataset>;
}

function App() {
  const [graphData, setGraphData] = useState<IGraphData>();

  useEffect(() => {
    const socket = io(BASE_URL, {
      transports: ['websocket', 'polling'],
    });

    socket?.emit('/get-last-live-data', '', {}, (cb: IGraphData) => setGraphData(cb));

    socket.on('update', async (data: IGraphData) => setGraphData(data));

    // Clean up the socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const data = useMemo(() => {
    if (graphData) {
      return {
        labels: graphData.labels,
        datasets: graphData.datasets.map(({ color, ...rest }) => ({
          ...rest,
          backgroundColor: color,
          borderColor: color,
        })),
      };
    }
  }, [graphData]);

  return (
    <div className="App">
      <div
        style={{ width: '80vw', height: 'calc(100vh - 40px)', margin: '0 auto', padding: '20px' }}
      >
        {data ? <Line options={options} data={data} /> : 'No Data Yet'}
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
}

export default App;
