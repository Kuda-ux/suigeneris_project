import { ProductDetailPage } from '@/components/pages/product-detail-page';

export default function ProductDetail({ params }: { params: { id: string } }) {
  return <ProductDetailPage productId={params.id} />;
}
