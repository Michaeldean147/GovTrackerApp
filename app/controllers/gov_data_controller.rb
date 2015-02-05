require 'rest_client'

class GovDataController < ApplicationController
   def index

   end
  def api_call
    dataurl = params[:api_url]
    @response = RestClient.get(dataurl)
    render json: @response
  end
  def json_build
    a = params[:bio_id]
    render json: Legislator.where(bio_id: a)
  end
end
