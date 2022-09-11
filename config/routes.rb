# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, path: 'auth', controllers: {
    sessions: 'auth/sessions',
    registrations: 'auth/registrations'
  }

  # FIXME:
  # resources :discussions
  # get '/discussions/channels/:channel/:id', to: 'discussions#show' TODO: alias (find name)
  # get '/channels/:channel', to: 'discussions#index'

  get '/discussions/channels/:channel', to: 'discussions#index'

  post '/replies', to: 'replies#create', as: :replies

  get '/channels', to: 'channels#index', as: :channels

  get '/discussions', to: 'discussions#index', as: :discussions
  get '/discussions/new', to: 'discussions#new', as: :new_discussion
  post '/discussions', to: 'discussions#create'
  get '/discussions/:id', to: 'discussions#show', as: :discussion

  # TODO:
  resources :discussions do
    resources :replies
  end

  root 'discussions#index'
end
