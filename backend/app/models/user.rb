class User < ApplicationRecord
    has_secure_password
    has_many :pets
    has_many :comments

    validates :name, 
        format: { with: /[a-zA-Z]/},
        presence: true

    validates :email, 
        format: {with: /\A([^@\s]+)@((?:[-a-z0-9]+.)+[a-z]{2,})\z/i},
        uniqueness: true, 
        case_sensitive: false, 
        presence: true
    
    validates :password_digest,
        length: { minimum: 3 },
        presence: true
            # if: -> { new_record? || !password.nil? }
    validates :phone_number, 
    length: { minimum: 6 }, 
    format: { with: /\A(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\z/ },
    numericality: true,
    presence: true

    
end

