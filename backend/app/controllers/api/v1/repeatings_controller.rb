class Api::V1::RepeatingsController < ApplicationController
  before_action :set_repeating, only: [:show, :update, :destroy]

  # GET /repeatings
  def index
    @repeatings = Repeating.all

    render json: @repeatings
  end

  # GET /repeatings/1
  def show
    render json: @repeating
  end

  # POST /repeatings
  def create
    @repeating = Repeating.new(repeating_params)

    if @repeating.save
      render json: @repeating, status: :created
    else
      render json: @repeating.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /repeatings/1
  def update
    if @repeating.update(repeating_params)
      render json: @repeating
    else
      render json: @repeating.errors, status: :unprocessable_entity
    end
  end

  # DELETE /repeatings/1
  def destroy
    @repeating.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_repeating
      @repeating = Repeating.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def repeating_params
      params.require(:repeating).permit(:name)
    end
end
