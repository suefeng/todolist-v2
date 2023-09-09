# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::TodosControllers', type: :request do
  let!(:todos) { create_list(:todo, 2, :with_note, :with_categories, :with_frequencies, :with_days) }

  describe '#index' do
    it 'returns 200 with todo' do
      get api_v1_todos_path

      expect(response).to have_http_status(200)
      expect(Todo.count).to eq(2)
      expect(json_response_body(response).count).to eq(2)
      expect(json_response_body(response)[0]['description']).to eq('description here')
    end
  end

  describe '#show' do
    it 'shows first todo item' do
      get api_v1_todo_path(id: todos.first.id)

      expect(Todo.count).to eq(2)
      expect(json_response_body(response)['id']).to eq(todos.first.id)
      expect(json_response_body(response)['description']).to eq('description here')
    end
  end

  describe '#update' do
    it 'update todo item description' do
      put api_v1_todo_path(id: todos.first.id, params: { todo: { description: 'new description' } })

      expect(Todo.count).to eq(2)
      expect(Todo.first.description).to eq('new description')
    end
  end

  describe '#destroy' do
    it 'delete todo item' do
      delete api_v1_todo_path(id: todos.first.id)

      expect(Todo.count).to eq(1)
    end
  end

  private

  def json_response_body(response)
    JSON.parse(response.body)
  end
end
