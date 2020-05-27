class Mutations::Users::CreateUser < Mutations::BaseMutation 
  # "Input"
  argument :name, String, required: true
  argument :email, String, required: true

  # Provided "Output"
  field :user, Types::UserType, null: false
  field :errors, [String], null: false 

  # Resolver (Controller basically) | Takes the "inputs" provided above.
  def resolve(**attributes)
    # Logic and exact way the information should be returned in either case.
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