class Api::UsersController < ApplicationController
    def index
      users = User.all
      render :json => users, :include=> [:address]
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

      @user = User.create!(
        name: params['user']['name'],
        email: params['user']['email'],
        password_digest: params['user']['password'],
        phone_number: params['user']['phone_number'],
        alerts: params['user']['alerts'],
        address_id: @address.id,

      )

      if @user.save
        render :json => @user, :include=> [:address]
      else
        render :new
      end

    end
end