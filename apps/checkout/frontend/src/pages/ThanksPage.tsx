import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import Button from "../components/Button";

const ThanksPage: React.FC & { api: null } = () => {
  useEffect(() => {
    const end = Date.now() + 1000;

    const settings = {
      particleCount: 3,
      scalar: 1.5,
      colors: ["#FFDE54", "#FF5A54", "#54FF90"],
      spread: 70,
    };

    // Animates confetti particles.
    function frame() {
      confetti({
        ...settings,
        angle: 60,
        origin: { x: 0 },
      });
      confetti({
        ...settings,
        angle: 120,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        window.requestAnimationFrame(frame);
      }
    }
    frame();
  }, []);

  return (
    <div className="ch_ThanksPage" data-boundary="checkout">
      <h2 className="ch_ThanksPage__title">Thanks for your order!</h2>
      <p className="ch_ThanksPage__text">
        We'll notify you, when its ready for pickup.
      </p>
      <Button href="/" variant="secondary">
        Continue Shopping
      </Button>
    </div>
  );
};

ThanksPage.api = null;

export default ThanksPage;
