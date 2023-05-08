class Api::V1::TodosController < ApplicationController
  before_action :set_todo, only: [:show, :update, :destroy]

  # GET /todos
  def index
    @todos = Todo.all
    filter = params[:filter]
    type = params[:type]

    if filter.nil? || type.nil?
      render_todos = @todos
    else
      render_todos = @todos.includes(:categories).where(categories:{name:filter})  if type == 'category'
      render_todos = @todos.includes(:repeatings).where(repeatings:{name:filter})  if type == 'repeating'
      render_todos = @todos.where(expiration:filter)  if type == 'expiration'
    end

    render json: render_todos.as_json(todos_json)
  end

  # GET /todos/1
  def show
    render json: @todo.as_json(todos_json)
  end

  # POST /todos
  def create
    @todo = Todo.new(todo_params)

    if @todo.save
      render json: @todo, status: :created
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /todos/1
  def update
    if @todo.update(todo_params)
      render json: @todo
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # DELETE /todos/1
  def destroy
    @todo.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_todo
      @todo = Todo.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def todo_params
      params.require(:todo).permit(
        :description, 
        :expiration,
        :status
      )
    end

    def todos_json
      {
        only: %i[id description expiration status],
        include: {
          categories: {only: %i[id name]},
          repeatings: {only: %i[id name]}
        }
      }
    end
end
