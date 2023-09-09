# frozen_string_literal: true

module Api
  module V1
    class FrequenciesController < ApplicationController
      before_action :set_frequency, only: %i[show update destroy]

      # GET /frequencies
      def index
        @frequencies = Frequency.all

        render json: @frequencies
      end

      # GET /frequencies/1
      def show
        render json: @frequency
      end

      # POST /frequencies
      def create
        @frequency = Frequency.new(frequency_params)

        if @frequency.save
          render json: @frequency, status: :created
        else
          render json: @frequency.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /frequencies/1
      def update
        if @frequency.update(frequency_params)
          render json: @frequency
        else
          render json: @frequency.errors, status: :unprocessable_entity
        end
      end

      # DELETE /frequencies/1
      def destroy
        @frequency.destroy
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_frequency
        @frequency = Frequency.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def frequency_params
        params.require(:frequency).permit(:name)
      end
    end
  end
end
