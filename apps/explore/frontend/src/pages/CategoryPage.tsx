import { Filter } from "../components/Filter";
import { Product } from "../components/Product";
import css from "./CategoryPage.module.css";

type Props = {
  title?: string;
  products?: any[];
  filters?: any[];
};

export const CategoryPage = ({ title = "", products = [], filters = [] }: Props) => {
  return (
    <>
      <h2>{title}</h2>
      <div className={css.subline}>
        <p>{products.length} products</p>
        <Filter filters={filters} />
      </div>
      <ul className={css.list}>
        {products.map((p, i) => (
          <Product key={i} {...p} />
        ))}
      </ul>
    </>
  );
};
