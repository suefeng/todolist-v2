require 'test_helper'

class FrequenciesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @frequency = frequencies(:one)
  end

  test 'should get index' do
    get frequencies_url, as: :json
    assert_response :success
  end

  test 'should create frequency' do
    assert_difference('Frequency.count') do
      post frequencies_url, params: { frequency: { name: @frequency.name } }, as: :json
    end

    assert_response 201
  end

  test 'should show frequency' do
    get frequency_url(@frequency), as: :json
    assert_response :success
  end

  test 'should update frequency' do
    patch frequency_url(@frequency), params: { frequency: { name: @frequency.name } }, as: :json
    assert_response 200
  end

  test 'should destroy frequency' do
    assert_difference('Frequency.count', -1) do
      delete frequency_url(@frequency), as: :json
    end

    assert_response 204
  end
end
