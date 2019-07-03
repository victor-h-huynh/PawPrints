class Api::PetsController < ApplicationController
    # before_action :authorize_request, except: :create

    def index
      pets = Pet.all
      render :json => pets.reverse, :include=> [:address, :user, :description]
    end

    def update
      pet = Pet.find_by id: params['id']
      puts params['update']
      if params['update'] == 1
        pet.update(status: 'Reunited')
        pet.update(date_reunited: params['reunited'])
        pet.update(pending: params['pending'])
      elsif params['update'] == 2
        pet.update(pending: params['pending'])
      elsif params['update'] == 3
        pet.update(pending: params['pending'])
      elsif params['update'] == 4
        pet.update(pending: params['pending'])
        pet.update(status: params[:status])
        pet.update(date_reunited: params['reunited'])
      elsif params['update'] == 5
        pet.update(pending: params['pending'])
        pet.update(status: params[:status])
        pet.update(date_reunited: params['reunited'])


      end
      if pet.save
        render :json => pet, :include=> [:address, :user, :description]
      else
        render status: :not_found, :json => pet.errors.full_messages
      end

    end

    def create
      if params['pet']['date_lost']
        rubyDate = Time.at(params['pet']['date_lost'] / 1000)
      else
        rubyDate = ''
      end
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
        sex: params['description']['sex'],
        additional: params['description']['additional'],
      )
      @pet = Pet.new(
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
        render status: :not_found, :json => @pet.errors.full_messages
        # render status: :not_found, :json => @address.errors.full_messages
        # render status: :not_found, :json => @pet.errors.full_messages

      end

    end

end

