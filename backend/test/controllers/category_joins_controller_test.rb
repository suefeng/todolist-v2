require 'test_helper'

class CategoryJoinsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @category_join = category_joins(:one)
  end

  test "should get index" do
    get category_joins_url, as: :json
    assert_response :success
  end

  test "should create category_join" do
    assert_difference('CategoryJoin.count') do
      post category_joins_url, params: { category_join: { category_id: @category_join.category_id, todo_id: @category_join.todo_id } }, as: :json
    end

    assert_response 201
  end

  test "should show category_join" do
    get category_join_url(@category_join), as: :json
    assert_response :success
  end

  test "should update category_join" do
    patch category_join_url(@category_join), params: { category_join: { category_id: @category_join.category_id, todo_id: @category_join.todo_id } }, as: :json
    assert_response 200
  end

  test "should destroy category_join" do
    assert_difference('CategoryJoin.count', -1) do
      delete category_join_url(@category_join), as: :json
    end

    assert_response 204
  end
end
