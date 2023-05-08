Rails.application.routes.draw do
  namespace :api do
    namespace :v1, defaults: {format: :json} do
      resources :days
      resources :day_joins
      resources :repeatings
      resources :repeating_joins
      resources :categories
      resources :category_joins
      resources :todos
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
