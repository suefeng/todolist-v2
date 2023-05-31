require 'test_helper'

class FrequencyJoinsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @frequency_join = frequency_joins(:one)
  end

  test 'should get index' do
    get frequency_joins_url, as: :json
    assert_response :success
  end

  test 'should create frequency_join' do
    assert_difference('FrequencyJoin.count') do
      post frequency_joins_url,
           params: { frequency_join: { frequency_id: @frequency_join.frequency_id, todo_id: @frequency_join.todo_id } }, as: :json
    end

    assert_response 201
  end

  test 'should show frequency_join' do
    get frequency_join_url(@frequency_join), as: :json
    assert_response :success
  end

  test 'should update frequency_join' do
    patch frequency_join_url(@frequency_join),
          params: { frequency_join: { frequency_id: @frequency_join.frequency_id, todo_id: @frequency_join.todo_id } }, as: :json
    assert_response 200
  end

  test 'should destroy frequency_join' do
    assert_difference('FrequencyJoin.count', -1) do
      delete frequency_join_url(@frequency_join), as: :json
    end

    assert_response 204
  end
end
