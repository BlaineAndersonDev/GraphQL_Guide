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