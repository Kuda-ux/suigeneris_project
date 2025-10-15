export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          password_hash: string
          first_name: string | null
          last_name: string | null
          role: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          password_hash: string
          first_name?: string | null
          last_name?: string | null
          role?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          password_hash?: string
          first_name?: string | null
          last_name?: string | null
          role?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: number
          name: string
          description: string | null
          price: number
          category: string | null
          brand: string | null
          sku: string | null
          stock_count: number
          in_stock: boolean
          image: string | null
          images: string[] | null
          specifications: Json | null
          warranty: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
          price: number
          category?: string | null
          brand?: string | null
          sku?: string | null
          stock_count?: number
          in_stock?: boolean
          image?: string | null
          images?: string[] | null
          specifications?: Json | null
          warranty?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
          price?: number
          category?: string | null
          brand?: string | null
          sku?: string | null
          stock_count?: number
          in_stock?: boolean
          image?: string | null
          images?: string[] | null
          specifications?: Json | null
          warranty?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          total_amount: number
          status: string
          shipping_address: Json | null
          payment_method: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          total_amount: number
          status?: string
          shipping_address?: Json | null
          payment_method?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          total_amount?: number
          status?: string
          shipping_address?: Json | null
          payment_method?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string | null
          product_id: number | null
          quantity: number
          price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id?: string | null
          product_id?: number | null
          quantity: number
          price: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string | null
          product_id?: number | null
          quantity?: number
          price?: number
          created_at?: string
        }
      }
      cart: {
        Row: {
          id: string
          user_id: string | null
          product_id: number | null
          quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          product_id?: number | null
          quantity: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          product_id?: number | null
          quantity?: number
          created_at?: string
          updated_at?: string
        }
      }
      inventory: {
        Row: {
          id: string
          product_id: number | null
          quantity: number
          location: string | null
          last_updated: string
        }
        Insert: {
          id?: string
          product_id?: number | null
          quantity: number
          location?: string | null
          last_updated?: string
        }
        Update: {
          id?: string
          product_id?: number | null
          quantity?: number
          location?: string | null
          last_updated?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
