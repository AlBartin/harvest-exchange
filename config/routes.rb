Rails.application.routes.draw do
  resources :deals
  resources :counters
  resources :counter_bags
  resources :requests
  resources :request_bags
  resources :bags
  resources :users
  
  post 'signup', to: 'users#create'
  get 'users', to: 'users#index'
  
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'

  get 'all-items', to: 'bags#index'
  post 'add-item', to: 'bags#create'

  post 'request', to: 'requests#create'

end
