require "test_helper"

class CensusDataControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get census_data_new_url
    assert_response :success
  end

  test "should get create" do
    get census_data_create_url
    assert_response :success
  end
end
