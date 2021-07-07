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
    <>
      <Menu />
      {!isAuth() ? <Redirect to="/login" /> : null}

      {/* 

    <div className="App">
      <h1>Example DropDown {selectedCounty} and {selectedCity}</h1>

      <div className="Container">
        <select
          name="Countries"
          onChange={e => handleCountrySelect(e)}
          value={selectedCounty}
        >
          <option value="">Select the country</option>
          {countryList.map((country, key) => (
            <option key={key} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>

        <select
          name="Cities"
          onChange={e => handleCitySelect(e)}
          value={selectedCity}
        >
          <option value="">Select the city</option>
          {cities.map((city, key) => (
            <option key={key} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
    </div>
   */}

      {/* <div  className="container-fluid">
     <div className="row">
    <div className="wrapper mt-5 d-flex justify-content-center align-items-center ">
  


 <img src={process.env.PUBLIC_URL+"images/mi.jpeg"}  alt="" className="  mt-5"/>

    </div>

     </div>

 </div>



    <br/><br/><br/><br/><br/><br/> */}
      {/* <div className="container">
        <h4 style={{display: 'inline-block'}}>Repair Services</h4>
      
        <br/>
        <div className="row ">

            <div className="cards"      >
                 <Link to="/mobile">  
                    <div className="card-item">
                    
                    <img src={apple} alt="" className="card-image-1"/> 
                   
                        <div className="card-info text-center ">
                            <h2 className="card-title">Mobile</h2>
                            <p className="card-intro">Far far away, behind the word mountains, far from the countries
                                Vokalia and Consonantia, there live the blind texts.</p>
                        </div>
                    </div>
                 </Link>
            </div>
            <div className="cards"      >
                 <Link to="/laptop">
                <div className="card-item">
                   
                  <div  className="card-image-3" >
                    <img src={Laptop} alt=""  className="img-fluid"   /> 
                  </div>
                         
             
                    <div className="card-info text-center">
                        <h2 className="card-title">Laptop</h2>
                        <p className="card-intro">Far far away, behind the word mountains, far from the countries Vokalia
                            and Consonantia, there live the blind texts.</p>
                    </div>
                </div>
                    </Link>
            </div>
            <div className="cards"        >
                   <Link to="/ipad">
                <div className="card-item">
                 
                     <img src={Laptop} alt="" className="card-image-2"/> 
                  
                    <div className="card-info">
                        <h2 className="card-title">IPad</h2>
                        <p className="card-intro">Far far away, behind the word mountains, far from the countries Vokalia
                            and Consonantia, there live the blind texts.</p>
                    </div>
                </div>
                  </Link>
            </div>
            <div  className="cards"      >
                   <Link to="/watch">
                <div className="card-item">
                 
                     <img src={Watch} alt="" className="card-image-2"/> 
                 
                    <div className="card-info text-center">
                        <h2 className="card-title">Smartwatch</h2>
                        <p className="card-intro">Far far away, behind the word mountains, far from the countries Vokalia
                            and Consonantia, there live the blind texts.</p>
                    </div>
                </div>
                   </Link>
            </div>
            <div className="cards"      >
                  <Link to="/airpod">
                <div className="card-item">
                  
                    <img src={Airpod} alt="" className="card-image-2"/> 
                
                    <div className="card-info text-center">
                        <h2 className="card-title">Airpods</h2>
                        <p className="card-intro">Far far away, behind the word mountains, far from the countries Vokalia
                            and Consonantia, there live the blind texts.</p>
                    </div>
                </div>
                    </Link>
            </div>
            <div className="cards"      >
                    <Link to="/led">
                <div className="card-item">
                
                     <img src={Airpod} alt="" className="card-image-2"/> 
                    <div className="card-info text-center">
                        <h2 className="card-title">Smart tv </h2>
                        <p className="card-intro">Far far away, behind the word mountains, far from the countries Vokalia
                            and Consonantia, there live the blind texts.</p>
                    </div>
                </div>
                </Link>
            </div>
            <div className="cards"      >
                   <Link to="/">
                <div className="card-item">
                 
                   <img src={Airpod} alt="" className="card-image-2"/> 
                   
                    <div className="card-info text-center">
                        <h2 className="card-title">Tablets</h2>
                        <p className="card-intro">Far far away, behind the word mountains, far from the countries Vokalia
                            and Consonantia, there live the blind texts.</p>
                    </div>
                </div>
                 </Link>
            </div>
            <div className="cards"      >
                  <Link to="/drone">
                <div className="card-item">
                  
                    <img src={Max} alt="" className="card-image-2"/> 
             
                    <div className="card-info text-center">
                        <h2 className="card-title">Camera</h2>
                        <p className="card-intro">Far far away, behind the word mountains, far from the countries Vokalia
                            and Consonantia, there live the blind texts.</p>
                    </div>
                </div>
                       </Link>
            </div>



        </div>
    </div> */}

      <div class="container mt-5 ">
        <h1 class=" mt-5 ">Get your </h1>
        <h1>device service</h1>
      </div>

      <div class="shell">
        <div class="container">
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

      <Footer />
    </>
  );
}
    
export default Service;

   

   