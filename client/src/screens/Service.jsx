import React ,{useEffect , useState}from 'react';
import { Link ,Redirect } from 'react-router-dom';
import Footer from './Footer';
import Menu from './Menu'
import { isAuth } from '../helpers/auth';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

import data from './Servicedata'
import useQuery from "./Query";





const Service = () =>{
  // const query = useQuery();
  // const dogString = query.get("choosenDog");
  // const dogObject = JSON.parse(dogString);

  // console.log("====================================", dogObject.payds);

  const [cities, setCities] = useState([]);
  const [selectedCounty, setSelectedCountry] = useState("Selected country");
  const [selectedCity, setSelectedCity] = useState("Selected city");

  const countries = {
    France: ["Paris", "Marseille", "Lille", "Lyon"],
    Usa: ["New York", "San Francisco", "Austin", "Dallas"],
    Brazil: ["São Paulo", "Rio de Janeiro", "Salvador"],
  };

  const countryList = Object.keys(countries).map((key) => ({
    name: key,
  }));

  function handleCountrySelect(e) {
    console.log("Selected country", e.target.value);
    const countrySel = e.target.value;
    const citiesSel =
      countrySel !== "" ? countries[countrySel] : "Selected country";
    setSelectedCountry(countrySel);
    setCities(citiesSel);
    setSelectedCity("Selected city");
  }

  function handleCitySelect(e) {
    console.log("Selected city", e.target.value);
    const citiesSel = e.target.value;
    setSelectedCity(citiesSel);
  }

  const { mobile } = data;

  useEffect(() => {
    console.log("====================================", mobile);

    AOS.init({
      duration: 1000, // values from 0 to 3000, with step 50ms
    });
  }, []);

  return (
    <div>
      <Menu />
      {!isAuth() ? <Redirect to="/login" /> : null}

      <div class="container ">
        {/* <h1 class=" mt-5 ">Get your </h1>
        <h1>device service</h1> */}
      </div>

      <div class="shell">
        <div class="container">
          <div
            style={{
              backgroundColor: "#f5f5f7",
              fontFamily: "sans-serif",
              padding: 20,
              textAlign: "center",
              borderRadius: 10,
              marginTop: 55,
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Choose your device for which you are looking for services
          </div>
          <div class="row">
            {mobile.map((product) => (
              <div class="col-6 col-sm-6  col-md-3 col-lg-3 ">
                <div class="wsk-cp-product">
                  <Link
                    to={{
                      pathname: "/device",
                      search: `routeName=${JSON.stringify(product.data)}`, //dog is the object to pass along
                    }}
                  >
                    <div class="wsk-cp-img">
                      <img
                        src={product.image}
                        alt="Product"
                        class="img-responsive"
                      />
                    </div>

                    <div class="wsk-cp-text">
                      {/* <div style={{backgroundColor:'#000' , borderRadius:20}}  > */}

                      <div class="category">
                        <span>{product.productName}</span>
                      </div>

                      <div class="title-product">
                        {/* <h3>Get your device Service</h3> */}
                      </div>

                      {/* </div> */}
                      {/* <div class="card-footer">
              <div class="wcf-left"><span class="price">Rp500.000</span></div>
              <div class="wcf-right"><a href="#" class="buy-btn"><i class="zmdi zmdi-shopping-basket"></i></a></div>
            </div> */}
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
    
export default Service;

   

   