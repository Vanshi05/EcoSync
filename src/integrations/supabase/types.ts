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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ai_recommendations: {
        Row: {
          category: string
          created_at: string | null
          difficulty_level: string | null
          expires_at: string | null
          id: number
          implementation_status: string | null
          potential_savings_inr: number | null
          potential_savings_kwh: number | null
          recommendation_text: string
          source_data: Json | null
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string | null
          difficulty_level?: string | null
          expires_at?: string | null
          id?: number
          implementation_status?: string | null
          potential_savings_inr?: number | null
          potential_savings_kwh?: number | null
          recommendation_text: string
          source_data?: Json | null
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string | null
          difficulty_level?: string | null
          expires_at?: string | null
          id?: number
          implementation_status?: string | null
          potential_savings_inr?: number | null
          potential_savings_kwh?: number | null
          recommendation_text?: string
          source_data?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_recommendations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "neighborhood_leaderboard"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "ai_recommendations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_recommendations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_dashboard_summary"
            referencedColumns: ["id"]
          },
        ]
      }
      badges: {
        Row: {
          category: string | null
          created_at: string | null
          description: string
          icon_url: string | null
          id: number
          name: string
          points_value: number | null
          rarity: string | null
          requirements: Json | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description: string
          icon_url?: string | null
          id?: number
          name: string
          points_value?: number | null
          rarity?: string | null
          requirements?: Json | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string
          icon_url?: string | null
          id?: number
          name?: string
          points_value?: number | null
          rarity?: string | null
          requirements?: Json | null
        }
        Relationships: []
      }
      carbon_budgets: {
        Row: {
          budget_limit: number
          category: string
          created_at: string | null
          current_usage: number | null
          id: number
          month_year: string
          user_id: string
        }
        Insert: {
          budget_limit: number
          category: string
          created_at?: string | null
          current_usage?: number | null
          id?: number
          month_year: string
          user_id: string
        }
        Update: {
          budget_limit?: number
          category?: string
          created_at?: string | null
          current_usage?: number | null
          id?: number
          month_year?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "carbon_budgets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "neighborhood_leaderboard"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "carbon_budgets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "carbon_budgets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_dashboard_summary"
            referencedColumns: ["id"]
          },
        ]
      }
      carbon_entries: {
        Row: {
          activity_description: string | null
          carbon_footprint: number
          category: string
          cost_inr: number | null
          created_at: string | null
          date: string
          id: number
          quantity: number | null
          source: string | null
          subcategory: string | null
          unit: string
          user_id: string
        }
        Insert: {
          activity_description?: string | null
          carbon_footprint: number
          category: string
          cost_inr?: number | null
          created_at?: string | null
          date: string
          id?: number
          quantity?: number | null
          source?: string | null
          subcategory?: string | null
          unit: string
          user_id: string
        }
        Update: {
          activity_description?: string | null
          carbon_footprint?: number
          category?: string
          cost_inr?: number | null
          created_at?: string | null
          date?: string
          id?: number
          quantity?: number | null
          source?: string | null
          subcategory?: string | null
          unit?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "carbon_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "neighborhood_leaderboard"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "carbon_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "carbon_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_dashboard_summary"
            referencedColumns: ["id"]
          },
        ]
      }
      challenges: {
        Row: {
          category: string
          challenge_type: string
          created_at: string | null
          created_by: string | null
          description: string
          difficulty: string | null
          eco_coins_reward: number | null
          end_date: string
          id: number
          is_active: boolean | null
          max_participants: number | null
          points_reward: number
          start_date: string
          target_unit: string | null
          target_value: number | null
          title: string
        }
        Insert: {
          category: string
          challenge_type: string
          created_at?: string | null
          created_by?: string | null
          description: string
          difficulty?: string | null
          eco_coins_reward?: number | null
          end_date: string
          id?: number
          is_active?: boolean | null
          max_participants?: number | null
          points_reward: number
          start_date: string
          target_unit?: string | null
          target_value?: number | null
          title: string
        }
        Update: {
          category?: string
          challenge_type?: string
          created_at?: string | null
          created_by?: string | null
          description?: string
          difficulty?: string | null
          eco_coins_reward?: number | null
          end_date?: string
          id?: number
          is_active?: boolean | null
          max_participants?: number | null
          points_reward?: number
          start_date?: string
          target_unit?: string | null
          target_value?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "challenges_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "neighborhood_leaderboard"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "challenges_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "challenges_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_dashboard_summary"
            referencedColumns: ["id"]
          },
        ]
      }
      donation_routes: {
        Row: {
          created_at: string | null
          donation_ids: Json
          estimated_time_mins: number | null
          id: number
          ngo_id: number
          optimized_route: Json | null
          route_date: string
          status: string | null
          total_distance_km: number | null
        }
        Insert: {
          created_at?: string | null
          donation_ids: Json
          estimated_time_mins?: number | null
          id?: number
          ngo_id: number
          optimized_route?: Json | null
          route_date: string
          status?: string | null
          total_distance_km?: number | null
        }
        Update: {
          created_at?: string | null
          donation_ids?: Json
          estimated_time_mins?: number | null
          id?: number
          ngo_id?: number
          optimized_route?: Json | null
          route_date?: string
          status?: string | null
          total_distance_km?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "donation_routes_ngo_id_fkey"
            columns: ["ngo_id"]
            isOneToOne: false
            referencedRelation: "ngos"
            referencedColumns: ["id"]
          },
        ]
      }
      eco_transactions: {
        Row: {
          amount: number
          balance_after: number
          created_at: string | null
          id: number
          reason: string
          reference_id: number | null
          reference_table: string | null
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount: number
          balance_after: number
          created_at?: string | null
          id?: number
          reason: string
          reference_id?: number | null
          reference_table?: string | null
          transaction_type: string
          user_id: string
        }
        Update: {
          amount?: number
          balance_after?: number
          created_at?: string | null
          id?: number
          reason?: string
          reference_id?: number | null
          reference_table?: string | null
          transaction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "eco_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "neighborhood_leaderboard"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "eco_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eco_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_dashboard_summary"
            referencedColumns: ["id"]
          },
        ]
      }
      energy_goals: {
        Row: {
          actual_kwh: number | null
          created_at: string | null
          goal_met: boolean | null
          id: number
          month_year: string
          savings_percentage: number | null
          target_kwh: number
          user_id: string
        }
        Insert: {
          actual_kwh?: number | null
          created_at?: string | null
          goal_met?: boolean | null
          id?: number
          month_year: string
          savings_percentage?: number | null
          target_kwh: number
          user_id: string
        }
        Update: {
          actual_kwh?: number | null
          created_at?: string | null
          goal_met?: boolean | null
          id?: number
          month_year?: string
          savings_percentage?: number | null
          target_kwh?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "energy_goals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "neighborhood_leaderboard"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "energy_goals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "energy_goals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_dashboard_summary"
            referencedColumns: ["id"]
          },
        ]
      }
      energy_readings: {
        Row: {
          cost_inr: number | null
          created_at: string | null
          id: number
          kwh_used: number
          meter_reading: number | null
          peak_usage_hours: Json | null
          reading_time: string
          source: string | null
          user_id: string
        }
        Insert: {
          cost_inr?: number | null
          created_at?: string | null
          id?: number
          kwh_used: number
          meter_reading?: number | null
          peak_usage_hours?: Json | null
          reading_time: string
          source?: string | null
          user_id: string
        }
        Update: {
          cost_inr?: number | null
          created_at?: string | null
          id?: number
          kwh_used?: number
          meter_reading?: number | null
          peak_usage_hours?: Json | null
          reading_time?: string
          source?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "energy_readings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "neighborhood_leaderboard"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "energy_readings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "energy_readings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_dashboard_summary"
            referencedColumns: ["id"]
          },
        ]
      }
      energy_tips: {
        Row: {
          category: string | null
          created_at: string | null
          difficulty: string | null
          estimated_savings_inr: number | null
          estimated_savings_kwh: number | null
          id: number
          image_url: string | null
          is_verified: boolean | null
          likes_count: number | null
          shares_count: number | null
          tip_text: string
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          difficulty?: string | null
          estimated_savings_inr?: number | null
          estimated_savings_kwh?: number | null
          id?: number
          image_url?: string | null
          is_verified?: boolean | null
          likes_count?: number | null
          shares_count?: number | null
          tip_text: string
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          difficulty?: string | null
          estimated_savings_inr?: number | null
          estimated_savings_kwh?: number | null
          id?: number
          image_url?: string | null
          is_verified?: boolean | null
          likes_count?: number | null
          shares_count?: number | null
          tip_text?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "energy_tips_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "neighborhood_leaderboard"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "energy_tips_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "energy_tips_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_dashboard_summary"
            referencedColumns: ["id"]
          },
        ]
      }
      food_donations: {
        Row: {
          assigned_at: string | null
          carbon_saved_kg: number | null
          created_at: string | null
          delivered_at: string | null
          description: string | null
          donor_id: string
          eco_coins_earned: number | null
          estimated_meals: number | null
          expiry_time: string
          food_type: string
          id: number
          ngo_id: number | null
          picked_up_at: string | null
          pickup_address: string
          pickup_latitude: number | null
          pickup_longitude: number | null
          preferred_pickup_time: string | null
          quantity: number
          status: string | null
          unit: string
        }
        Insert: {
          assigned_at?: string | null
          carbon_saved_kg?: number | null
          created_at?: string | null
          delivered_at?: string | null
          description?: string | null
          donor_id: string
          eco_coins_earned?: number | null
          estimated_meals?: number | null
          expiry_time: string
          food_type: string
          id?: number
          ngo_id?: number | null
          picked_up_at?: string | null
          pickup_address: string
          pickup_latitude?: number | null
          pickup_longitude?: number | null
          preferred_pickup_time?: string | null
          quantity: number
          status?: string | null
          unit: string
        }
        Update: {
          assigned_at?: string | null
          carbon_saved_kg?: number | null
          created_at?: string | null
          delivered_at?: string | null
          description?: string | null
          donor_id?: string
          eco_coins_earned?: number | null
          estimated_meals?: number | null
          expiry_time?: string
          food_type?: string
          id?: number
          ngo_id?: number | null
          picked_up_at?: string | null
          pickup_address?: string
          pickup_latitude?: number | null
          pickup_longitude?: number | null
          preferred_pickup_time?: string | null
          quantity?: number
          status?: string | null
          unit?: string
        }
        Relationships: [
          {
            foreignKeyName: "food_donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "neighborhood_leaderboard"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "food_donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "food_donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "user_dashboard_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "food_donations_ngo_id_fkey"
            columns: ["ngo_id"]
            isOneToOne: false
            referencedRelation: "ngos"
            referencedColumns: ["id"]
          },
        ]
      }
      lca_data: {
        Row: {
          Brand_Name: string | null
          Carbon_Footprint_kg: number | null
          Category: string | null
          Disposal_Score: number | null
          Manufacturing_Score: number | null
          Price: number | null
          Product_ID: string
          Product_Name: string | null
          Raw_Materials: string | null
          Raw_Materials_Score: number | null
          Total_Impact_Score: number | null
          Transportation_Score: number | null
          Usage_Score: number | null
          Views: number | null
          Water_Footprint_L: number | null
        }
        Insert: {
          Brand_Name?: string | null
          Carbon_Footprint_kg?: number | null
          Category?: string | null
          Disposal_Score?: number | null
          Manufacturing_Score?: number | null
          Price?: number | null
          Product_ID: string
          Product_Name?: string | null
          Raw_Materials?: string | null
          Raw_Materials_Score?: number | null
          Total_Impact_Score?: number | null
          Transportation_Score?: number | null
          Usage_Score?: number | null
          Views?: number | null
          Water_Footprint_L?: number | null
        }
        Update: {
          Brand_Name?: string | null
          Carbon_Footprint_kg?: number | null
          Category?: string | null
          Disposal_Score?: number | null
          Manufacturing_Score?: number | null
          Price?: number | null
          Product_ID?: string
          Product_Name?: string | null
          Raw_Materials?: string | null
          Raw_Materials_Score?: number | null
          Total_Impact_Score?: number | null
          Transportation_Score?: number | null
          Usage_Score?: number | null
          Views?: number | null
          Water_Footprint_L?: number | null
        }
        Relationships: []
      }
      leaderboards: {
        Row: {
          calculated_at: string | null
          id: number
          metric_type: string
          neighborhood_id: string | null
          period: string
          period_end: string
          period_start: string
          rank_position: number | null
          user_id: string
          value: number
        }
        Insert: {
          calculated_at?: string | null
          id?: number
          metric_type: string
          neighborhood_id?: string | null
          period: string
          period_end: string
          period_start: string
          rank_position?: number | null
          user_id: string
          value: number
        }
        Update: {
          calculated_at?: string | null
          id?: number
          metric_type?: string
          neighborhood_id?: string | null
          period?: string
          period_end?: string
          period_start?: string
          rank_position?: number | null
          user_id?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "leaderboards_neighborhood_id_fkey"
            columns: ["neighborhood_id"]
            isOneToOne: false
            referencedRelation: "neighborhoods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leaderboards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "neighborhood_leaderboard"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "leaderboards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leaderboards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_dashboard_summary"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_categories: {
        Row: {
          created_at: string | null
          icon_url: string | null
          id: number
          name: string
          parent_id: number | null
          sustainability_focus: boolean | null
        }
        Insert: {
          created_at?: string | null
          icon_url?: string | null
          id?: number
          name: string
          parent_id?: number | null
          sustainability_focus?: boolean | null
        }
        Update: {
          created_at?: string | null
          icon_url?: string | null
          id?: number
          name?: string
          parent_id?: number | null
          sustainability_focus?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "marketplace_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_orders: {
        Row: {
          delivered_at: string | null
          delivery_address: string | null
          eco_coins_earned: number | null
          eco_coins_used: number | null
          id: number
          order_date: string | null
          status: string | null
          total_amount: number
          total_carbon_footprint: number | null
          user_id: string
          vendor_id: number
        }
        Insert: {
          delivered_at?: string | null
          delivery_address?: string | null
          eco_coins_earned?: number | null
          eco_coins_used?: number | null
          id?: number
          order_date?: string | null
          status?: string | null
          total_amount: number
          total_carbon_footprint?: number | null
          user_id: string
          vendor_id: number
        }
        Update: {
          delivered_at?: string | null
          delivery_address?: string | null
          eco_coins_earned?: number | null
          eco_coins_used?: number | null
          id?: number
          order_date?: string | null
          status?: string | null
          total_amount?: number
          total_carbon_footprint?: number | null
          user_id?: string
          vendor_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "neighborhood_leaderboard"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "marketplace_orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marketplace_orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_dashboard_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marketplace_orders_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "marketplace_vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_products: {
        Row: {
          carbon_footprint: number | null
          category_id: number | null
          condition: string | null
          created_at: string | null
          description: string | null
          id: number
          images: Json | null
          is_active: boolean | null
          is_eco_friendly: boolean | null
          is_second_hand: boolean | null
          name: string
          price_inr: number
          recyclability_score: number | null
          stock_quantity: number | null
          sustainability_score: number | null
          updated_at: string | null
          vendor_id: number
          water_footprint: number | null
        }
        Insert: {
          carbon_footprint?: number | null
          category_id?: number | null
          condition?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          images?: Json | null
          is_active?: boolean | null
          is_eco_friendly?: boolean | null
          is_second_hand?: boolean | null
          name: string
          price_inr: number
          recyclability_score?: number | null
          stock_quantity?: number | null
          sustainability_score?: number | null
          updated_at?: string | null
          vendor_id: number
          water_footprint?: number | null
        }
        Update: {
          carbon_footprint?: number | null
          category_id?: number | null
          condition?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          images?: Json | null
          is_active?: boolean | null
          is_eco_friendly?: boolean | null
          is_second_hand?: boolean | null
          name?: string
          price_inr?: number
          recyclability_score?: number | null
          stock_quantity?: number | null
          sustainability_score?: number | null
          updated_at?: string | null
          vendor_id?: number
          water_footprint?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "marketplace_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marketplace_products_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "marketplace_vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_vendors: {
        Row: {
          address: string | null
          business_name: string
          carbon_footprint: number | null
          certifications: Json | null
          created_at: string | null
          email: string
          energy_usage_kwh: number | null
          id: number
          is_active: boolean | null
          is_verified: boolean | null
          owner_user_id: string | null
          phone: string | null
          sustainability_score: number | null
        }
        Insert: {
          address?: string | null
          business_name: string
          carbon_footprint?: number | null
          certifications?: Json | null
          created_at?: string | null
          email: string
          energy_usage_kwh?: number | null
          id?: number
          is_active?: boolean | null
          is_verified?: boolean | null
          owner_user_id?: string | null
          phone?: string | null
          sustainability_score?: number | null
        }
        Update: {
          address?: string | null
          business_name?: string
          carbon_footprint?: number | null
          certifications?: Json | null
          created_at?: string | null
          email?: string
          energy_usage_kwh?: number | null
          id?: number
          is_active?: boolean | null
          is_verified?: boolean | null
          owner_user_id?: string | null
          phone?: string | null
          sustainability_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_vendors_owner_user_id_fkey"
            columns: ["owner_user_id"]
            isOneToOne: false
            referencedRelation: "neighborhood_leaderboard"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "marketplace_vendors_owner_user_id_fkey"
            columns: ["owner_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marketplace_vendors_owner_user_id_fkey"
            columns: ["owner_user_id"]
            isOneToOne: false
            referencedRelation: "user_dashboard_summary"
            referencedColumns: ["id"]
          },
        ]
      }
      neighborhoods: {
        Row: {
          average_energy_usage: number | null
          boundary_coords: Json | null
          city: string
          created_at: string | null
          id: string
          leaderboard_visible: boolean | null
          name: string
          pincode: string | null
          state: string
          total_households: number | null
        }
        Insert: {
          average_energy_usage?: number | null
          boundary_coords?: Json | null
          city: string
          created_at?: string | null
          id?: string
          leaderboard_visible?: boolean | null
          name: string
          pincode?: string | null
          state: string
          total_households?: number | null
        }
        Update: {
          average_energy_usage?: number | null
          boundary_coords?: Json | null
          city?: string
          created_at?: string | null
          id?: string
          leaderboard_visible?: boolean | null
          name?: string
          pincode?: string | null
          state?: string
          total_households?: number | null
        }
        Relationships: []
      }
      ngos: {
        Row: {
          address: string
          contact_person: string | null
          created_at: string | null
          current_capacity: number | null
          email: string
          id: number
          is_active: boolean | null
          is_verified: boolean | null
          latitude: number | null
          longitude: number | null
          name: string
          phone: string
          rating: number | null
          service_areas: Json | null
          specialization: Json | null
        }
        Insert: {
          address: string
          contact_person?: string | null
          created_at?: string | null
          current_capacity?: number | null
          email: string
          id?: number
          is_active?: boolean | null
          is_verified?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name: string
          phone: string
          rating?: number | null
          service_areas?: Json | null
          specialization?: Json | null
        }
        Update: {
          address?: string
          contact_person?: string | null
          created_at?: string | null
          current_capacity?: number | null
          email?: string
          id?: number
          is_active?: boolean | null
          is_verified?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          phone?: string
          rating?: number | null
          service_areas?: Json | null
          specialization?: Json | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          id: number
          is_read: boolean | null
          message: string
          metadata: Json | null
          notification_type: string
          priority: string | null
          title: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          id?: number
          is_read?: boolean | null
          message: string
          metadata?: Json | null
          notification_type: string
          priority?: string | null
          title: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          id?: number
          is_read?: boolean | null
          message?: string
          metadata?: Json | null
          notification_type?: string
          priority?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "neighborhood_leaderboard"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_dashboard_summary"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          id: number
          order_id: number
          product_id: number
          quantity: number
          subtotal: number
          unit_price: number
        }
        Insert: {
          id?: number
          order_id: number
          product_id: number
          quantity: number
          subtotal: number
          unit_price: number
        }
        Update: {
          id?: number
          order_id?: number
          product_id?: number
          quantity?: number
          subtotal?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "marketplace_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "marketplace_products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_database: {
        Row: {
          alternatives: Json | null
          barcode: string | null
          brand: string | null
          carbon_footprint_kg: number | null
          category: string
          created_at: string | null
          disposal_score: number | null
          eco_tips: Json | null
          id: number
          manufacturing_score: number | null
          name: string
          overall_lca_score: number | null
          raw_material_score: number | null
          recyclability_percentage: number | null
          subcategory: string | null
          transport_score: number | null
          updated_at: string | null
          usage_score: number | null
          water_footprint_liters: number | null
        }
        Insert: {
          alternatives?: Json | null
          barcode?: string | null
          brand?: string | null
          carbon_footprint_kg?: number | null
          category: string
          created_at?: string | null
          disposal_score?: number | null
          eco_tips?: Json | null
          id?: number
          manufacturing_score?: number | null
          name: string
          overall_lca_score?: number | null
          raw_material_score?: number | null
          recyclability_percentage?: number | null
          subcategory?: string | null
          transport_score?: number | null
          updated_at?: string | null
          usage_score?: number | null
          water_footprint_liters?: number | null
        }
        Update: {
          alternatives?: Json | null
          barcode?: string | null
          brand?: string | null
          carbon_footprint_kg?: number | null
          category?: string
          created_at?: string | null
          disposal_score?: number | null
          eco_tips?: Json | null
          id?: number
          manufacturing_score?: number | null
          name?: string
          overall_lca_score?: number | null
          raw_material_score?: number | null
          recyclability_percentage?: number | null
          subcategory?: string | null
          transport_score?: number | null
          updated_at?: string | null
          usage_score?: number | null
          water_footprint_liters?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          created_at: string | null
          current_streak: number | null
          eco_coins: number | null
          email: string | null
          full_name: string | null
          house_type: string | null
          household_size: number | null
          id: string
          last_login: string | null
          latitude: number | null
          level: number | null
          longest_streak: number | null
          longitude: number | null
          monthly_carbon_budget: number | null
          monthly_energy_budget: number | null
          neighborhood_id: string | null
          notifications_enabled: boolean | null
          phone: string | null
          privacy_level: string | null
          total_points: number | null
          updated_at: string | null
          username: string
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string | null
          current_streak?: number | null
          eco_coins?: number | null
          email?: string | null
          full_name?: string | null
          house_type?: string | null
          household_size?: number | null
          id: string
          last_login?: string | null
          latitude?: number | null
          level?: number | null
          longest_streak?: number | null
          longitude?: number | null
          monthly_carbon_budget?: number | null
          monthly_energy_budget?: number | null
          neighborhood_id?: string | null
          notifications_enabled?: boolean | null
          phone?: string | null
          privacy_level?: string | null
          total_points?: number | null
          updated_at?: string | null
          username: string
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string | null
          current_streak?: number | null
          eco_coins?: number | null
          email?: string | null
          full_name?: string | null
          house_type?: string | null
          household_size?: number | null
          id?: string
          last_login?: string | null
          latitude?: number | null
          level?: number | null
          longest_streak?: number | null
          longitude?: number | null
          monthly_carbon_budget?: number | null
          monthly_energy_budget?: number | null
          neighborhood_id?: string | null
          notifications_enabled?: boolean | null
          phone?: string | null
          privacy_level?: string | null
          total_points?: number | null
          updated_at?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_neighborhood_id_fkey"
            columns: ["neighborhood_id"]
            isOneToOne: false
            referencedRelation: "neighborhoods"
            referencedColumns: ["id"]
          },
        ]
      }
      recycling_logs: {
        Row: {
          confidence_score: number | null
          created_at: string | null
          disposal_method: string | null
          eco_coins_earned: number | null
          id: number
          item_description: string | null
          item_image_url: string | null
          material_type: string | null
          recyclable: boolean
          recycling_instructions: string | null
          user_id: string
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string | null
          disposal_method?: string | null
          eco_coins_earned?: number | null
          id?: number
          item_description?: string | null
          item_image_url?: string | null
          material_type?: string | null
          recyclable: boolean
          recycling_instructions?: string | null
          user_id: string
        }
        Update: {
          confidence_score?: number | null
          created_at?: string | null
          disposal_method?: string | null
          eco_coins_earned?: number | null
          id?: number
          item_description?: string | null
          item_image_url?: string | null
          material_type?: string | null
          recyclable?: boolean
          recycling_instructions?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recycling_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "neighborhood_leaderboard"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "recycling_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recycling_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_dashboard_summary"
            referencedColumns: ["id"]
          },
        ]
      }
      reward_catalog: {
        Row: {
          cost_eco_coins: number
          created_at: string | null
          description: string | null
          id: number
          image_url: string | null
          is_active: boolean | null
          name: string
          reward_type: string
          stock_quantity: number | null
          terms_conditions: string | null
          vendor: string | null
        }
        Insert: {
          cost_eco_coins: number
          created_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          is_active?: boolean | null
          name: string
          reward_type: string
          stock_quantity?: number | null
          terms_conditions?: string | null
          vendor?: string | null
        }
        Update: {
          cost_eco_coins?: number
          created_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          reward_type?: string
          stock_quantity?: number | null
          terms_conditions?: string | null
          vendor?: string | null
        }
        Relationships: []
      }
      reward_redemptions: {
        Row: {
          eco_coins_spent: number
          expires_at: string | null
          id: number
          redeemed_at: string | null
          redemption_code: string | null
          reward_id: number
          status: string | null
          user_id: string
        }
        Insert: {
          eco_coins_spent: number
          expires_at?: string | null
          id?: number
          redeemed_at?: string | null
          redemption_code?: string | null
          reward_id: number
          status?: string | null
          user_id: string
        }
        Update: {
          eco_coins_spent?: number
          expires_at?: string | null
          id?: number
          redeemed_at?: string | null
          redemption_code?: string | null
          reward_id?: number
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reward_redemptions_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "reward_catalog"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reward_redemptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "neighborhood_leaderboard"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "reward_redemptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reward_redemptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_dashboard_summary"
            referencedColumns: ["id"]
          },
        ]
      }
      shared_quests: {
        Row: {
          created_at: string | null
          current_progress: number | null
          deadline: string | null
          id: number
          match_id: number
          quest_description: string
          quest_title: string
          reward_eco_coins: number
          status: string | null
          target_unit: string
          target_value: number
        }
        Insert: {
          created_at?: string | null
          current_progress?: number | null
          deadline?: string | null
          id?: number
          match_id: number
          quest_description: string
          quest_title: string
          reward_eco_coins: number
          status?: string | null
          target_unit: string
          target_value: number
        }
        Update: {
          created_at?: string | null
          current_progress?: number | null
          deadline?: string | null
          id?: number
          match_id?: number
          quest_description?: string
          quest_title?: string
          reward_eco_coins?: number
          status?: string | null
          target_unit?: string
          target_value?: number
        }
        Relationships: [
          {
            foreignKeyName: "shared_quests_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "tinder_matches"
            referencedColumns: ["id"]
          },
        ]
      }
      tinder_matches: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: number
          matched_on: string | null
          reference_id: number | null
          status: string | null
          user1_id: string
          user2_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: number
          matched_on?: string | null
          reference_id?: number | null
          status?: string | null
          user1_id: string
          user2_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: number
          matched_on?: string | null
          reference_id?: number | null
          status?: string | null
          user1_id?: string
          user2_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tinder_matches_user1_id_fkey"
            columns: ["user1_id"]
            isOneToOne: false
            referencedRelation: "neighborhood_leaderboard"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "tinder_matches_user1_id_fkey"
            columns: ["user1_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tinder_matches_user1_id_fkey"
            columns: ["user1_id"]
            isOneToOne: false
            referencedRelation: "user_dashboard_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tinder_matches_user2_id_fkey"
            columns: ["user2_id"]
            isOneToOne: false
            referencedRelation: "neighborhood_leaderboard"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "tinder_matches_user2_id_fkey"
            columns: ["user2_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tinder_matches_user2_id_fkey"
            columns: ["user2_id"]
            isOneToOne: false
            referencedRelation: "user_dashboard_summary"
            referencedColumns: ["id"]
          },
        ]
      }
      tip_interactions: {
        Row: {
          created_at: string | null
          id: number
          interaction_type: string
          tip_id: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          interaction_type: string
          tip_id: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          interaction_type?: string
          tip_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tip_interactions_tip_id_fkey"
            columns: ["tip_id"]
            isOneToOne: false
            referencedRelation: "energy_tips"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tip_interactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "neighborhood_leaderboard"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "tip_interactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tip_interactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_dashboard_summary"
            referencedColumns: ["id"]
          },
        ]
      }
      uploaded_bills: {
        Row: {
          bill_month: string | null
          created_at: string | null
          file_name: string | null
          file_url: string
          id: number
          kwh_consumed: number | null
          parsed_data: Json | null
          parsing_status: string | null
          total_amount: number | null
          user_id: string
        }
        Insert: {
          bill_month?: string | null
          created_at?: string | null
          file_name?: string | null
          file_url: string
          id?: number
          kwh_consumed?: number | null
          parsed_data?: Json | null
          parsing_status?: string | null
          total_amount?: number | null
          user_id: string
        }
        Update: {
          bill_month?: string | null
          created_at?: string | null
          file_name?: string | null
          file_url?: string
          id?: number
          kwh_consumed?: number | null
          parsed_data?: Json | null
          parsing_status?: string | null
          total_amount?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "uploaded_bills_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "neighborhood_leaderboard"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "uploaded_bills_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "uploaded_bills_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_dashboard_summary"
            referencedColumns: ["id"]
          },
        ]
      }
      user_badges: {
        Row: {
          badge_id: number
          earned_at: string | null
          id: number
          progress_data: Json | null
          user_id: string
        }
        Insert: {
          badge_id: number
          earned_at?: string | null
          id?: number
          progress_data?: Json | null
          user_id: string
        }
        Update: {
          badge_id?: number
          earned_at?: string | null
          id?: number
          progress_data?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_badges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "neighborhood_leaderboard"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_badges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_badges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_dashboard_summary"
            referencedColumns: ["id"]
          },
        ]
      }
      user_challenges: {
        Row: {
          challenge_id: number
          completed_at: string | null
          eco_coins_earned: number | null
          id: number
          joined_at: string | null
          points_earned: number | null
          progress: number | null
          status: string | null
          user_id: string
        }
        Insert: {
          challenge_id: number
          completed_at?: string | null
          eco_coins_earned?: number | null
          id?: number
          joined_at?: string | null
          points_earned?: number | null
          progress?: number | null
          status?: string | null
          user_id: string
        }
        Update: {
          challenge_id?: number
          completed_at?: string | null
          eco_coins_earned?: number | null
          id?: number
          joined_at?: string | null
          points_earned?: number | null
          progress?: number | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_challenges_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_challenges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "neighborhood_leaderboard"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_challenges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_challenges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_dashboard_summary"
            referencedColumns: ["id"]
          },
        ]
      }
      user_purchases: {
        Row: {
          created_at: string | null
          eco_coins_impact: number | null
          id: number
          price_inr: number | null
          product_id: number | null
          purchase_date: string
          quantity: number
          receipt_url: string | null
          source: string | null
          total_carbon_impact: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          eco_coins_impact?: number | null
          id?: number
          price_inr?: number | null
          product_id?: number | null
          purchase_date: string
          quantity: number
          receipt_url?: string | null
          source?: string | null
          total_carbon_impact?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          eco_coins_impact?: number | null
          id?: number
          price_inr?: number | null
          product_id?: number | null
          purchase_date?: string
          quantity?: number
          receipt_url?: string | null
          source?: string | null
          total_carbon_impact?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_purchases_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product_database"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_purchases_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "neighborhood_leaderboard"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_purchases_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_purchases_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_dashboard_summary"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      active_food_donations: {
        Row: {
          assigned_at: string | null
          assigned_ngo_name: string | null
          carbon_saved_kg: number | null
          created_at: string | null
          delivered_at: string | null
          description: string | null
          donor_id: string | null
          donor_name: string | null
          donor_phone: string | null
          eco_coins_earned: number | null
          estimated_meals: number | null
          expiry_time: string | null
          food_type: string | null
          id: number | null
          ngo_id: number | null
          ngo_phone: string | null
          picked_up_at: string | null
          pickup_address: string | null
          pickup_latitude: number | null
          pickup_longitude: number | null
          preferred_pickup_time: string | null
          quantity: number | null
          status: string | null
          unit: string | null
        }
        Relationships: [
          {
            foreignKeyName: "food_donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "neighborhood_leaderboard"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "food_donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "food_donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "user_dashboard_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "food_donations_ngo_id_fkey"
            columns: ["ngo_id"]
            isOneToOne: false
            referencedRelation: "ngos"
            referencedColumns: ["id"]
          },
        ]
      }
      neighborhood_leaderboard: {
        Row: {
          eco_coins: number | null
          eco_coins_rank: number | null
          neighborhood_id: string | null
          neighborhood_name: string | null
          points_rank: number | null
          total_points: number | null
          user_id: string | null
          username: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_neighborhood_id_fkey"
            columns: ["neighborhood_id"]
            isOneToOne: false
            referencedRelation: "neighborhoods"
            referencedColumns: ["id"]
          },
        ]
      }
      user_dashboard_summary: {
        Row: {
          badges_earned: number | null
          challenges_completed: number | null
          current_month_carbon: number | null
          current_month_energy: number | null
          current_streak: number | null
          eco_coins: number | null
          id: string | null
          level: number | null
          neighborhood_name: string | null
          total_points: number | null
          username: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_user_monthly_carbon: {
        Args: { target_month: string; user_uuid: string }
        Returns: number
      }
      get_user_sustainability_score: {
        Args: { user_uuid: string }
        Returns: number
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
