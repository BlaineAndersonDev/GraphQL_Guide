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