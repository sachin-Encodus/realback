import apple from '../images/iphone12.png'
import Laptop from '../images/macbook.png'
import Airpod from '../images/airpodpro.png'
import Max from '../images/cpu.png'
import Watch from '../images/iwatch.png'
import ipad from '../images/ipad.png'
import Led from '../images/net.png'
import Speaker from '../images/speaker.png'
const data = {
 mobile: [
    {
      id: '1',
        productName: "Mobile",
      name: '/mobile',
      price: 156400,
      image: apple,
    },
    
    {
      id: '2',
        productName: "Laptop",
      name: '/laptop',
      price: 2400,
      image: Laptop,
    },
    {
      id: '3',
        productName: "Ipad",
      name: '/ipad',
      price: 1000,
      image:ipad ,
    },
     {
      id: '4',
        productName: "Watch",
      name: '/watch',
      price: 1000,
      image: Watch,
    },
     {
      id: '5',
        productName: "Airpod",
      name: '/airpod',
      price: 1000,
      image: Airpod,
    },
     {
      id: '6',
       productName: "led",
      name: 'usb',
      price: 1000,
      image: Led,
    },
{
      id: '7',
        productName: "Airpod",
      name: '/tablate',
      price: 1000,
      image: Max,
    },
     {
      id: '8',
       productName: "SmartTV",
      name: '/drone',
      price: 1000,
      image: Speaker,
    },

  ]
}
export default data;