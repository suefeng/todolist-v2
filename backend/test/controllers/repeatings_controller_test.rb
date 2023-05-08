require 'test_helper'

class RepeatingsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @repeating = repeatings(:one)
  end

  test "should get index" do
    get repeatings_url, as: :json
    assert_response :success
  end

  test "should create repeating" do
    assert_difference('Repeating.count') do
      post repeatings_url, params: { repeating: { name: @repeating.name } }, as: :json
    end

    assert_response 201
  end

  test "should show repeating" do
    get repeating_url(@repeating), as: :json
    assert_response :success
  end

  test "should update repeating" do
    patch repeating_url(@repeating), params: { repeating: { name: @repeating.name } }, as: :json
    assert_response 200
  end

  test "should destroy repeating" do
    assert_difference('Repeating.count', -1) do
      delete repeating_url(@repeating), as: :json
    end

    assert_response 204
  end
end
