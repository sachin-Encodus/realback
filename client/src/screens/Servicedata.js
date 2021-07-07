import apple from "../images/iphone12.png";
import Laptop from "../images/macbook.png";
import Airpod from "../images/airpodpro.png";
import Max from "../images/cpu.png";
import Watch from "../images/iwatch.png";
import ipad from "../images/ipad.png";
import Led from "../images/net.png";
import Speaker from "../images/speaker.png";
const data = {
  mobile: [
    {
      id: "1",
      productName: "Mobile",
      data: {
        name: "mobile",
        image: apple,
      },

      price: 156400,
      image: apple,
    },

    {
      id: "2",
      productName: "Laptop",
      data: {
        name: "laptop",
        image: Laptop,
      },
      price: 2400,
      image: Laptop,
    },
    {
      id: "3",
      productName: "Ipad",
      data: {
        name: "ipad",
        image: ipad,
      },
      price: 1000,
      image: ipad,
    },
    {
      id: "4",
      productName: "Watch",
      data: {
        name: "watch",
        image: Watch,
      },
      price: 1000,
      image: Watch,
    },
    {
      id: "5",
      productName: "Airpod",
      data: {
        name: "airpod",
        image: Airpod,
      },
      price: 1000,
      image: Airpod,
    },
    {
      id: "6",
      productName: "led",
      data: {
        name: "led",
        image: Led,
      },
      price: 1000,
      image: Led,
    },
    {
      id: "7",
      productName: "Drone",
      data: {
        name: "drone",
        image: Max,
      },
      price: 1000,
      image: Max,
    },
    {
      id: "8",
      productName: "Power bank",
      data: {
        name: "powerbank",
        image: Speaker,
      },
      price: 1000,
      image: Speaker,
    },
  ],
};
export default data;
