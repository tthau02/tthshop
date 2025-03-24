import { useParams } from "react-router-dom";
import Comment from "../components/ui/Comment";
import ProductDetail from "../components/detail/ProductDetail";
import RelatedProducts from "../components/detail/RelatedProducts";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <section className="max-w-[1200px] mx-auto m-5 mt-[5%]">
      <ProductDetail />
      <Comment />
      {id && <RelatedProducts productId={id} />}
    </section>
  );
};

export default ProductDetailPage;
