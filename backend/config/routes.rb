Rails.application.routes.draw do
  namespace :api do
    resources :users
  end
end

Rails.application.routes.draw do
  namespace :api do
    resources :pets
  end
end