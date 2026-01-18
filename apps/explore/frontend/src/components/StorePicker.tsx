import { useRef } from "react";
import { Button } from "./Button";
import { src, srcset } from "../utils";
import css from "./StorePicker.module.css";

type Store = {
  id: string | number;
  name?: string;
  image?: string;
  street?: string;
  city?: string;
};

type Props = {
  stores?: Store[];
};

export const StorePicker = ({ stores = [] }: Props) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const selectStore = (e: any, id: string | number) => {
    const event = new CustomEvent("explore:store-selected", {
      bubbles: true,
      composed: true,
      detail: id,
    });
    e.target.dispatchEvent(event);
    dialogRef.current?.close();
  };

  const openModal = () => {
    dialogRef.current?.showModal();
  };

  return (
    <div className={css.root}>
      <div className={css.control} data-boundary="explore">
        <div className={css.selected}></div>
        <Button
          type="button"
          onClick={openModal}
        >
          Choose a store
        </Button>
      </div>
      <dialog className={css.dialog} ref={dialogRef} data-boundary="explore">
        <div className={css.wrapper}>
          <h2>Stores</h2>
          <ul className={css.list}>
            {stores.map((s) => (
              <li key={s.id}>
                <div>
                  <img
                    className={css.image}
                    src={src(s.image || "", 200)}
                    srcSet={srcset(s.image || "", [200, 400])}
                    width={200}
                    height={200}
                  />
                  <p className={css.address}>
                    {s.name}
                    <br />
                    {s.street}
                    <br />
                    {s.city}
                  </p>
                </div>
                <Button
                  extraClass={css.select}
                  type="button"
                  onClick={(e) => selectStore(e, s.id)}
                >
                  Select
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </div>
  );
};
