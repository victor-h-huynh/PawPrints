class User < ApplicationRecord
    has_secure_password
    has_many :pets
    belongs_to :address

end
