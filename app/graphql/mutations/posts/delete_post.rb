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