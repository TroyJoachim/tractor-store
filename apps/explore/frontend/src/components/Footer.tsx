import { IMAGE_SERVER } from "../utils";
import css from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.cutter}>
        <div className={css.inner}>
          <div className={css.initiative}>
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

          <div className={css.credits}>
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
