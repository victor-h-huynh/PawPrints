class Api::UsersController < ApplicationController

    # GET /users/{username}
  # def show
  #   render json: @user, status: :ok
  # end
  def index
    users = User.all
    render :json => users, :include=> [:address]
  end

  # POST /users
  # def create
  #   @user = User.new(user_params)
  #   if @user.save
  #     render json: @user, status: :created
  #   else
  #     render json: { errors: @user.errors.full_messages },
  #            status: :unprocessable_entity

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
        address_id: @address.id,

      )

      if @user.save
        render :json => @user, :include=> [:address]
      else
        render :new
      end

    end


  # def destroy
  #   @user.destroy
  # end

  # private

  # def find_user
  #   @user = User.find_by_username!(params[:_username])
  #   rescue ActiveRecord::RecordNotFound
  #     render json: { errors: 'User not found' }, status: :not_found
  # end

  # def user_params
  #   params.permit(
  #     :email, :password
  #   )
  # end
end