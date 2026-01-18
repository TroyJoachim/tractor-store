import React, { useState, useEffect, useRef } from "react";
import { fetchData } from "@tractor-store/shared";
import Button from "../components/Button";
import ExploreStorePicker from "explore/explore-storepicker";
import css from "./CheckoutPage.module.css";

const STORE_PICKER_EVENT = "explore:store-selected";

interface Props {
  onPlaceOrder?: () => void;
}

export const CheckoutPage = ({ onPlaceOrder }: Props) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [storeId, setStoreId] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const storePickerRef = useRef<HTMLDivElement>(null);

  // enable/disable button based on form state
  useEffect(() => {
    setIsButtonDisabled(!firstname || !lastname || !storeId);
  }, [firstname, lastname, storeId]);

  useEffect(() => {
    const handleEvent = (event: CustomEvent) => {
      setStoreId(event.detail);
    };

    const $el = storePickerRef.current;
    if ($el) {
      $el.addEventListener(STORE_PICKER_EVENT, handleEvent as EventListener);
    }

    // cleanup
    return () => {
      if ($el) {
        $el.removeEventListener(
          STORE_PICKER_EVENT,
          handleEvent as EventListener
        );
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchData("/placeorder", { method: "POST" });
    // Notify MiniCart to refresh and show empty cart
    window.dispatchEvent(new CustomEvent("checkout:cart-updated"));
    if (onPlaceOrder) {
      onPlaceOrder();
    } else {
      document.dispatchEvent(
        new CustomEvent("shell:navigate", {
          detail: { path: "/checkout/thanks" },
          bubbles: true,
          composed: true,
        })
      );
    }
  };

  return (
    <div className={css.root} data-boundary="checkout">
      <h2>Checkout</h2>
      <form
        action="/checkout/api/placeorder"
        method="post"
        className={css.form}
        onSubmit={handleSubmit}
      >
        <h3>Personal Data</h3>
        <fieldset className={css.name}>
          <div>
            <label className={css.label} htmlFor="c_firstname">
              First name
            </label>
            <input
              className={css.input}
              type="text"
              id="c_firstname"
              name="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={css.label} htmlFor="c_lastname">
              Last name
            </label>
            <input
              className={css.input}
              type="text"
              id="c_lastname"
              name="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>
        </fieldset>

        <h3>Store Pickup</h3>
        <fieldset>
          <div className={css.store} ref={storePickerRef}>
            <ExploreStorePicker />
          </div>
          <label className={css.label} htmlFor="c_storeId">
            Store ID
          </label>
          <input
            className={css.input}
            type="text"
            id="c_storeId"
            name="storeId"
            value={storeId}
            readOnly
            required
          />
        </fieldset>

        <div className={css.buttons}>
          <Button type="submit" variant="primary" disabled={isButtonDisabled}>
            Place Order
          </Button>
          <Button href="/checkout/cart" variant="secondary">
            Back to Cart
          </Button>
        </div>
      </form>
    </div>
  );
};
