Rails.application.routes.draw do
  namespace :api do
    resources :users, param: :_username

    post '/login', to: 'authentication#login'

    resources :pets
    resources :addresses
    resources :descriptions
  end
end

