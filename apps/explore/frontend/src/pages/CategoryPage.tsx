import { Filter } from "../components/Filter";
import { Product } from "../components/Product";

type Props = {
  title?: string;
  products?: any[];
  filters?: any[];
};

export const CategoryPage = ({ title = "", products = [], filters = [] }: Props) => {
  return (
    <>
      <h2>{title}</h2>
      <div className="e_CategoryPage__subline">
        <p>{products.length} products</p>
        <Filter filters={filters} />
      </div>
      <ul className="e_CategoryPage_list">
        {products.map((p, i) => (
          <Product key={i} {...p} />
        ))}
      </ul>
    </>
  );
};
