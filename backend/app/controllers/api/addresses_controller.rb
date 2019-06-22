class API::AddressesController < ApplicationController
  def index
      addresses = Address.all
      render json: addresses
    end
end


