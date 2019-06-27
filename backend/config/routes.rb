Rails.application.routes.draw do
  namespace :api do
    resources :users
    resources :pets
    resources :addresses
    resources :descriptions
    post "/subscribe" => "users#subscribe"
  end
 
end
