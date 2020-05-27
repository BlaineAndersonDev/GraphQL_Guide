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