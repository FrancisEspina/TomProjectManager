Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'users/registrations' }
  namespace :users do
    resources :user, only: [:index, :show, :update] do
      member do
        patch :upload_profile_picture
      end
    end
  end
    resources :posts, only: [:index, :create]
    resources :announcements, only: [:index]
    resources :hearts, only: [:create] do
      member do
        get :get_user_hearts
      end
    end


  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
  