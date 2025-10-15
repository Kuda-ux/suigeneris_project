import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productData = await request.json();
    const id = parseInt(params.id);

    const updateData = {
      name: productData.name,
      description: productData.description,
      category: productData.category,
      price: productData.price,
      sku: productData.sku,
      stock_count: productData.currentStock || productData.stock_count,
      in_stock: (productData.currentStock || productData.stock_count) > 0,
      images: productData.images || [],
      image: productData.images?.[0] || productData.image || '',
      brand: productData.brand || 'Generic',
      updated_at: new Date().toISOString()
    };

    const { data, error } = await (supabase
      .from('products')
      .update(updateData) as any)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
