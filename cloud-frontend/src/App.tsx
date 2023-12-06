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

import { IGraphData } from './infrastructure/interfaces/data.interfaces';
import { options } from './infrastructure/config/graph.config';

const BASE_URL = 'http://localhost:3000';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function App() {
  const [graphData, setGraphData] = useState<IGraphData>();

  useEffect(() => {
    const socket = io(BASE_URL, {
      transports: ['websocket', 'polling'],
    });

    socket?.emit('/get-last-live-data', '', {}, (cb: IGraphData) => setGraphData(cb));

    socket.on('update', async (data: IGraphData) => setGraphData(data));

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
    <div className="app">
      <div className="app__graph-container">
        {data ? <Line options={options} data={data} /> : 'No Data Yet'}
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
}

export default App;
