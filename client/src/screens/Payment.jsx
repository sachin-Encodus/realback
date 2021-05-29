import React from 'react';



const Payment = () =>{

return(

<>


    <div class="navbar ">
        <ul class="listu">
            <a href="/"><i class="fa fa-home fa-2x" style="color: rgb(0, 0, 0);"> </i></a>&nbsp;&nbsp;


        </ul>
    </div>
    <br/><br/>


    <div id="svg_wrap"></div>
    <br/><br/><br/><br/><br/><br/>
    <div class="container-fluid">

        <div class="row">
            <div class="col-md-12">


                <section class="get-in-touch">
                    <h2 class="title">Payment</h2>
                    <form class="contact-form">
                        <div class="container-fluid">
                            <div class="row align-items-center justify-content-center">

                                <div class="payment  ">
                                    <a
                                        href="upi://pay?pa=9174203189@okbizaxis&pn=Realback&mc=7622&aid=uGICAgIDjwuqBBA&tr=BCR2DN6T3PUMRLZ7"><img
                                            src="images/logo.png" class="pay" alt="" /></a>
                                </div>

                                <div class="payment  ">

                                    <a href=""><img src="images/nwg.png" class="pay" alt="" /></a>
                                </div>

                                <div class="payment  ">
                                    <a href=""><img src="images/ppay.png" class="pay" alt="" /></a>
                                </div>



                                <div class="payment  ">
                                    <a href=""><img src="images/pal.png" class="pay" alt="" /></a>
                                </div>

                                <div class="payment  ">
                                    <a href=""><img src="images/paytm1.jpg" class="paytm" alt="" /></a>
                                </div>


                                <div class="payment  ">
                                    <a href=""><img src="images/bhim.webp" class="pay" alt="" /></a>
                                </div>
                                <div class="Qr">
                                    <img src="images/Qrcode.jpeg" style="width: 280px; height: 250px; " />
                                    <h4>Realback</h4>
                                </div>
                            </div>
                        </div>




                    </form>
                </section>


            </div>



        </div>
    </div>



</>


);


}

export default Payment;