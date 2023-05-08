class Api::V1::DayJoinsController < ApplicationController
  before_action :set_day_join, only: [:show, :update, :destroy]

  # GET /day_joins
  def index
    @day_joins = DayJoin.all

    render json: @day_joins
  end

  # GET /day_joins/1
  def show
    render json: @day_join
  end

  # POST /day_joins
  def create
    @day_join = DayJoin.new(day_join_params)

    if @day_join.save
      render json: @day_join, status: :created
    else
      render json: @day_join.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /day_joins/1
  def update
    if @day_join.update(day_join_params)
      render json: @day_join
    else
      render json: @day_join.errors, status: :unprocessable_entity
    end
  end

  # DELETE /day_joins/1
  def destroy
    @day_join.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_day_join
      @day_join = DayJoin.find_by(todo_id: params[:todo_id], day_id: params[:day_id])
    end

    # Only allow a trusted parameter "white list" through.
    def day_join_params
      params.require(:day_join).permit(:day_id, :todo_id)
    end
end
