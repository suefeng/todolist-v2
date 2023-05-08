require 'test_helper'

class RepeatingJoinsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @repeating_join = repeating_joins(:one)
  end

  test "should get index" do
    get repeating_joins_url, as: :json
    assert_response :success
  end

  test "should create repeating_join" do
    assert_difference('RepeatingJoin.count') do
      post repeating_joins_url, params: { repeating_join: { repeating_id: @repeating_join.repeating_id, todo_id: @repeating_join.todo_id } }, as: :json
    end

    assert_response 201
  end

  test "should show repeating_join" do
    get repeating_join_url(@repeating_join), as: :json
    assert_response :success
  end

  test "should update repeating_join" do
    patch repeating_join_url(@repeating_join), params: { repeating_join: { repeating_id: @repeating_join.repeating_id, todo_id: @repeating_join.todo_id } }, as: :json
    assert_response 200
  end

  test "should destroy repeating_join" do
    assert_difference('RepeatingJoin.count', -1) do
      delete repeating_join_url(@repeating_join), as: :json
    end

    assert_response 204
  end
end
