import React from "react";
import Menu from "./Menu";

const Terms = () => {
  return (
    <>
      <Menu />
      <div class="container" style={{ marginTop: 70 }}>
        <div class="col-md-12">
          <center>
            <h1>
              <u>Terms & Conditions</u>
            </h1>
          </center>
          Terms & Conditions:
          <p>
            1. The Service shall be governed by and construed in accordance with
            the laws of India, excluding its conflict of law provisions.
          </p>
          <p>
            2. The client shall supply accurate contact information such as
            Name, Phone Number, Email Address, and the device's IMEI Number.
          </p>
          <p>
            3. The Service Provider is dedicated to protecting the client's
            personal data from any unauthorized access and shall not use the
            information for any purpose beyond the service transaction. However,
            it's the client's responsibility to create a data back-up as the
            service provider shall not be held responsible for loss of data.
          </p>
          <p>
            4. The client should provide a brief description as well as other
            pertinent remarks regarding the problem of the device. A final,
            non-negotiable quotation shall then be provided to the client as
            basis of payment.
          </p>
          <p>5. All services will include free pick-up and delivery.</p>
          <p>
            6. All devices received by Realback will be sent directly to
            diagnostic department. After diagnostic if there will be any other
            damage, other than mentioned, the customer is responsible.
          </p>
          <p>
            7. The service provider's after-service warranty does not cover the
            following condition:
          </p>
          <p style={{ marginLeft: 20 }}>
            {" "}
            7.1 Body or frame damage caused by mishandling.
          </p>
          <p style={{ marginLeft: 20 }}>7.2 Water Damage.</p>
          <p style={{ marginLeft: 20 }}>
            7.3 Damage from subsequent vertical falls, whether intentional or
            otherwise.
          </p>
          <p style={{ marginLeft: 20 }}>7.4 Internal hardware tampering.</p>
          <p style={{ marginLeft: 20 }}>
            7.5 Damage resulting from repairs other than Realback.
          </p>
          <p style={{ marginLeft: 20 }}>
            7.6 Software issue unrelated to the repair.
          </p>
          <p style={{ marginLeft: 20 }}>
            7.7 New Damages unrelated to the original repair.
          </p>
          <p style={{ marginLeft: 20 }}>
            7.8 Any losses of data occurring as a result of the repair.
          </p>
          <p>
            8. 90 days warranty only provided for Touch and LCD components other
            than this the normal warranty provide for all component is 45 days.
          </p>
          <p>9. 6 months warranty provided for glass replacements only.</p>
          <p>
            10. Company shall not be responsible for the device not being
            collected within 15 days of the repair.
          </p>
          <p>
            11. Device shall be in transit insurance, having valuation of 20% of
            the current MSP.
          </p>
          <p>
            11. In case of refurbishment of screen there is a chance of screen
            failure, in that case high quality screen with a warranty of 3
            months will be provided from Realback service centres. For the cases
            of 100% OG products, pricing may vary.{" "}
          </p>
          <p>
            12. For curved screen glass replacements, the company shall not take
            any risk over the LCD. The job shall be done only when permitted
            from the client's end. In case of failure, the company shall not be
            responsible.
          </p>
          <p>
            {" "}
            For any other support regarding your device, kindly contact us at
            9174203189 , 9340821225/ support@realback.in
          </p>
        </div>
      </div>

      <br />
      <br />
    </>
  );
};

export default Terms;
