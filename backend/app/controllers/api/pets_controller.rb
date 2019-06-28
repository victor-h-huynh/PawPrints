class Api::PetsController < ApplicationController
    # before_action :authorize_request, except: :create

    def index
      pets = Pet.all
      render :json => pets, :include=> [:address, :user, :description]
    end

    def update
      pet = Pet.find_by id: params['id']
      if params['update'] == 1
      pet.update(status: 'Reunited')
      pet.update(date_reunited: params['reunited'])
      elsif params['update'] == 2
      pet.update(pending: params['pending'])
      elsif params['update'] == 3
      pet.update(pending: params['pending'])
    elsif params['update'] == 4
      pet.update(pending: params['pending'])


      end
      if pet.save
        render :json => pet, :include=> [:address, :user, :description]
      else
        render :new
      end

    end

    def create
      rubyDate = Time.at(params['pet']['date_lost'] / 1000)
      @address = Address.create!(
        street_number: params['address']['street_number'],
        street_name: params['address']['street_name'],
        apartment: params['address']['apartment'],
        city: params['address']['city'],
        province: params['address']['province'],
        postal_code: params['address']['postal_code'],
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
        date_lost: rubyDate,
        picture: params['pet']['picture'],
        picture_merged: params['pet']['picture_merged'],
        latitude: params['pet']['latitude'],
        longitude: params['pet']['longitude'],
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

