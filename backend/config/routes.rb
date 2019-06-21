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

Rails.application.routes.draw do
  namespace :api do
    resources :addresses
  end
end

Rails.application.routes.draw do
  namespace :api do
    resources :descriptions
  end
end