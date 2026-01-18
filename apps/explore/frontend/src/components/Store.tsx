import { src, srcset } from "../utils";

type Props = {
  name?: string;
  image?: string;
  street?: string;
  city?: string;
};

export const Store = ({
  name = "",
  image = "",
  street = "",
  city = "",
}: Props) => {
  return (
    <li className="e_Store">
      <div className="e_Store_content">
        <img
          className="e_Store_image"
          src={src(image || "", 200)}
          srcSet={srcset(image || "", [200, 400])}
          width={200}
          height={200}
        />
        <p className="e_Store_address">
          {name}
          <br />
          {street}
          <br />
          {city}
        </p>
      </div>
    </li>
  );
};
