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
  get 'counter-user/:id', to: 'users#show'
  
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'

  get 'all-items', to: 'bags#index'
  post 'add-item', to: 'bags#create'

  post 'request', to: 'requests#create'
  delete 'request/:id', to: 'requests#destroy'

  post 'counter', to: 'counters#create'
  delete 'counter/:id', to: 'counter#destroy'

  post 'counter-bag', to: 'counter_bags#create'
  delete 'counter-bag/:id', to: 'counter_bags#destroy'

  post 'deal', to: 'deals#create'
  
end
