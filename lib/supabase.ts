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
      arts: {
        Row: {
          art_array: string
          avg_rating: number | null
          created_at: string | null
          id: number
          image_url: string | null
          user_id: string | null
        }
        Insert: {
          art_array: string
          avg_rating?: number | null
          created_at?: string | null
          id?: number
          image_url?: string | null
          user_id?: string | null
        }
        Update: {
          art_array?: string
          avg_rating?: number | null
          created_at?: string | null
          id?: number
          image_url?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "arts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          email: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          email?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          email?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      reviews: {
        Row: {
          art_id: number
          created_at: string
          description: string | null
          rating: number
          user_id: string
        }
        Insert: {
          art_id: number
          created_at?: string
          description?: string | null
          rating?: number
          user_id?: string
        }
        Update: {
          art_id?: number
          created_at?: string
          description?: string | null
          rating?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_art_id_fkey"
            columns: ["art_id"]
            referencedRelation: "arts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      average_rating: {
        Args: {
          art_id: number
        }
        Returns: number
      }
      insert_review: {
        Args: {
          art_id: number
          user_id: string
          rating: number
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
