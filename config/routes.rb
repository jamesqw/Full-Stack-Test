Rails.application.routes.draw do
    root 'app#index' 

    scope :api, defaults: { format: :json } do
        devise_for :users
        resources :users, only: [:index, :show, :create, :update, :destroy]
        resources :info, only: :index
        resources :import, only: :create
    end
    
    match '*path', to: 'app#index', via: [:get]
end
