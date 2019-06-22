class Api::PetsController < ApplicationController
    def index
      pets = Pet.all
      render :json => pets, :include=> [:address, :user, :description]
    end

    def create
      puts params
      address = Address.create!(
        street_number: params['address']['street_number'],
        street_name: params['address']['street_name'],
        apartment: params['address']['apartment'],
        city: params['address']['city'],
        province: params['address']['province'],
        postal_code: params['address']['postal_code'], 
        latitude: params['address']['latitude'],
        longitude: params['address']['longitude']
      )
      description = Description.create!(
        breed: params['description']['breed'],
        colour: params['description']['colour'],
        sex: params['description']['sex]'],
        additional: params['description']['additional'],
      )
      pet = Pet.create!(
        name: params['name'],
        species: params['species'],
        status: params['status'],
        date_lost: params['date'],
        picture: params['picture'],
        address_id: address.id,
        description_id: description.id,
        user_id: params['user_id'],
      )
    end

end

