require 'test_helper'

class DayJoinsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @day_join = day_joins(:one)
  end

  test "should get index" do
    get day_joins_url, as: :json
    assert_response :success
  end

  test "should create day_join" do
    assert_difference('DayJoin.count') do
      post day_joins_url, params: { day_join: { day_id: @day_join.day_id, todo_id: @day_join.todo_id } }, as: :json
    end

    assert_response 201
  end

  test "should show day_join" do
    get day_join_url(@day_join), as: :json
    assert_response :success
  end

  test "should update day_join" do
    patch day_join_url(@day_join), params: { day_join: { day_id: @day_join.day_id, todo_id: @day_join.todo_id } }, as: :json
    assert_response 200
  end

  test "should destroy day_join" do
    assert_difference('DayJoin.count', -1) do
      delete day_join_url(@day_join), as: :json
    end

    assert_response 204
  end
end
