# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, path: 'auth', controllers: {
    sessions: 'auth/sessions',
    registrations: 'auth/registrations'
  }

  resources :discussions
  get '/discussions', to: 'discussions#index'
  root 'discussions#index'
end
