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
            referencedRelation: "influencers"
            referencedColumns: ["id"]
          },
        ]
      }
      influencer_pricing: {
        Row: {
          category: string
          created_at: string | null
          desired_price: number | null
          id: string
          influencer_id: string
          memo: string | null
          offer_price: number | null
          platform: string
          recent_price: number | null
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          desired_price?: number | null
          id?: string
          influencer_id: string
          memo?: string | null
          offer_price?: number | null
          platform: string
          recent_price?: number | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          desired_price?: number | null
          id?: string
          influencer_id?: string
          memo?: string | null
          offer_price?: number | null
          platform?: string
          recent_price?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "influencer_pricing_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencers"
            referencedColumns: ["id"]
          },
        ]
      }
      influencers: {
        Row: {
          age: string | null
          created_at: string | null
          description: string | null
          display_order: number | null
          en_name: string | null
          file_size: number | null
          followers_count: string | null
          followers_count_numeric: number | null
          gender: string | null
          id: string
          image_filename: string | null
          instagram_id: string | null
          instagram_url: string | null
          is_active: boolean | null
          is_visible: boolean | null
          keywords: string[] | null
          kr_name: string
          profile_image: string | null
          social_id: string | null
          storage_path: string | null
          tiktok_id: string | null
          tiktok_url: string | null
          updated_at: string | null
          youtube_id: string | null
          youtube_url: string | null
        }
        Insert: {
          age?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          en_name?: string | null
          file_size?: number | null
          followers_count?: string | null
          followers_count_numeric?: number | null
          gender?: string | null
          id?: string
          image_filename?: string | null
          instagram_id?: string | null
          instagram_url?: string | null
          is_active?: boolean | null
          is_visible?: boolean | null
          keywords?: string[] | null
          kr_name: string
          profile_image?: string | null
          social_id?: string | null
          storage_path?: string | null
          tiktok_id?: string | null
          tiktok_url?: string | null
          updated_at?: string | null
          youtube_id?: string | null
          youtube_url?: string | null
        }
        Update: {
          age?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          en_name?: string | null
          file_size?: number | null
          followers_count?: string | null
          followers_count_numeric?: number | null
          gender?: string | null
          id?: string
          image_filename?: string | null
          instagram_id?: string | null
          instagram_url?: string | null
          is_active?: boolean | null
          is_visible?: boolean | null
          keywords?: string[] | null
          kr_name?: string
          profile_image?: string | null
          social_id?: string | null
          storage_path?: string | null
          tiktok_id?: string | null
          tiktok_url?: string | null
          updated_at?: string | null
          youtube_id?: string | null
          youtube_url?: string | null
        }
        Relationships: []
      }
      kanban_boards: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      kanban_columns: {
        Row: {
          board_id: string | null
          color: string | null
          created_at: string | null
          id: string
          position: number
          title: string
          updated_at: string | null
        }
        Insert: {
          board_id?: string | null
          color?: string | null
          created_at?: string | null
          id?: string
          position?: number
          title: string
          updated_at?: string | null
        }
        Update: {
          board_id?: string | null
          color?: string | null
          created_at?: string | null
          id?: string
          position?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kanban_columns_board_id_fkey"
            columns: ["board_id"]
            isOneToOne: false
            referencedRelation: "kanban_boards"
            referencedColumns: ["id"]
          },
        ]
      }
      kanban_comments: {
        Row: {
          author_email: string
          author_name: string | null
          content: string
          created_at: string | null
          id: string
          is_active: boolean | null
          task_id: string
          updated_at: string | null
        }
        Insert: {
          author_email: string
          author_name?: string | null
          content: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          task_id: string
          updated_at?: string | null
        }
        Update: {
          author_email?: string
          author_name?: string | null
          content?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          task_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kanban_comments_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "kanban_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      kanban_history: {
        Row: {
          archived_at: string
          artist_name: string | null
          assigned_to_email: string | null
          board_id: string
          client_name: string | null
          column_id: string
          completed_at: string | null
          created_at: string
          created_by: string
          description: string | null
          due_date: string | null
          id: string
          original_task_id: string
          position: number
          priority: string
          progress_status: string
          title: string
          updated_at: string
        }
        Insert: {
          archived_at?: string
          artist_name?: string | null
          assigned_to_email?: string | null
          board_id: string
          client_name?: string | null
          column_id: string
          completed_at?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          due_date?: string | null
          id?: string
          original_task_id: string
          position?: number
          priority?: string
          progress_status?: string
          title: string
          updated_at?: string
        }
        Update: {
          archived_at?: string
          artist_name?: string | null
          assigned_to_email?: string | null
          board_id?: string
          client_name?: string | null
          column_id?: string
          completed_at?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          due_date?: string | null
          id?: string
          original_task_id?: string
          position?: number
          priority?: string
          progress_status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_kanban_history_board"
            columns: ["board_id"]
            isOneToOne: false
            referencedRelation: "kanban_boards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_kanban_history_column"
            columns: ["column_id"]
            isOneToOne: false
            referencedRelation: "kanban_columns"
            referencedColumns: ["id"]
          },
        ]
      }
      kanban_subtasks: {
        Row: {
          created_at: string | null
          due_date: string | null
          id: string
          is_completed: boolean | null
          parent_task_id: string | null
          position: number
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          due_date?: string | null
          id?: string
          is_completed?: boolean | null
          parent_task_id?: string | null
          position?: number
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          due_date?: string | null
          id?: string
          is_completed?: boolean | null
          parent_task_id?: string | null
          position?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kanban_subtasks_parent_task_id_fkey"
            columns: ["parent_task_id"]
            isOneToOne: false
            referencedRelation: "kanban_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      kanban_tasks: {
        Row: {
          artist_name: string | null
          assigned_to_email: string | null
          board_id: string | null
          client_name: string | null
          column_id: string | null
          completed_at: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          due_date: string | null
          id: string
          is_active: boolean | null
          position: number
          priority: string | null
          progress_status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          artist_name?: string | null
          assigned_to_email?: string | null
          board_id?: string | null
          client_name?: string | null
          column_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          is_active?: boolean | null
          position?: number
          priority?: string | null
          progress_status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          artist_name?: string | null
          assigned_to_email?: string | null
          board_id?: string | null
          client_name?: string | null
          column_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          is_active?: boolean | null
          position?: number
          priority?: string | null
          progress_status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kanban_tasks_board_id_fkey"
            columns: ["board_id"]
            isOneToOne: false
            referencedRelation: "kanban_boards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kanban_tasks_column_id_fkey"
            columns: ["column_id"]
            isOneToOne: false
            referencedRelation: "kanban_columns"
            referencedColumns: ["id"]
          },
        ]
      }
      mail_history: {
        Row: {
          company_entity_id: string | null
          created_at: string | null
          gmail_message_id: string | null
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
          gmail_message_id?: string | null
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
          gmail_message_id?: string | null
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
          english_name: string | null
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
          english_name?: string | null
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
          english_name?: string | null
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
          english_name: string | null
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
          english_name?: string | null
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
          english_name?: string | null
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
      proposal_items: {
        Row: {
          category: string
          count: number
          created_at: string | null
          id: string
          influencer_id: string
          memo: string | null
          platform: string
          proposal_id: string
          total_price: number | null
          unit_price: number
          updated_at: string | null
        }
        Insert: {
          category: string
          count?: number
          created_at?: string | null
          id?: string
          influencer_id: string
          memo?: string | null
          platform: string
          proposal_id: string
          total_price?: number | null
          unit_price: number
          updated_at?: string | null
        }
        Update: {
          category?: string
          count?: number
          created_at?: string | null
          id?: string
          influencer_id?: string
          memo?: string | null
          platform?: string
          proposal_id?: string
          total_price?: number | null
          unit_price?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "proposal_items_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposal_items_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      proposals: {
        Row: {
          author: string
          category: string | null
          created_at: string | null
          currency: string | null
          expire_at: string | null
          id: string
          influencer_list: string[] | null
          platform: string | null
          receiver: string
          status: string | null
          total_amount: number | null
        }
        Insert: {
          author: string
          category?: string | null
          created_at?: string | null
          currency?: string | null
          expire_at?: string | null
          id?: string
          influencer_list?: string[] | null
          platform?: string | null
          receiver: string
          status?: string | null
          total_amount?: number | null
        }
        Update: {
          author?: string
          category?: string | null
          created_at?: string | null
          currency?: string | null
          expire_at?: string | null
          id?: string
          influencer_list?: string[] | null
          platform?: string | null
          receiver?: string
          status?: string | null
          total_amount?: number | null
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