import Store from "../components/Store";

type Props = {
  stores?: any[];
};

export const StoresPage = ({ stores = [] }: Props) => {
  return (
    <>
      <h2>Our Stores</h2>
      <p>
        Want to see our products in person? Visit one of our stores to see our
        products up close and talk to our experts. We have stores in the
        following locations:
      </p>
      <ul className="e_StoresPage_list">
        {stores.map((s, i) => (
          <Store key={i} {...s} />
        ))}
      </ul>
    </>
  );
};
