export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      brands: {
        Row: {
          brand_name: string
          created_at: string | null
          description: string | null
          display_order: number | null
          file_size: number | null
          id: string
          is_active: boolean | null
          is_visible: boolean | null
          logo_filename: string
          logo_url: string | null
          mime_type: string | null
          storage_path: string | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          brand_name: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          file_size?: number | null
          id?: string
          is_active?: boolean | null
          is_visible?: boolean | null
          logo_filename: string
          logo_url?: string | null
          mime_type?: string | null
          storage_path?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          brand_name?: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          file_size?: number | null
          id?: string
          is_active?: boolean | null
          is_visible?: boolean | null
          logo_filename?: string
          logo_url?: string | null
          mime_type?: string | null
          storage_path?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      company_entity: {
        Row: {
          category: string[] | null
          company: string | null
          created_at: string | null
          email: string | null
          id: string
          name: string
          phone_num: string | null
          position: string | null
          updated_at: string | null
        }
        Insert: {
          category?: string[] | null
          company?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name: string
          phone_num?: string | null
          position?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string[] | null
          company?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string
          phone_num?: string | null
          position?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      influencer_keywords: {
        Row: {
          created_at: string | null
          id: string
          influencer_id: string
          keyword: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          influencer_id: string
          keyword: string
        }
        Update: {
          created_at?: string | null
          id?: string
          influencer_id?: string
          keyword?: string
        }
        Relationships: [
          {
            foreignKeyName: "influencer_keywords_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "partner_influencers"
            referencedColumns: ["id"]
          },
        ]
      }
      mail_history: {
        Row: {
          company_entity_id: string | null
          created_at: string | null
          id: string
          original_content: string | null
          received_date: string | null
          receiver_mail: string | null
          summarized_content: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          company_entity_id?: string | null
          created_at?: string | null
          id?: string
          original_content?: string | null
          received_date?: string | null
          receiver_mail?: string | null
          summarized_content?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          company_entity_id?: string | null
          created_at?: string | null
          id?: string
          original_content?: string | null
          received_date?: string | null
          receiver_mail?: string | null
          summarized_content?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mail_history_company_entity_id_fkey"
            columns: ["company_entity_id"]
            isOneToOne: false
            referencedRelation: "company_entity"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_channels: {
        Row: {
          channel_link: string | null
          channel_name: string
          created_at: string | null
          created_by: string | null
          description: string | null
          display_order: number | null
          file_size: number | null
          follower_count: string | null
          id: string
          image_filename: string | null
          image_url: string | null
          is_active: boolean | null
          is_featured: boolean | null
          is_visible: boolean | null
          platform_type: string | null
          storage_path: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          channel_link?: string | null
          channel_name: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          display_order?: number | null
          file_size?: number | null
          follower_count?: string | null
          id?: string
          image_filename?: string | null
          image_url?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          is_visible?: boolean | null
          platform_type?: string | null
          storage_path?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          channel_link?: string | null
          channel_name?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          display_order?: number | null
          file_size?: number | null
          follower_count?: string | null
          id?: string
          image_filename?: string | null
          image_url?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          is_visible?: boolean | null
          platform_type?: string | null
          storage_path?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      partner_influencers: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          file_size: number | null
          followers_count: string
          followers_count_numeric: number | null
          id: string
          image_filename: string | null
          influencer_name: string
          instagram_url: string | null
          is_active: boolean | null
          is_visible: boolean | null
          profile_image: string
          social_id: string
          storage_path: string | null
          tiktok_url: string | null
          updated_at: string | null
          youtube_url: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          file_size?: number | null
          followers_count: string
          followers_count_numeric?: number | null
          id?: string
          image_filename?: string | null
          influencer_name: string
          instagram_url?: string | null
          is_active?: boolean | null
          is_visible?: boolean | null
          profile_image: string
          social_id: string
          storage_path?: string | null
          tiktok_url?: string | null
          updated_at?: string | null
          youtube_url?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          file_size?: number | null
          followers_count?: string
          followers_count_numeric?: number | null
          id?: string
          image_filename?: string | null
          influencer_name?: string
          instagram_url?: string | null
          is_active?: boolean | null
          is_visible?: boolean | null
          profile_image?: string
          social_id?: string
          storage_path?: string | null
          tiktok_url?: string | null
          updated_at?: string | null
          youtube_url?: string | null
        }
        Relationships: []
      }
      seo_settings: {
        Row: {
          author: string | null
          canonical_url: string | null
          company_tagline: string | null
          created_at: string | null
          hero_subtitle: string | null
          hero_title: string | null
          id: string
          keywords: string[] | null
          language: string | null
          meta_robots: string | null
          og_description: string | null
          og_image_url: string | null
          og_title: string | null
          og_type: string | null
          site_description: string
          site_title: string
          twitter_card: string | null
          twitter_description: string | null
          twitter_image_url: string | null
          twitter_title: string | null
          updated_at: string | null
        }
        Insert: {
          author?: string | null
          canonical_url?: string | null
          company_tagline?: string | null
          created_at?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: string
          keywords?: string[] | null
          language?: string | null
          meta_robots?: string | null
          og_description?: string | null
          og_image_url?: string | null
          og_title?: string | null
          og_type?: string | null
          site_description?: string
          site_title?: string
          twitter_card?: string | null
          twitter_description?: string | null
          twitter_image_url?: string | null
          twitter_title?: string | null
          updated_at?: string | null
        }
        Update: {
          author?: string | null
          canonical_url?: string | null
          company_tagline?: string | null
          created_at?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: string
          keywords?: string[] | null
          language?: string | null
          meta_robots?: string | null
          og_description?: string | null
          og_image_url?: string | null
          og_title?: string | null
          og_type?: string | null
          site_description?: string
          site_title?: string
          twitter_card?: string | null
          twitter_description?: string | null
          twitter_image_url?: string | null
          twitter_title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      sitemap_pages: {
        Row: {
          change_frequency: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          is_hidden: boolean | null
          keywords: string[] | null
          page_description: string | null
          page_title: string
          page_url: string
          priority: number | null
          updated_at: string | null
        }
        Insert: {
          change_frequency?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          is_hidden?: boolean | null
          keywords?: string[] | null
          page_description?: string | null
          page_title: string
          page_url: string
          priority?: number | null
          updated_at?: string | null
        }
        Update: {
          change_frequency?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          is_hidden?: boolean | null
          keywords?: string[] | null
          page_description?: string | null
          page_title?: string
          page_url?: string
          priority?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      test_table: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string
          updated_at: string | null
          value: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
          updated_at?: string | null
          value?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
          updated_at?: string | null
          value?: number | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          is_active: boolean | null
          phone_number: string | null
          role: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          phone_number?: string | null
          role?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          phone_number?: string | null
          role?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const