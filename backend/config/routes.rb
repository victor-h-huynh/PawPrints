Rails.application.routes.draw do
  namespace :api do
    resources :users, param: :_username

    post '/authentication', to: 'authentication#create'
    get '/current_user', to: 'authentication#show'
    
    resources :pets do 
      resources :comments
    end

    resources :addresses
    resources :descriptions

    post "/subscribe" => "users#subscribe"
    post "/unsubcribe" => "users#unsubscribe"
    post "/notification" => "users#send_notification"
    post "/user_notification" =>"users#send_usernotification"
    get '/subscriptions' => "users#get_subscriptions"
    
    # get "manifest.json" => "metadata#manifest", as: :manifest
  end
 
end

