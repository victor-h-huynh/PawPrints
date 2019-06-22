class Api::PetsController < ApplicationController
    def index
      pets = Pet.all
      render :json => pets, :include=> [:address, :user, :description]
    end

    # def create
      # address = Address.create!(
      #   street_number: params['streetNumber'],
      #   street_name: params['streetName'],
      #   apartment: params['apartment'],
      #   city: params['city'],
      #   province: params['province'],
      #   postal_code: params['postalCode'], 
      # )
      # description = Description.create!(
      #   breed: params['description']['breed'],
      #   colour: params['description']['colour'],
      #   sex: params['description']['sex]'],
      #   additional: params['description']['additional'],
      # )
    #   pet = Pet.create!(
    #     name: params['name'],
    #     species: params['species'],
    #     status: params['status'],
    #     date_lost: params['date'],
    #     picture: params['picture'],
    #     # address_id: address.id,
    #     # description_id: description.id,
    #     user_id: params['user'],
    #   )
    # end

end

