Rails.application.routes.draw do
  get 'census_data/new'
  get 'census_data/create'
  root   "static_pages#home"
  get    "/help",   to: "static_pages#help"
  get    "/about",  to: "static_pages#about"
  get    "/contact",to: "static_pages#contact"
  get    "/signup", to: "users#new"
  get    "/count", to: "forms#new"
  #post '/count', to: 'form#create'
  get    "/login",  to: "sessions#new"
  post   "/login",  to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get '/visualization', to: 'forms#visualization'

  resources :users do
    member do
      get :following, :followers
    end
  end
  resources :account_activations, only: [:edit]
  resources :password_resets,     only: [:new, :create, :edit, :update]
  resources :microposts,          only: [:create, :destroy]
  resources :forms,                only: [:new, :create, :destroy]
  resources :relationships,       only: [:create, :destroy]
  get '/microposts', to: 'static_pages#home'
end
