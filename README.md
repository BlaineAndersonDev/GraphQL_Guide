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
  
* In `app/graphql/types`:
  * `user_type.rb`:
  ```
  module Types
    class UserType < Types::BaseObject
      field :id, ID, null: false
      field :name, String, null: true
      field :email, String, null: true
      field :posts, [Types::PostType], null: true
      field :posts_count, Integer, null: true

      def posts_count
        object.posts.size
      end
    end
  end
  ```
  * `post_type.rb`:
  ```
  module Types
    class PostType < Types::BaseObject
      field :id, Integer, null: false
      field :title, String, null: false
      field :body, String, null: false
      field :user, Types::UserType, null: false
    end
  end
  ```
  * `query_type.rb`:
  ```
  module Types
    class QueryType < Types::BaseObject
      # /users
      field :users, [Types::UserType], null: false

      def users
        User.all
      end

      # /user/:id
      field :user, Types::UserType, null: false do
        argument :id, ID, required: true
      end

      def user(id:)
        User.find(id)
      end
    end
  end
  ```
  * `mutation_type.rb`:
  ```
  module Types
    class MutationType < Types::BaseObject

      field :create_user, mutation: Mutations::Users::CreateUser
      field :update_user, mutation: Mutations::Users::UpdateUser
      field :delete_user, mutation: Mutations::Users::DeleteUser

      field :create_post, mutation: Mutations::Posts::CreatePost
      field :update_post, mutation: Mutations::Posts::UpdatePost
      field :delete_post, mutation: Mutations::Posts::DeletePost
      
    end
  end
  ```

* In `app/graphql/mutations`:
  * `users/create_user.rb`:
  ```
  class Mutations::Users::CreateUser < Mutations::BaseMutation 
    argument :name, String, required: true
    argument :email, String, required: true

    field :user, Types::UserType, null: false
    field :errors, [String], null: false 

    def resolve(**attributes)
      user = User.new(attributes)
          if user.save
        {
          user: user,
          errors: []
        }
      else
        {
          user: nil,
          errors: user.errors.full_messages
        }
      end
    end
  end
  ```
  * `users/update_user.rb`:
  ```
  class Mutations::Users::UpdateUser < Mutations::BaseMutation 
    argument :id, ID, required: true
    argument :name, String, required: false
    argument :email, String, required: false

    field :user, Types::UserType, null: false
    field :errors, [String], null: false 

    def resolve(id:, **attributes)
      if User.exists?(id)
        user = User.find(id)
        if user.update(attributes)
          {
            user: user,
            errors: []
          }
        else
          {
            user: nil,
            errors: user.errors.full_messages
          }
        end
      else
        user = User.new(attributes)
        if user.save
          {
            user: user,
            errors: []
          }
        else
          {
            user: nil,
            errors: user.errors.full_messages
          }
        end
      end
    end
  end
  ```
  * `users/delete_user.rb`:
  ```
  class Mutations::Users::DeleteUser < Mutations::BaseMutation 
    argument :id, ID, required: true

    field :user, Types::UserType, null: true
    field :errors, [String], null: true 

    def resolve(id:)
      if User.exists?(id)
        user = User.find(id)
        if user.destroy()
          {
            user: user,
            errors: []
          }
        else
          {
            user: nil,
            errors: user.errors.full_messages
          }
        end
      else
        {
          user: nil,
          errors: nil
        }
      end
    end
  end
  ```

* In `app/graphql/mutations`:
  * `posts/create_post.rb`:
  ```
  class Mutations::Posts::CreatePost < Mutations::BaseMutation 
    argument :title, String, required: true
    argument :body, String, required: true
    argument :user_id, ID, required: true

    field :post, Types::PostType, null: false
    field :errors, [String], null: false 

    def resolve(**attributes)
      post = Post.new(attributes)
          if post.save
        {
          post: post,
          errors: []
        }
      else
        {
          post: nil,
          errors: post.errors.full_messages
        }
      end
    end
  end
  ```
  * `posts/update_post.rb`:
  ```
  class Mutations::Posts::UpdatePost < Mutations::BaseMutation 
    argument :id, ID, required: true
    argument :title, String, required: false
    argument :body, String, required: false

    field :post, Types::PostType, null: false
    field :errors, [String], null: false 

    def resolve(id:, **attributes)
      if Post.exists?(id)
        post = Post.find(id)
        if post.update(attributes)
          {
            post: post,
            errors: []
          }
        else
          {
            post: nil,
            errors: post.errors.full_messages
          }
        end
      else
        post = Post.new(attributes)
        if post.save
          {
            post: post,
            errors: []
          }
        else
          {
            post: nil,
            errors: post.errors.full_messages
          }
        end
      end
    end
  end 
  ```
  * `posts/delete_post.rb`:
  ```
  class Mutations::Posts::DeletePost < Mutations::BaseMutation 
    argument :id, ID, required: true

    field :post, Types::PostType, null: true
    field :errors, [String], null: true 

    def resolve(id:)
      if Post.exists?(id)
        post = Post.find(id)
        if post.destroy()
          {
            post: post,
            errors: []
          }
        else
          {
            post: nil,
            errors: post.errors.full_messages
          }
        end
      else
        {
          post: nil,
          errors: nil
        }
      end
    end
  end
  ```
* **API Done.**