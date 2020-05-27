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