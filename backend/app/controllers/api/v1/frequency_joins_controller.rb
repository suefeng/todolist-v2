class Api::V1::FrequencyJoinsController < ApplicationController
  before_action :set_frequency_join, only: %i[show update destroy]

  # GET /frequency_joins
  def index
    @frequency_joins = FrequencyJoin.all

    render json: @frequency_joins
  end

  # GET /frequency_joins/1
  def show
    render json: @frequency_join
  end

  # POST /frequency_joins
  def create
    @frequency_join = FrequencyJoin.new(frequency_join_params)

    if @frequency_join.save
      render json: @frequency_join, status: :created
    else
      render json: @frequency_join.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /frequency_joins/1
  def update
    if @frequency_join.update(frequency_join_params)
      render json: @frequency_join
    else
      render json: @frequency_join.errors, status: :unprocessable_entity
    end
  end

  # DELETE /frequency_joins/1
  def destroy
    @frequency_join.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_frequency_join
    @frequency_join = FrequencyJoin.find_by(todo_id: params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def frequency_join_params
    params.require(:frequency_join).permit(:frequency_id, :todo_id)
  end
end
