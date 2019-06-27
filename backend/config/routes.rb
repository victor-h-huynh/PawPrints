Rails.application.routes.draw do
  namespace :api do
    resources :users, param: :_username

    post '/authentication', to: 'authentication#create'
    get '/current_user', to: 'authentication#show'
    # resources :authentication
    resources :pets
    resources :addresses
    resources :descriptions
    post "/subscribe" => "users#subscribe"
    post "/notification" => "users#send_notification"
    
    # get "manifest.json" => "metadata#manifest", as: :manifest
  end
 
end

