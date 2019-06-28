require 'rest-client'
require 'webpush'

class Api::UsersController < ApplicationController
  # before_action :authorize_request, except: :create
  before_action :authorize_request, :except=>[:new, :create, :show, :index]

  def index
    users = User.all
    render :json => users
  end

    def create
      @user = User.create!(
        name: params['user']['name'],
        email: params['user']['email'],
        password: params['user']['password'],
        password_confirmation: params['user']['password_confirmation'],
        phone_number: params['user']['phone_number'],
        alerts: params['user']['alerts'],
        points: 0,
      )
      if @user.save
        # Api::UsersController::send_simple_message
        session[:user_id] = @user.id
        token = JsonWebToken.encode(user_id: @user.id)
        time = Time.now + 24.hours.to_i
        
        render json: { token: token, exp: time.strftime("%m-%d-%Y %H:%M"),
                       email: @user.email }, status: :ok
      else
        render :new
      end

    end

    # def self.send_simple_message
    #   begin
    #     RestClient.post "https://api:ddaa3462407f6461929a7f8d5127bea3-2b778fc3-ecada07f"\
    #         "@api.mailgun.net/v3/sandbox45b11e959d894cf7ba2916ea1fb0af8f.mailgun.org/messages",
    #         :from => "Excited User <mailgun@sandbox45b11e959d894cf7ba2916ea1fb0af8f.mailgun.org>",
    #         :to => "victor_win@hotmail.com",
    #         :subject => "Hello",
    #         :text => "Testing some Mailgun awesomness!"
    #   rescue RestClient::ExceptionWithResponse => e
    #     puts e.response
    #   end
    # end

    def subscribe
      @current_user.update!(
        endpoint: params[:subscription][:endpoint],
        p256dh: params[:subscription][:keys][:p256dh],
        auth: params[:subscription][:keys][:auth],
      )
    end

    def unsubscribe

    end


    def send_notification
      subscribers = User.where(alerts: true).where.not(endpoint: nil)
      subscribers.each do |subscriber|
      Webpush.payload_send(
        message: params[:message],
        image: params[:image],
        URL: params[:URL],
        endpoint: subscriber.endpoint,
        p256dh: subscriber.p256dh,
        auth: subscriber.auth,
        ttl: 24 * 60 * 60 * 7,
        vapid: {
          subject: "http://localhost:3001",
          public_key: ENV['VAPID_PUBLIC_KEY'],
          private_key: ENV['VAPID_PRIVATE_KEY'],
        },
        ssl_timeout: 25, 
        open_timeout: 25, 
        read_timeout: 25 
      )
      end
    end


end