import React from "react";
import { IMAGE_SERVER } from "../utils";

const Footer: React.FC = () => {
  return (
    <footer className="e_Footer">
      <div className="e_Footer__cutter">
        <div className="e_Footer__inner">
          <div className="e_Footer__initiative">
            {/* please leave this part untouched */}
            <img
              src={`${IMAGE_SERVER}/cdn/img/neulandlogo.svg`}
              alt="neuland - B\u00fcro f\u00fcr Informatik"
            />
            <p>
              based on{" "}
              <a
                href="https://micro-frontends.org/tractor-store/"
                target="_blank"
              >
                the tractor store 2.0
              </a>
              <br />a{" "}
              <a href="https://neuland-bfi.de" target="_blank">
                neuland
              </a>{" "}
              project
            </p>
          </div>

          <div className="e_Footer__credits">
            {/* replace this details about your implementation and organization */}
            <h4>techstack</h4>
            <p>
              Web Components, shadow dom, React, shell, Module Federation, Vite, BFF
            </p>
            <p>
              Built by{" "}
              Troy Joachim | {" "}
              <a
                href="https://github.com/troyjoachim/tractor-store"
                target="_blank"
              >
                github
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
