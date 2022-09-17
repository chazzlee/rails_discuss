# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, path: 'auth', controllers: {
    sessions: 'auth/sessions',
    registrations: 'auth/registrations'
  }

  get '/discussions/new', to: 'discussions#new', as: :new_discussion
  post '/discussions', to: 'discussions#create', as: :discussions

  resources :channels, only: [:index] do
    resources :discussions, only: %i[index show create], shallow: true do
      resources :replies, shallow: true
    end
  end

  root 'discussions#index'
end
