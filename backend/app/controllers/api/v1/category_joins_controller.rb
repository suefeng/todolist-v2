# frozen_string_literal: true

module Api
  module V1
    class CategoryJoinsController < ApplicationController
      before_action :set_category_join, only: %i[show update destroy]

      # GET /category_joins
      def index
        @category_joins = CategoryJoin.all

        render json: @category_joins
      end

      # GET /category_joins/1
      def show
        render json: @category_join
      end

      # POST /category_joins
      def create
        @category_join = CategoryJoin.new(category_join_params)

        if @category_join.save
          render json: @category_join, status: :created
        else
          render json: @category_join.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /category_joins/1
      def update
        if @category_join.update(category_join_params)
          render json: @category_join
        else
          render json: @category_join.errors, status: :unprocessable_entity
        end
      end

      # DELETE /category_joins/1
      def destroy
        @category_join.destroy
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_category_join
        @category_join = CategoryJoin.find_by(todo_id: params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def category_join_params
        params.require(:category_join).permit(:category_id, :todo_id)
      end
    end
  end
end
