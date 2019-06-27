class Api::AuthenticationController < ApplicationController
    before_action :authorize_request, except: :create

    def new
    end 

    def show
      puts @current_user.to_json
      if @current_user
        render json: @current_user.as_json(:except => [:password_digest]) 
      else
        puts 'Hello'
      end

    end
  
    # POST /auth/login
    def create
      @user = User.find_by_email(params[:email])

      if @user&.authenticate(params[:password])
        session[:user_id] = @user.id
        token = JsonWebToken.encode(user_id: @user.id)
        time = Time.now + 24.hours.to_i
        
        render json: { token: token, exp: time.strftime("%m-%d-%Y %H:%M"),
                       email: @user.email }, status: :ok
                       
      else
        render json: { error: 'unauthorized' }, status: :unauthorized
      end
    end
  
    private
  
    def login_params
      params.permit(:email, :password)
    end
  end