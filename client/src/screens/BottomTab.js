import React from "react";
import { Link } from "react-router-dom";

const Tab = () => {
  return (
    <div>
      <div class="phone">
        <input type="radio" name="s" id="s1" />

        <Link to="/service">
          <input type="radio" name="s" id="s2" />
        </Link>
        <Link to="/cart">
          <input type="radio" name="s" id="s3" />
        </Link>
        <Link to="/">
          <label for="s1">
            <img
              src="http://co0kie.github.io/codepen/mobile-nav/facebook.svg"
              alt=""
            />
          </label>
        </Link>
        <label for="s2">
          <img
            src="http://co0kie.github.io/codepen/mobile-nav/twitter.svg"
            alt=""
          />
        </label>
        <label for="s3">
          <img
            src="http://co0kie.github.io/codepen/mobile-nav/instagram.svg"
            alt=""
          />
        </label>
        <div class="circle"></div>
        <div class="phone_content">
          <div class="phone_bottom">
            <span class="indicator"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tab;
