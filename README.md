  * rails new graphql_two --api --skip-test -d postgresql

  ```
  source 'https://rubygems.org'
  git_source(:github) { |repo| "https://github.com/#{repo}.git" }

  ruby '2.7.0'

  gem 'rails', '~> 6.0.3'
  gem 'pg'
  gem 'puma', '~> 4.1'
  gem 'bootsnap', '>= 1.4.2', require: false
  gem 'graphql'
  gem 'rack-cors'

  group :development, :test do
    gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  end

  group :development do
    gem 'listen', '~> 3.2'
    gem 'spring'
    gem 'spring-watcher-listen', '~> 2.0.0'
    gem 'graphiql-rails'
    gem 'faker'
  end

  gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
  ```

  ```bash
  bundle install
  ```

  ```bash
  mkdir app/assets
  mkdir app/assets/config
  touch app/assets/config/manifest.js
  ```

  ```
  //= link graphiql/rails/application.css
  //= link graphiql/rails/application.js
  ```
  
  ```bash
  createdb graphql_4_development
  ```

  ```bash
  rails g model User email:string name: string
  rails g model Post user:belongs_to title:string body:text
  rails db:migrate
  ```

  ```
  class User < ApplicationRecord
    has_many :posts
  end
  ```

  ```
  5.times do
    user = User.create(name: Faker::Name.name, email: Faker::Internet.email)
    5.times do
      user.posts.create(title: Faker::Lorem.sentence(word_count: 3), body: Faker::Lorem::paragraph(sentence_count: 3))
    end
  end
  ```

  ```bash
  rails db:seed
  ```

  ```bash
  rails generate graphql:install
  bundle install
  rails generate graphql:object user
  rails generate graphql:object post
  ```

  ```
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "graphql#execute"
  end
  ```

  * `require "sprockets/railtie"`

  * Add Favicon to Public