require 'rest-client'

class Api::UsersController < ApplicationController
  # before_action :authorize_request, except: :create

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
        password: params['user']['password'],
        password_confirmation: params['user']['password_confirmation'],
        phone_number: params['user']['phone_number'],
        alerts: params['user']['alerts'],
        points: 0,
        address_id: @address.id,

      )

      if @user.save
        Api::UsersController::send_simple_message
        render :json => @user, :include=> [:address]
      else
        render :new
      end

    end

    def self.send_simple_message
      begin
        RestClient.post "https://api:ddaa3462407f6461929a7f8d5127bea3-2b778fc3-ecada07f"\
            "@api.mailgun.net/v3/sandbox45b11e959d894cf7ba2916ea1fb0af8f.mailgun.org/messages",
            :from => "Excited User <mailgun@sandbox45b11e959d894cf7ba2916ea1fb0af8f.mailgun.org>",
            :to => "victor_win@hotmail.com",
            :subject => "Hello",
            :text => "Testing some Mailgun awesomness!"
      rescue RestClient::ExceptionWithResponse => e
        puts e.response
      end
    end
end