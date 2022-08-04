Rails.application.routes.draw do
  resources :poly_deals
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
  get 'bag/:id', to: 'bags#show'
  post 'add-item', to: 'bags#create'

  get 'requests', to: 'requests#index'
  post 'request', to: 'requests#create'
  delete 'request/:id', to: 'requests#destroy'

  get 'request-bags', to: 'request_bags#index'
  post 'request-bag', to: 'request_bags#create'
  delete 'request-bag/:id', to: 'request_bags#destroy'
  patch 'request-bag/:id', to: 'request_bags#update'

  get 'counters', to: 'counters#index'
  post 'counter', to: 'counters#create'
  delete 'counter/:id', to: 'counter#destroy'

  get 'counter-bags', to: 'counter_bags#index'
  post 'counter-bag', to: 'counter_bags#create'
  delete 'counter-bag/:id', to: 'counter_bags#destroy'
  patch 'counter-bag/:id', to: 'counter_bags#update'

  get 'deals', to: 'deals#index'
  patch 'deal/:id', to: 'deals#update'
  post 'deal', to: 'deals#create'

  post 'poly-deal', to: 'poly_deals#create'
  
end
