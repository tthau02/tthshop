import { useEffect, useState } from "react";
import instance from "../config/axiosConfig";
import { useNavigate } from "react-router-dom";

interface ICategory {
  _id: string;
  categoryName: string;
  desc: string;
  image?: string;
}

const Categories = () => {
  const [category, setCategory] = useState<ICategory[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategory = async () => {
      try {
        const { data } = await instance.get(`/categores`);
        setCategory(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };
    getCategory();
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/products?categoryId=${categoryId}`); // Điều hướng với query parameter
  };

  return (
    <div className="container">
      <div
        className="grid grid-cols-5 gap-5"
        style={{
          gridTemplateRows: "140px 140px",
          gridTemplateAreas: `
            "h1 h2 h4 h6 h7"
            "h1 h3 h5 h6 h8"
          `,
        }}
      >
        {category.map((cate, index) => {
          let gridArea = "";
          switch (index) {
            case 0:
              gridArea = "h1";
              break;
            case 1:
              gridArea = "h2";
              break;
            case 2:
              gridArea = "h3";
              break;
            case 3:
              gridArea = "h4";
              break;
            case 4:
              gridArea = "h5";
              break;
            case 5:
              gridArea = "h6";
              break;
            case 6:
              gridArea = "h7";
              break;
            case 7:
              gridArea = "h8";
              break;
            default:
              gridArea = "";
          }

          return (
            <div
              key={cate._id}
              className="bg-white overflow-hidden rounded-[10px] relative hover:shadow-2xl transition cursor-pointer flex justify-center items-center"
              style={{ gridArea }}
              onClick={() => handleCategoryClick(cate._id)}
            >
              <img
                className="w-36 p-5 text-center object-cover"
                src={cate.image || "https://via.placeholder.com/150"}
                alt={cate.categoryName}
              />
              <div className="absolute bottom-0 left-0 w-full p-2 bg-opacity-50 text-gray-950 text-center">
                <h2 className="text-sm font-semibold">{cate.categoryName}</h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
