class Api::V1::RepeatingJoinsController < ApplicationController
  before_action :set_repeating_join, only: [:show, :update, :destroy]

  # GET /repeating_joins
  def index
    @repeating_joins = RepeatingJoin.all

    render json: @repeating_joins
  end

  # GET /repeating_joins/1
  def show
    render json: @repeating_join
  end

  # POST /repeating_joins
  def create
    @repeating_join = RepeatingJoin.new(repeating_join_params)

    if @repeating_join.save
      render json: @repeating_join, status: :created
    else
      render json: @repeating_join.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /repeating_joins/1
  def update
    if @repeating_join.update(repeating_join_params)
      render json: @repeating_join
    else
      render json: @repeating_join.errors, status: :unprocessable_entity
    end
  end

  # DELETE /repeating_joins/1
  def destroy
    @repeating_join.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_repeating_join
      @repeating_join = RepeatingJoin.find_by(todo_id: params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def repeating_join_params
      params.require(:repeating_join).permit(:repeating_id, :todo_id)
    end
end
