// disallows tree-shaking
import {
  Chart,
  Colors,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend
} from 'chart.js'
import { getAquisitionsByYear } from './api/cube.js'

Chart.register(
  Colors,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend
);

(async function () {
  const data = await getAquisitionsByYear();

  new Chart(
    document.getElementById('acquisitions'),
    // {
    //   type: 'bar',
    //   data: {
    //     labels: data.map(row => row.year),
    //     datasets: [
    //       {
    //         label: 'Acquisitions by year',
    //         data: data.map(row => row.count)
    //       }
    //     ]
    //   }
    // }
    {
      type: 'bar',
      options: {
        animation: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        }
      },
      data: {
        labels: data.map(row => row.year),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: data.map(row => row.count)
          }
        ]
      }
    }
  );
})();