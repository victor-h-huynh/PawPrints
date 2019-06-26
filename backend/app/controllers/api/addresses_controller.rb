class Api::AddressesController < ApplicationController
  # before_action :authorize_request, except: :create
  
  def index
      addresses = Address.all
      render json: addresses
    end
end


