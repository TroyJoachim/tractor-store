import { useRef } from "react";
import Button from "./Button";
import { src, srcset } from "../utils";

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
    <div className="e_StorePicker_root">
      <div className="e_StorePicker_control" data-boundary="explore">
        <div className="e_StorePicker_selected"></div>
        <Button className="e_StorePicker_recommendation" type="button" onClick={openModal}>
          Choose a store
        </Button>
      </div>
      <dialog className="e_StorePicker_dialog" ref={dialogRef} data-boundary="explore">
        <div className="e_StorePicker_wrapper">
          <h2>Stores</h2>
          <ul className="e_StorePicker_list">
            {stores.map((s) => (
              <li key={s.id}>
                <div>
                  <img
                    className="e_StorePicker_image"
                    src={src(s.image || "", 200)}
                    srcSet={srcset(s.image || "", [200, 400])}
                    width={200}
                    height={200}
                  />
                  <p className="e_StorePicker_address">
                    {s.name}
                    <br />
                    {s.street}
                    <br />
                    {s.city}
                  </p>
                </div>
                <Button
                  extraClass="e_StorePicker_select"
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
