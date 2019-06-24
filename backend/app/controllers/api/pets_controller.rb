class Api::PetsController < ApplicationController
    def index
      pets = Pet.all
      render :json => pets, :include=> [:address, :user, :description]
    end

    def create
      @address = Address.create!(
        street_number: params['address']['street_number'],
        street_name: params['address']['street_name'],
        apartment: params['address']['apartment'],
        city: params['address']['city'],
        province: params['address']['province'],
        postal_code: params['address']['postal_code'], 
        latitude: params['address']['latitude'],
        longitude: params['address']['longitude']
      )
      @description = Description.create!(
        breed: params['description']['breed'],
        colour: params['description']['colour'],
        sex: params['description']['sex]'],
        additional: params['description']['additional'],
      )
      @pet = Pet.create!(
        name: params['pet']['name'],
        species: params['pet']['species'],
        status: params['pet']['status'],
        date_lost: params['pet']['date'],
        picture: params['pet']['picture'],
        address_id: @address.id,
        description_id: @description.id,
        user_id: params['pet']['user_id'],
      )

      if @pet.save
        render :json => @pet, :include=> [:address, :user, :description]
      else
        render :new
      end

    end

end

